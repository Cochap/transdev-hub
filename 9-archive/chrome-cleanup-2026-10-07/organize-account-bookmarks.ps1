$ErrorActionPreference = 'Stop'
$profilePath = Join-Path $env:LOCALAPPDATA 'Google\Chrome\User Data\Default'
if (Get-Process chrome -ErrorAction SilentlyContinue) { throw 'Close Chrome before applying.' }
function Get-Nodes($node) {
    $node
    foreach ($child in $node.children) { Get-Nodes $child }
}
function Get-Checksum($document) {
    $stream = [IO.MemoryStream]::new()
    foreach ($rootName in @('bookmark_bar', 'other', 'synced')) {
        foreach ($node in (Get-Nodes $document.roots.$rootName)) {
            foreach ($bytes in @([Text.Encoding]::UTF8.GetBytes([string]$node.id), [Text.Encoding]::Unicode.GetBytes([string]$node.name), [Text.Encoding]::UTF8.GetBytes([string]$node.type))) {
                $stream.Write($bytes, 0, $bytes.Length)
            }
            if ($node.type -eq 'url') {
                $bytes = [Text.Encoding]::UTF8.GetBytes([string]$node.url)
                $stream.Write($bytes, 0, $bytes.Length)
            }
        }
    }
    $md5 = [Security.Cryptography.MD5]::Create()
    $value = ([BitConverter]::ToString($md5.ComputeHash($stream.ToArray()))).Replace('-', '').ToLowerInvariant()
    $md5.Dispose()
    $stream.Dispose()
    $value
}
$accountPath = Join-Path $profilePath 'AccountBookmarks'
$account = [IO.File]::ReadAllText($accountPath) | ConvertFrom-Json
$local = [IO.File]::ReadAllText((Join-Path $profilePath 'Bookmarks')) | ConvertFrom-Json
$allAccount = @(foreach ($root in $account.roots.PSObject.Properties) { Get-Nodes $root.Value })
$allLocal = @(foreach ($root in $local.roots.PSObject.Properties) { Get-Nodes $root.Value })
if ((Get-Checksum $account) -ne $account.checksum) { throw 'Account checksum mismatch.' }
$links = @($allAccount | Where-Object type -eq 'url')
$before = @($links | ForEach-Object { $_ | ConvertTo-Json -Depth 30 -Compress } | Sort-Object)
$groups = [ordered]@{
    'School & Planning' = @()
    'Gaming & Entertainment' = @()
    'AI & Development' = @()
    'Inspiration' = @()
    'Real Estate Research' = @()
    'Business & Finance' = @()
    'Browser Utilities' = @()
}
foreach ($link in $links) {
    $group = if ($link.url -match 'concordia|notion\.so|reddit\.com/r/Notion') { 'School & Planning' }
    elseif ($link.url -match 'youtube\.com|warframe\.market|curseforge') { 'Gaming & Entertainment' }
    elseif ($link.url -match '21st\.dev|recent\.design|motionsites') { 'Inspiration' }
    elseif ($link.url -match 'github|gist\.github|trendshift|localhost|chatgpt\.com' -or $link.name -match 'submagic') { 'AI & Development' }
    elseif ($link.url -match 'mykajabi|looksmax' -or $link.name -match 'linkedin outbound') { 'Business & Finance' }
    elseif ($link.url -match '^chrome:') { 'Browser Utilities' }
    else { 'Real Estate Research' }
    $groups[$group] += $link
}
$nextId = (@($allAccount) + @($allLocal) | ForEach-Object { [long]$_.id } | Measure-Object -Maximum).Maximum
$now = [string]([long]([DateTime]::UtcNow.ToFileTimeUtc() / 10))
$account.roots.bookmark_bar.children = @(foreach ($group in $groups.Keys) {
    if ($groups[$group].Count -gt 0) {
        $nextId++
        [pscustomobject]@{ children = @($groups[$group] | Sort-Object name); date_added = $now; date_last_used = '0'; date_modified = $now; guid = [guid]::NewGuid().ToString(); id = [string]$nextId; name = $group; type = 'folder' }
    }
})
$account.roots.bookmark_bar.date_modified = $now
$account.roots.other.children = @()
$account.roots.other.date_modified = $now
$account.roots.synced.children = @()
$account.roots.synced.date_modified = $now
$account.checksum = Get-Checksum $account
if ($account.PSObject.Properties.Name -contains 'checksum_sha256') { throw 'Unexpected SHA256 checksum requires handling.' }
$afterNodes = @(foreach ($root in $account.roots.PSObject.Properties) { Get-Nodes $root.Value })
$after = @($afterNodes | Where-Object type -eq 'url' | ForEach-Object { $_ | ConvertTo-Json -Depth 30 -Compress } | Sort-Object)
if (Compare-Object $before $after) { throw 'Bookmark preservation failed.' }
foreach ($document in @($account, $local)) {
    foreach ($root in $document.roots.PSObject.Properties) {
        if (@($root.Value.children | Where-Object type -eq 'url').Count -gt 0) { throw 'Loose bookmarks remain.' }
    }
}
$backupDirectory = Join-Path 'C:\TRANSDEV HUB' ('chrome-full-backup-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
[void](New-Item -ItemType Directory -Path $backupDirectory)
foreach ($name in @('Bookmarks', 'AccountBookmarks', 'EncryptedBookmarks2', 'EncryptedAccountBookmarks2', 'BookmarkMergedSurfaceOrdering')) {
    $source = Join-Path $profilePath $name
    if (Test-Path -LiteralPath $source) { Copy-Item -LiteralPath $source -Destination (Join-Path $backupDirectory $name) }
}
$temporaryPath = $accountPath + '.organized.tmp'
[IO.File]::WriteAllText($temporaryPath, ($account | ConvertTo-Json -Depth 100), [Text.UTF8Encoding]::new($false))
$parsed = [IO.File]::ReadAllText($temporaryPath) | ConvertFrom-Json
if ((Get-Checksum $parsed) -ne $parsed.checksum) { throw 'Serialized checksum failed.' }
if (Get-Process chrome -ErrorAction SilentlyContinue) { throw 'Chrome restarted.' }
[IO.File]::Replace($temporaryPath, $accountPath, (Join-Path $backupDirectory 'AccountBookmarks-replaced'))
# Chromium falls back to the JSON file when its encrypted counterpart is missing,
# then recreates the encrypted file itself. Preserve the old encrypted copy.
$encryptedPath = Join-Path $profilePath 'EncryptedAccountBookmarks2'
if (Test-Path -LiteralPath $encryptedPath) { Move-Item -LiteralPath $encryptedPath -Destination (Join-Path $backupDirectory 'EncryptedAccountBookmarks2-moved') }
"Backup directory: $backupDirectory"
"Account bookmarks preserved: $($links.Count)"
"Local bookmarks preserved: $(@($allLocal | Where-Object type -eq 'url').Count)"
$account.roots.bookmark_bar.children | ForEach-Object { "$($_.name): $($_.children.Count)" }

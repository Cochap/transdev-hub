"""ElevenLabs text-to-speech: one take per line -> audio/vo/<id>.mp3 (replaces the Fish Audio step).
Run from the project root.

  python3 scripts/tts.py --voices [query]        list voices (name, id, labels)
  python3 scripts/tts.py --test "line" --voice ID_OR_NAME [--voice ...]   test one line on candidates -> audio/vo/test_<n>.mp3
  python3 scripts/tts.py                          generate every line in vo_lines.json
  python3 scripts/tts.py --credits                characters used / remaining

vo_lines.json: { "voice": "<id or name>", "model": "eleven_multilingual_v2",
                 "stability": 0.45, "similarity": 0.8, "style": 0.35,
                 "lines": [ { "id": "l1", "text": "One platform." }, ... ] }
Then continue with `python3 scripts/vo.py --scan` (see reference/AUDIO.md section 3).

The API key is read from the environment variable ELEVENLABS_API_KEY, the Windows user environment, or the first line of ~/.elevenlabs_key.
It is never written into the project.
"""
import json, os, ssl, sys, urllib.request, urllib.parse
from pathlib import Path

API = 'https://api.elevenlabs.io/v1'
# Python 3.13+ rejects some corporate-proxy CA certs under strict X.509 rules; verification stays on.
CTX = ssl.create_default_context()
CTX.verify_flags &= ~ssl.VERIFY_X509_STRICT


def key():
    k = os.environ.get('ELEVENLABS_API_KEY', '').strip()
    if not k and os.name == 'nt':
        try:
            import winreg
            with winreg.OpenKey(winreg.HKEY_CURRENT_USER, 'Environment') as h:
                k = winreg.QueryValueEx(h, 'ELEVENLABS_API_KEY')[0].strip()
        except OSError:
            pass
    if not k:
        p = Path.home() / '.elevenlabs_key'
        if p.exists():
            k = p.read_text().splitlines()[0].strip()
    if not k:
        sys.exit('No ElevenLabs key: set ELEVENLABS_API_KEY or put it in ~/.elevenlabs_key')
    return k


def call(path, body=None, raw=False):
    req = urllib.request.Request(API + path, data=json.dumps(body).encode() if body is not None else None,
                                 headers={'xi-api-key': key(), 'Content-Type': 'application/json', 'Accept': '*/*'})
    try:
        with urllib.request.urlopen(req, timeout=120, context=CTX) as r:
            d = r.read()
    except urllib.error.HTTPError as e:
        sys.exit(f'ElevenLabs {e.code}: {e.read().decode()[:300]}')
    return d if raw else json.loads(d)


def voices(q=''):
    return call('/voices?' + urllib.parse.urlencode({'search': q}) if q else '/voices')['voices']


def resolve(v):
    for x in voices():
        if v in (x['voice_id'], x['name']) or v.lower() == x['name'].lower():
            return x['voice_id']
    return v


def speak(text, voice, out, cfg):
    body = {'text': text, 'model_id': cfg.get('model', 'eleven_multilingual_v2'),
            'voice_settings': {'stability': cfg.get('stability', 0.45), 'similarity_boost': cfg.get('similarity', 0.8),
                               'style': cfg.get('style', 0.35), 'use_speaker_boost': True}}
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(call(f'/text-to-speech/{voice}?output_format=mp3_44100_128', body, raw=True))
    print('wrote', out, len(text.encode()), 'chars')


def main(a):
    if '--credits' in a:
        s = call('/user/subscription')
        print(f"{s['character_count']} used of {s['character_limit']} characters")
    elif '--voices' in a:
        i = a.index('--voices')
        for v in voices(a[i + 1] if len(a) > i + 1 else ''):
            print(v['voice_id'], '|', v['name'], '|', json.dumps(v.get('labels', {})))
    elif '--test' in a:
        text = a[a.index('--test') + 1]
        vs = [a[i + 1] for i, x in enumerate(a) if x == '--voice']
        for n, v in enumerate(vs, 1):
            speak(text, resolve(v), Path(f'audio/vo/test_{n}.mp3'), {})
    else:
        cfg = json.loads(Path('vo_lines.json').read_text())
        vid = resolve(cfg['voice'])
        for l in cfg['lines']:
            speak(l['text'], vid, Path(f"audio/vo/{l['id']}.mp3"), cfg)


main(sys.argv[1:])

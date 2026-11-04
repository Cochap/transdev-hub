# How to set up the BOULON morning email digest (Power Automate)

**What it does:** every morning at 6:00, a Microsoft cloud automation copies a list of your BOULON-related emails (date, sender, subject, first lines) into `OneDrive - TRANSDEV\BOULON-inbox`. When a Claude session opens, the session-start check reads it. Claude then knows ticket numbers and replies without asking you.
**Time:** about 15 minutes, once. **App:** Power Automate in your browser. **Cost:** $0 (Outlook and OneDrive connections are included with Microsoft 365). **Install:** none.
**Privacy:** only emails matching the keywords in step 5 are copied, and only their first lines (not full messages or attachments). The file stays in your own OneDrive.

French labels are my best guess where marked "should be called". If a label doesn't match, send a screenshot.

## Steps
1. Go to **https://make.powerautomate.com** and sign in with your Transdev account if asked. You should see the Power Automate home page with a left menu.
   - **Access check:** if the left menu has **+ Create** (should be called **+ Créer**), continue. If you see a message about a licence or no access, stop and send a screenshot. Claude will then switch to a plan that needs no Power Automate.
2. Click **+ Create** (Créer), then **Scheduled cloud flow** (should be called **Flux de cloud planifié**). A small window opens.
3. Fill it in:
   - **Flow name** (Nom du flux): `BOULON inbox digest`
   - **Starting** (Début): tomorrow's date, at **6:00 AM**
   - **Repeat every** (Répéter tous les): `1` **Day** (Jour)
   - Click **Create** (Créer). The designer opens with one box called **Recurrence** (should be called **Périodicité**).
4. Click the **+** under that box, then **Add an action** (Ajouter une action). In the search box type `Get emails` and pick **Get emails (V3)** (should be called **Obtenir des e-mails (V3)**) under **Office 365 Outlook**. If it asks you to sign in, accept with your Transdev account.
5. In that box:
   - **Folder** (Dossier): **Inbox** (Boîte de réception)
   - **Top**: `50`
   - Open **Advanced parameters** (Paramètres avancés) → **Search Query** (should be called **Requête de recherche**) and paste:
     ```
     BOULON OR Azure OR "Copilot Studio" OR MIR OR GMAO OR billet OR ticket OR demande OR Henri OR Pierre OR Alex
     ```
6. Click **+** under it → **Add an action** → search `Create HTML table` → pick **Create HTML table** (should be called **Créer une table HTML**) under **Data Operation** (Opération de données).
   - **From** (De): click in the box, click the lightning icon (dynamic content), and pick **value** (or **body/value**) under Get emails.
   - **Columns** (Colonnes): choose **Custom** (Personnalisé) and add 4 rows. The left side is text you type; for the right side, click the box and pick the matching item from the lightning icon:
     - `Received` → **Received Time** (Heure de réception)
     - `From` → **From** (De)
     - `Subject` → **Subject** (Objet)
     - `Preview` → **Body Preview** (should be called **Aperçu du corps**)
   - Don't pick "Body" (Corps): that would copy whole emails.
7. Click **+** under it → **Add an action** → search `Create file` → pick **Create file** (Créer un fichier) under **OneDrive for Business**.
   - **Folder Path** (Chemin du dossier): click the folder icon and pick **BOULON-inbox**. Claude already created this folder.
   - **File Name** (Nom du fichier): click in the box, click the **fx** icon (Insérer une expression), paste this, then click **Add** (Ajouter):
     ```
     concat('digest-', formatDateTime(convertFromUtc(utcNow(),'Eastern Standard Time'),'yyyy-MM-dd'), '.html')
     ```
   - **File Content** (Contenu du fichier): lightning icon → **Output** (Sortie) under Create HTML table.
8. Click **Save** (Enregistrer), top right.
9. Click **Test** (Tester) → **Manually** (Manuellement) → **Test** → **Run flow** (Exécuter le flux) → **Done** (Terminé).

## Test
- **Pass:** all 4 boxes get a green check. Within about a minute, a file `digest-2026-09-25.html` (today's date) appears in `OneDrive - TRANSDEV\BOULON-inbox`.
- **Red flag:** a box shows a red X, or step 1 shows a licence message. Send a screenshot of the error.
- **What to tell Claude:** just "digest done". Claude checks the folder itself.

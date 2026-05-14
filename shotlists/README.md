# Material 7 Studio — Shotlist Publishing SOP

Version: 1.1
Purpose: Publish client-facing shotlist and recording-guide HTML files to Material 7 Studio through GitHub Pages.

Live studio domain:

```txt
https://studio.material7.com
```

Shotlist folder:

```txt
/shotlists/
```

Public URL pattern:

```txt
https://studio.material7.com/shotlists/file-name.html
```

---

## 1. What this folder is for

The `shotlists` folder is only for hosted client-facing shotlist, recording-guide, and shoot-prep HTML files.

Use this folder when Material 7 needs to send a clean browser link to a client, talent, spokesperson, or internal collaborator.

Do not use this folder for unrelated SOPs, scripts, landing pages, experiments, or general studio files.

---

## 2. Publishing logic

GitHub Pages is already connected to:

```txt
studio.material7.com
```

That setup does not need to be repeated.

From now on, publishing a new shotlist means:

1. Save the HTML file inside `/shotlists/`.
2. Commit the change.
3. Push to `main`.
4. Open the generated URL.

Deployment chain:

```txt
Local file
→ GitHub Desktop commit
→ Push to GitHub
→ GitHub Pages publishes
→ studio.material7.com/shotlists/file-name.html
```

---

## 3. Naming convention

Use this format:

```txt
client-project-shotlist-mm-dd-yyyy.html
```

Example:

```txt
aura-clean-shotlist-05-14-2026.html
```

Better when the service or campaign matters:

```txt
detail-sport-ppf-shotlist-05-14-2026.html
```

For a client-facing guide instead of the internal shotlist:

```txt
aura-clean-client-guide-05-14-2026.html
```

For a talent-facing recording guide:

```txt
aura-clean-recording-guide-05-14-2026.html
```

---

## 4. Filename rules

Use:

- lowercase letters
- hyphens instead of spaces
- `.html` extension
- month-day-year date format with leading zeroes
- clear client/project/service names

Avoid:

- spaces
- uppercase names
- accents
- version chaos like `final-final-v3`
- vague names like `test.html` after testing

Good:

```txt
aura-clean-shotlist-05-14-2026.html
```

Bad:

```txt
Aura Clean Final FINAL v3.html
```

---

## 5. URL examples

If the file path is:

```txt
/shotlists/aura-clean-shotlist-05-14-2026.html
```

The public URL is:

```txt
https://studio.material7.com/shotlists/aura-clean-shotlist-05-14-2026.html
```

If the file path is:

```txt
/shotlists/detail-sport-ppf-client-guide-05-14-2026.html
```

The public URL is:

```txt
https://studio.material7.com/shotlists/detail-sport-ppf-client-guide-05-14-2026.html
```

---

## 6. Recommended file types

Use these suffixes depending on the document:

```txt
-shotlist-
```

Internal or production-facing shotlist.

```txt
-client-guide-
```

Client-facing simplified guide.

```txt
-recording-guide-
```

Talent/spokesperson-facing guide.

```txt
-shoot-prep-
```

Simple prep checklist before a shoot.

---

## 7. GitHub Desktop workflow

1. Open the local repository folder:

```txt
D:\Github\material7-studio
```

2. Open the `shotlists` folder.

3. Save the new HTML file there.

Example:

```txt
D:\Github\material7-studio\shotlists\aura-clean-client-guide-05-14-2026.html
```

4. Open GitHub Desktop.

5. Review the changed file.

6. Commit with a clear message:

```txt
Add Aura Clean client guide
```

7. Push to `main`.

8. Wait for GitHub Pages deployment to finish.

9. Open the public URL.

---

## 8. Publishing checklist

Before sharing a link, confirm:

- The file is inside `/shotlists/`.
- The filename is clean and lowercase.
- The file ends in `.html`.
- The page opens on `studio.material7.com`.
- The page works on mobile.
- The print button works in browser.
- The document does not expose internal strategy if it is client-facing.
- The language is safe: no fake claims, prices, guarantees, or technical promises.

---

## 9. Relationship to the shotlist system

The full Material 7 Shotlist System still uses two conceptual documents:

1. Blue/internal shotlist — production control document.
2. Green/client guide — simplified guide derived from the internal shotlist.

For public sharing through Material 7 Studio, usually publish only the client-facing file unless the internal file is specifically needed.

Preferred public/client file:

```txt
client-project-client-guide-mm-dd-yyyy.html
```

Preferred internal file, if ever needed:

```txt
client-project-shotlist-mm-dd-yyyy.html
```

---

## 10. Core standard

Fast, clean, usable, printable, hostable, sendable.

The goal is not to create a complicated archive. The goal is to make one clean link per useful document.
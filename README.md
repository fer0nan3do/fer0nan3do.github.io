# Web de prova per a GitHub Pages

Pàgina web estàtica (HTML + CSS + JS, sense dependències ni build) llesta per pujar a GitHub Pages.

## Contingut

```
index.html      → pàgina principal
404.html        → pàgina d'error personalitzada
css/style.css   → estils
js/script.js    → rellotge, comptador i info de l'entorn
```

## Com publicar-la a GitHub Pages

1. Crea un repositori nou a GitHub (per exemple `web-prova`).
2. Descomprimeix aquest zip i puja **el contingut** de la carpeta (no la carpeta en si) a l'arrel del repositori:

   ```bash
   cd web-prova
   git init
   git add .
   git commit -m "Web de prova"
   git branch -M main
   git remote add origin https://github.com/<el-teu-usuari>/<nom-repo>.git
   git push -u origin main
   ```

3. Al repositori, ves a **Settings → Pages**.
4. A "Build and deployment" tria **Source: Deploy from a branch**, branca `main` i carpeta `/ (root)`.
5. Guarda. Al cap d'un o dos minuts la web estarà disponible a:

   ```
   https://<el-teu-usuari>.github.io/<nom-repo>/
   ```

   (Si el repositori es diu `<el-teu-usuari>.github.io`, la web quedarà a l'arrel: `https://<el-teu-usuari>.github.io/`.)

## Comprovar que tot funciona

Un cop publicada, la pàgina hauria de mostrar:
- El rellotge actualitzant-se cada segon.
- El botó de comptador sumant i restant.
- Una llista amb informació del navegador (idioma, amplada de finestra, etc.).

Si veus tot això, el desplegament ha anat bé.

# andresrogers.github.io

Personal portfolio site for Andrés Rogers, published at
<https://andresrogers.github.io/>.

## What it is

A single-page static site covering background, selected professional work, open-source
portfolio projects, agentic AI engineering, experience, technical expertise, education, and
contact details.

## How it is built

Hand-written static files. No build step, no package manager, no framework, no third-party
requests at runtime: no CDNs, web fonts, analytics, or trackers. Only outbound hyperlinks.

```text
index.html          the page
404.html            not-found page
assets/css/style.css
assets/js/main.js   theme toggle, mobile menu, reveal-on-scroll
assets/favicon.svg
assets/og-image.png social preview card, 1200x630
robots.txt
sitemap.xml
.nojekyll           serve the files as-is, without Jekyll processing
```

Theme follows `prefers-color-scheme` and can be switched with the header toggle; the choice is
stored in `localStorage` and applied before first paint.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/>. Use a server rather than opening `index.html` directly, so
that `404.html` and its root-relative asset paths resolve the same way they do in production.

## Deploy

GitHub Pages serves the repository root on the `main` branch. Pushing to `main` publishes.

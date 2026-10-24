# Rivals Hub

A small catalog and status tracker for Roblox Rivals-related community projects.

This project is designed as a lightweight public-facing directory where users can browse Rivals-related entries, see their current status, read quick notes, and open the corresponding Roblox place links.

## Why this project exists

The goal is to create a simple, readable information hub for Rivals community content where visitors can understand:

- what a project is
- who created it
- whether it works or is abandoned
- what its strengths and weaknesses are
- where to open the project in Roblox

## Features

- searchable catalog
- filter by project status
- status labels such as Works, Under review, Archived, Broken
- project cards with pros and cons
- quick submit form for adding new entries
- dark gaming-style UI

## Project structure

- `index.html` — main page layout
- `styles.css` — all interface styling
- `script.js` — search/filter logic and dynamic rendering
- `README.md` — project documentation

## Run locally

You can open the project directly in a browser, or start a local server:

```bash
cd /path/to/rivals-hub
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deploy on GitHub Pages

Because this project is static HTML/CSS/JS, it is a good fit for GitHub Pages.

### Steps

1. Go to your repository on GitHub.
2. Open the repository settings.
3. Open the Pages section.
4. Set the source to the `main` branch.
5. Save the settings.
6. GitHub will generate a live site URL like:

```text
https://yourusername.github.io/rivals-hub/
```

This makes the project public as a real website without needing a backend.

## Example entry

A sample entry is already included for:

- `Josh's RIVALS MODDED`

It contains:

- title
- creator
- place URL
- project description
- pros and cons
- tags
- status

## Future ideas

This is still a simple MVP. Possible next upgrades:

- separate detail pages for each project
- moderation/admin panel
- real database backend (Supabase/Firebase/Postgres)
- user reviews and ratings
- categories and tags by project type
- better analytics and filters

## Notes

This is a front-end first version. It is intentionally simple so it can be expanded later into a more complete community database.

If you want to turn it into a real production project, the next logical step is to replace the in-memory data with a real database and user submission flow.

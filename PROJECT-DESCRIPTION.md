# Farm House — detailed project description

This document explains what the **Farm House** project is, how the pieces fit together, and what each important file does. It complements `README.md`, which focuses on install, run, and routes.

---

## 1. What this project is

**Farm House** is a small **Node.js** web app that:

- Runs an **HTTP server** (no Express) using Node’s built-in `http` module.
- Stores product information in **JSON** (`dev-data/data.json`).
- Serves **HTML pages** built from **templates** by replacing placeholders like `{%PRODUCTNAME%}` with real data.
- Exposes the same data as **JSON** at `/api` for learning or testing.

It is typical of an introductory Node.js course: you practice **routing**, **reading files**, **parsing URLs**, and **simple “server-side rendering”** of HTML from strings.

---

## 2. How a request becomes a page (high level)

1. The browser asks for a URL (for example `http://127.0.0.1:8000/` or `/product?id=2`).
2. **`index.js`** receives the request, reads the **pathname** and **query string** (`url.parse`).
3. Depending on the path, it either:
   - Builds HTML from **templates** + **JSON**, or
   - Sends raw JSON, or
   - Returns **404**.
4. **`modules/replaceTemplate.js`** swaps template placeholders for fields from one product object (name, price, emoji, etc.).
5. The response is sent with the right **`Content-Type`** (`text/html` or `application/json`).

---

## 3. File-by-file reference

### Root

| File | Purpose |
|------|--------|
| **`index.js`** | Main entry. Creates the HTTP server, loads HTML templates and `data.json` once at startup, defines routes (`/`, `/overview`, `/product`, `/api`, 404), calls `replaceTemplate` for each product where needed, writes responses. Listens on **port 8000** at **127.0.0.1**. Also uses `slugify` on product names (logged to the console for learning). |
| **`package.json`** | npm metadata: project name `farm-house`, scripts (`npm start` runs `nodemon index.js`), dependency **`slugify`**, dev dependency **`nodemon`**. |
| **`package-lock.json`** | Locks exact versions of installed packages so installs are reproducible. **Committed** to git (not ignored) in most Node projects. |
| **`README.md`** | Short user-facing docs: install, run, routes table, layout, data shape, placeholders. |
| **`PROJECT-DESCRIPTION.md`** | This file — deeper explanation of architecture and files. |
| **`basics.js`** | Optional scratch / practice file (also listed in `.gitignore` so it stays local if you use it that way). Not required for the Farm House server. |

### `modules/`

| File | Purpose |
|------|--------|
| **`replaceTemplate.js`** | Exports a **function** `(templateString, productObject) => string`. It replaces all occurrences of placeholders such as `{%PRODUCTNAME%}`, `{%IMAGE%}`, `{%PRICE%}`, etc., with values from the product. If `product.organic` is falsy, it replaces `{%NOT_ORGANIC%}` with the CSS class name **`not-organic`** so the template can hide “Organic” UI via CSS (`display: none`). If the product is organic, that placeholder is **not** replaced (templates rely on empty class). |

### `templates/`

| File | Purpose |
|------|--------|
| **`template-overview.html`** | Full HTML page for the **shop overview**: title, styles, heading “Farm House”, and a single placeholder **`{%PRODUCT_CARDS%}`**. `index.js` replaces that with many copies of the filled card HTML. |
| **`template-card.html`** | **One product card** (fragment, not a full document). Repeated once per product. Contains links like `/product?id={%ID%}`. Uses `{%NOT_ORGANIC%}` on the organic badge container. |
| **`template-product.html`** | Full HTML page for **one product**: hero emojis, name, details grid, description, “Add to shopping card”, back link to `/overview`. Same placeholder scheme as the card, plus full layout and CSS. |

### `dev-data/`

| File | Purpose |
|------|--------|
| **`data.json`** | Array of product objects. Fields include `id`, `productName`, `image` (emoji), `from`, `nutrients`, `quantity`, `price`, `organic`, `description`. The server uses **`query.id`** from the URL to index into this array (`dataObj[query.id]`), so the `id` field in JSON should stay aligned with array position for routing to work as expected. |

### `.vscode/` (optional)

| File | Purpose |
|------|--------|
| **`settings.json`** | Editor/workspace settings for VS Code/Cursor (formatting, etc.). Optional; not required for the app to run. |

---

## 4. Routes (behavior)

| Path | What happens |
|------|----------------|
| **`/` or `/overview`** | HTML overview: each product is rendered with `template-card.html` merged into `template-overview.html` at `{%PRODUCT_CARDS%}`. |
| **`/product?id=N`** | HTML for **one** product: `N` is used as the **index** into `dataObj`. Example: `id=0` is the first item in the JSON array. |
| **`/api`** | Raw contents of `data.json` with `Content-Type: application/json`. |
| **Anything else** | **404** HTML response. |

---

## 5. Template placeholders (summary)

Handled in **`replaceTemplate.js`** (except `{%PRODUCT_CARDS%}`, which is only used in `index.js`):

- `{%PRODUCTNAME%}`, `{%IMAGE%}`, `{%PRICE%}`, `{%FROM%}`, `{%NUTRIENTS%}`, `{%QUANTITY%}`, `{%ID%}`, `{%DESCRIPTION%}`
- `{%NOT_ORGANIC%}` → `not-organic` when the product is **not** organic (for CSS).

**Overview only:** `{%PRODUCT_CARDS%}` is replaced in **`index.js`** with the concatenated HTML of all cards.

---

## 6. Dependencies

| Package | Role |
|---------|------|
| **`slugify`** | Turns strings (like product names) into URL-friendly slugs. The app logs slugs on startup; routing still uses numeric `id`, not slugs. |
| **`nodemon`** (dev) | Restarts `node` when files change when you run `npm start`. |

Core **`fs`**, **`http`**, and **`url`** come from Node and do not appear in `dependencies`.

---

## 7. Security and production notes (learning context)

- The server binds to **127.0.0.1** only (local machine), which is appropriate for learning.
- This is **not** a production-ready setup (no HTTPS here, no input sanitization beyond static templates, JSON is trusted local file).
- For a real shop you would use a database, validated IDs, authentication, etc.

---

## 8. Related: `.gitignore`

See the **`.gitignore`** file in this folder. Each section is commented so you know **why** paths are ignored (for example `node_modules/`, logs, local/OS files). That keeps the repository small and avoids committing generated or machine-specific content.

---

*Last updated to match the Farm House project layout and `package.json` name `farm-house`.*

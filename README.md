# 🌾 Farm House

> A minimal full-stack-style web app built using Node.js core modules, featuring server-rendered pages and a JSON API.

---

## 🎯 Purpose

This project was built to understand how web servers work under the hood using Node.js **without frameworks**.
It focuses on **server-side rendering (SSR)**, **manual routing**, and **basic API design**.

---

## 📖 Description

Farm House is a small web application that serves a farm shop interface in the browser.
It uses HTML templates populated with data from a JSON file and demonstrates how backend logic can dynamically generate UI.

The project also exposes a JSON endpoint, showing how frontend and backend systems communicate.

---

## 🚀 Features

* Server-rendered HTML pages (no frontend frameworks)
* Dynamic product listing (overview page)
* Individual product detail pages
* JSON API endpoint (`/api`)
* Custom template engine using string replacement
* Clean URL handling using `slugify`

---

## 🏗️ Tech Stack

* **Backend:** Node.js (core modules only)
* **Modules Used:**

  * `http` – server creation
  * `fs` – file handling
  * `url` – request parsing
  * `slugify` – URL-friendly strings
* **Frontend:** HTML templates

---

## ⚙️ How It Works

* HTML templates are read using `fs.readFileSync`
* Product data is loaded from `dev-data/data.json`
* A custom function replaces placeholders with actual data
* Routing is handled manually using `http.createServer`
* Responses:

  * HTML → for pages
  * JSON → for API

---

## Project layout

```
.
├── index.js                 # HTTP server, routing, reads templates + JSON
├── package.json
├── modules/
│   └── replaceTemplate.js   # Fills {%PLACEHOLDERS%} in HTML from a product object
├── templates/
│   ├── template-overview.html   # Shell page; {%PRODUCT_CARDS%} replaced with many cards
│   ├── template-card.html       # Single card; repeated per product
│   └── template-product.html   # Full product page
└── dev-data/
    └── data.json            # Array of product objects
```

---

## 🔌 Routes

| Path                  | Response                             |
| --------------------- | ------------------------------------ |
| `/` or `/overview`    | HTML overview page with all products |
| `/product?id=<index>` | Product detail page                  |
| `/api`                | JSON data                            |
| अन्य                  | 404 page                             |

---

## 📊 Data Structure (`dev-data/data.json`)

Each product contains:

| Field         | Description                          |
| ------------- | ------------------------------------ |
| `id`          | Numeric ID (used as query parameter) |
| `productName` | Product name                         |
| `image`       | Emoji representation                 |
| `from`        | Origin                               |
| `nutrients`   | Nutritional info                     |
| `quantity`    | Product quantity                     |
| `price`       | Price                                |
| `organic`     | Boolean flag                         |
| `description` | Product details                      |

---

## 🔧 Template Engine

The `replaceTemplate.js` module replaces placeholders in HTML templates:

```id="tmp1"
{%PRODUCTNAME%}
{%PRICE%}
{%DESCRIPTION%}
```

Special logic:

* `{%NOT_ORGANIC%}` → replaced with `not-organic` when the product is not organic

This simulates a basic templating engine similar to real-world tools.

---

## 🧠 What I Learned

* Building an HTTP server using Node.js core modules
* Implementing server-side rendering without frameworks
* Manual routing and URL parsing
* Working with file systems and JSON data
* Creating a basic API endpoint
* Designing a simple template engine

---

## ▶️ How to Run

1. Install dependencies

```bash
npm install
```

2. Run the server

```bash
node index.js
```

3. Open in browser

```
http://127.0.0.1:8000
```

Optional (development with auto-reload):

```bash
npm start
```

---

## 🚀 Future Improvements

* Refactor to use Express.js for better scalability
* Replace JSON with a database (e.g., MongoDB)
* Use slugs instead of query parameters
* Add client-side interactivity (Fetch API)
* Improve UI and responsiveness

---

## 👨‍💻 Author

## Author

Aman Raj (from `package.json`).

## License

ISC (see `package.json`).

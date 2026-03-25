const fs = require("fs");
const http = require("node:http");
const url = require("url");
const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate");


// *******************************Routing and server***********************

const tempOverview = fs.readFileSync(
  "./templates/template-overview.html",
  "utf-8",
);
const tempCard = fs.readFileSync("./templates/template-card.html", "utf-8");
const tempProduct = fs.readFileSync(
  "./templates/template-product.html",
  "utf-8",
);

const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data);

// TODO
// this will return an array of all the names of the products from the dataObj
// const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
// console.log(slugs);

const server = http.createServer((req, res) => {
  // console.log(req.url)
  const { query, pathname } = url.parse(req.url, true);

  // overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });
    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join(""); // join is used so to return a big string not an array
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardHtml);
    res.end(output);
  }
  // product page
  else if (pathname === "/product") {
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }
  // API
  else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);
  }

  // Not Found
  else {
    res.writeHead(404, {
      "content-type": "text/html",
      my_own_header: "helo-world",
    });
    res.end("<h1>Page not found 404 error</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening To request on port 8000");
});

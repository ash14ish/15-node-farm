const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate")

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// Creating a server

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview

  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const templateHTML = dataObj
      ?.map((el) => replaceTemplate(tempCard, el))
      .join("");
    const template = tempOverview.replace("{%PRODUCT_CARDS%}", templateHTML);

    res.end(template);
  }

  // Product Page
  else if (pathname === "/product") {
    const product = dataObj?.find((el) => el?.id?.toString() === query?.id);
    // const product = dataObj?.find((el) => slugify(el?.productName,{lower:true}) === query?.id);
    const productHTML = product ? replaceTemplate(tempProduct, product) :
     `<h2>Product Not Found</h2>`;

    res.writeHead(404, {
      "Content-type": "text/html",
      "My-Header": "This is my custom header",
    });

    query.id ? res.end(productHTML) : res.end("<h2>Page Not Found</h2>");
  }

  // API
  else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  }

  // NOT FOUND
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "My-Header": "This is my custom header",
    });
    res.end("<h2>Page Not Found</h2>");
  }
});

// LISTENING TO THE SERVER

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to the Server");
});

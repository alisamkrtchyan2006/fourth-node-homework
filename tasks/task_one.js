const http = require("node:http");

const PORT = 3001;

// Մեթոդների հենդլերներ
const methodHandlers = {
  GET: (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Welcome to the backend server" }));
  },
  POST: (req, res) => sendMethodResponse(res, "POST"),
  PUT: (req, res) => sendMethodResponse(res, "PUT"),
  PATCH: (req, res) => sendMethodResponse(res, "PATCH"),
  DELETE: (req, res) => sendMethodResponse(res, "DELETE"),
  OPTIONS: (req, res) => sendMethodResponse(res, "OPTIONS"),
};


const sendMethodResponse = (res, method) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message: `You sent a ${method} request` }));
};


const server = http.createServer((req, res) => {
  const { method, url } = req;




  if (url === "/") {
    const handler = methodHandlers[method];
    if (handler) {
      handler(req, res);
    } else {
      res.statusCode = 405;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Method Not Allowed" }));
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Page not found" }));
  }
});


server.listen(PORT)

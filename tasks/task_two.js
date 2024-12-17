const http = require("node:http")

const PORT = 3001


const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome Page</title>
</head>
<body>
  <h1>Welcome to My HTTP Server</h1>
  <p>This is a simple HTTP server built using Node.js. It serves a static HTML page without using any templating engine.</p>
</body>
</html>
`

const server = http.createServer((req, res) => {
  const { method, url } = req


  if (method === "GET" && url === "/") {
    res.setHeader("Content-Type", "text/html")
    res.statusCode = 200
    res.end(htmlContent)
  } else {
    res.statusCode = 404
    res.setHeader("Content-Type", "text/html")
    res.end("<h1>404 - Page Not Found</h1>")
  }
})


server.listen(PORT)

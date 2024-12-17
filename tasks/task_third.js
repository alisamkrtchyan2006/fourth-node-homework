const http = require('node:http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const USERS_FILE = path.join(__dirname, 'users.json');


const getUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};


const saveUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
};

const server = http.createServer((req, res) => {
  const { method, url } = req;
  console.log(`Request method: ${method}, URL: ${url}`);


  res.setHeader('Content-Type', 'application/json');


  if (url === '/users' && method === 'GET') {
    const users = getUsers(); 
    res.statusCode = 200;
    res.end(JSON.stringify(users));
  }else if (url === '/users' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const newUser = JSON.parse(body); 
        const { name, age } = newUser;
        if (!name || !age) {
          res.statusCode = 400;
          res.end(JSON.stringify({ message: 'Name and age are required' }));
          return;
        }
        const users = getUsers();
        users.push({ name, age });
        saveUsers(users);
        res.statusCode = 201;
        res.end(JSON.stringify({ message: 'User added', user: { name, age } }));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: 'Invalid JSON body' }));
      }
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
});


server.listen(PORT);

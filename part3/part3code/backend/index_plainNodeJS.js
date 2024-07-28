
const http = require('http');

let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
];

const app = http.createServer((req, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(notes));
    response.end();
});

// const app = http.createServer((request, response) => {
//     console.log(request.url);
//     response.writeHead(200, { 'Content-Type': 'text/plain' });  // call this before write or end. Sets HTTP response code
//     response.write('Hello world\n');  // sends response body
//     response.end('Hello World2'); // closes the response and sends it to the client. end(data) is equivalent to write(data) and then end()
// });

// const app = http.createServer((request, response) => {
//     response.write("Hello world");
//     response.end();
// });

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
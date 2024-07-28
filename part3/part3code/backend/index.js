const express = require('express');
const app = express();
app.use(express.static('dist'));
app.use(express.json());

const cors = require('cors');
app.use(cors());

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method);
    console.log('Path: ', request.path);
    console.log('Body: ', request.body);
    console.log('---');
    next();
};

app.use(requestLogger);

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

app.get('/', (request,response) => {
    //response.set('Content-Type', 'text/plain');
    response.send('<h1>Hello world!</h1>');
});

app.get('/api/notes', (request,response) => {
    //response.set('Content-Type', 'application/json');
    //console.log(request);
    response.json(notes).end();
});

app.get('/api/notes/:id', (request,response) => {
    console.log(request.url);
    console.log(request.params);
    const id = request.params.id;
    const note = notes.find(note => note.id === id);
    console.log(note);
    if (note) { // same as (note !== undefined)
        response.json(note);
    } else {
        response.statusMessage = "Note not found"; // overriding the dafault NOT FOUND message
        response.status(404).end();
    }
});

app.delete('/api/notes/:id', (request,response) => {
    const id = request.params.id;
    const noteToDelete = notes.find(note => note.id === id);
    if (!noteToDelete) {
        response.statusMessage = "Note already deleted";
        response.status(404).end();
    }
    notes = notes.filter(note => note.id !== id);
    response.status(200).json(noteToDelete);
    response.end();

});

app.post('/api/notes/', (request, response) => {

    const body = request.body;
    if (!body.content){
        return response.status(400).json({
            error: 'content missing'
        });
    }

    const note = {
        id: generateId(),
        content: body.content,
        important: Boolean(body.important) || false
    };

    notes = notes.concat(note);

    response.json(note);
});

const generateId = () => {
    const maxId = notes.length > 0 
        ? Math.max(...notes.map(n => Number(n.id)))
        : 0;
    return String(maxId + 1);
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint'});
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Note = require('./models/note'); //DB

const app = express();
app.use(express.static('dist'));
app.use(express.json());

app.use(cors());

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method);
    console.log('Path: ', request.path);
    console.log('Body: ', request.body);
    console.log('---');
    next();
};

app.use(requestLogger);

app.get('/', (request,response) => {
    //response.set('Content-Type', 'text/plain');
    response.send('<h1>Hello world!</h1>');
});

app.get('/api/notes', (request,response) => {
    //response.set('Content-Type', 'application/json');
    //console.log(request);
    Note.find({}).then(notes => {
        response.json(notes).end();
        //mongoose.connection.close();
    });
});

app.get('/api/notes/:id', (request,response,next) => {
    console.log(request.url);
    console.log(request.params);
    const id = request.params.id;
    // const note = notes.find(note => note.id === id);
    // console.log(note);
    // if (note) { // same as (note !== undefined)
    //     response.json(note);
    // } else {
    //     response.statusMessage = "Note not found"; // overriding the dafault NOT FOUND message
    //     response.status(404).end();
    // }
    Note.findById(id)
        .then(note => {
            if (note) {
                //if the request succeeded and the note existed
                response.json(note);
            } else {
                //if the request succeeded but the note didn't exist
                response.status(404).end();
            }
        })
        .catch(error => {
            // console.log(error);
            // response.status(400).send({
            //     error: 'malformatted id'
            // });
            next(error);
        });
});

app.delete('/api/notes/:id', (request,response) => {
    const id = request.params.id;
    // const noteToDelete = notes.find(note => note.id === id);
    // if (!noteToDelete) {
    //     response.statusMessage = "Note already deleted";
    //     response.status(404).end();
    // }
    // notes = notes.filter(note => note.id !== id);
    // response.status(200).json(noteToDelete);
    // response.end();

    Note.findByIdAndDelete(id)
        .then(result => {
            console.log(result);
            response.status(200).json(result);
        })
        .catch(error => next(error));

});

app.post('/api/notes/', (request, response) => {

    const body = request.body;
    if (!body.content){
        return response.status(400).json({
            error: 'content missing'
        });
    }

    const note = new Note({
        // id: generateId(),
        content: body.content,
        important: Boolean(body.important) || false
    });

    note.save().then((savedNote => {
        response.json(savedNote);
    }));

});

app.put('/api/notes/:id', (request, response, next) => {
    const id = request.params.id;
    const body = request.body;
    const note = {
        content: body.content,
        important: body.important
    };
    console.log('post to api/note/:id');
    Note.findByIdAndUpdate(id, note, { new: true })
        .then(updatedNote => {
            console.log(updatedNote);
            response.json(updatedNote);
        })
        .catch(error => next(error));
});

// const generateId = () => {
//     const maxId = notes.length > 0 
//         ? Math.max(...notes.map(n => Number(n.id)))
//         : 0;
//     return String(maxId + 1);
// }

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint'});
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
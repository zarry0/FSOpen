/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react'
import Note from './components/Note'
import ImportantNote from './components/ImportantNote.jsx'
import noteService from './services/notes.js'
import Notification from './components/Notification.jsx'
import Footer from './components/Footer.jsx'
import axios from 'axios'

const App = (props) => {

  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  const [notesEffect, setNotesEffect] = useState([]);
  const [finishFetch, setFinishFetch] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log('Effect')
    // axios
    //   .get('http://localhost:3001/notes')
    //   .then(
    //     response => {
    //     console.log('promise fulfilled')
    //     setNotesEffect(response.data)
    //     setFinishFetch(true)
    //   },
    //     () => setFinishFetch(false))
    noteService
      .getAll()
      .then(initialNotes => {
        setNotesEffect(initialNotes);
        setFinishFetch(true)
      },
      () => setFinishFetch(false));
  }, [])
  console.log('render', notesEffect.length, 'notes')
  
  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  const notesToShow2d = showAll ? notesEffect : notesEffect.filter(note => note.important);

  const addNote = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    console.log("target info", event.target['0'].value);
    const noteObj = 
    {
      id : notes.length+1,
      content : newNote, //event.target['0'].value,
      important : Math.random() < 0.5
    }
    setNotes([...notes, noteObj])
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log("Event: ", event)
    console.log("Event target: ", event.target)
    console.log("Event target value: ", event.target.value)
    setNewNote(event.target.value)
  }

  const addNoteToServer = (event) => {
    event.preventDefault();
    console.log("buton pressed, sending to server...");
    const noteObj = {
      id : `${notesEffect.length + 1}`,
      content : newNote,
      important : Math.random() < 0.5
    };

    // axios
    //   .post('http://localhost:3001/notes', noteObj)
    //   .then(response => {
    //     console.log(response)
    //     setNotesEffect(notesEffect.concat(response.data))
    //     setNewNote('')
    //   })

    noteService.create(noteObj)
      .then(
        createdNote => {
        console.log(createdNote)
        setNotesEffect(notesEffect.concat(createdNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = (id) => {
    console.log('importance of ' + id + ' needs to be toggled')
    const url = `http://localhost:3001/notes/${id}`;
    const note = notesEffect.find(n => n.id === id);
    const updatedNote = {...note, important : !note.important};

    // axios.put(url, updatedNote)
    //   .then(response => {
    //     setNotesEffect(notesEffect.map(n => n.id !== id ? n : response.data));
    //   });

    noteService.update(id, updatedNote)
      .then(toggledNote => {
        setNotesEffect(notesEffect.map(n => n.id !== id ? n : toggledNote));
      })
      .catch(error => {
        // alert(`the note "${note.content}" was already deleted from server`);
        const errorMsg = `the note "${note.content}" was already deleted from server`;
        setErrorMessage(errorMsg);
        setTimeout(() => setErrorMessage(null), 5000);
        setNotesEffect(notesEffect.filter(n => n.id !== id))        
      })
  };
  

  return (
    <>
      <div> {/* 2a */}
        <h1>[2a]Rendering a collection, modules</h1>
        <h2>Notes</h2>
        <ul>
          <li>{props.notes[0].content}</li>
          <li>{props.notes[1].content}</li>
          <li>{props.notes[2].content}</li>
        </ul>
        <h2>Notes rendered with a map</h2>
        <ul>
          {props.notes.map(note => <li key={note.id}>{note.content}</li>)}
        </ul>
        <h2>Notes rendered with a map with its own component</h2>
        <ul>
          {props.notes.map(note => <Note key={note.id} note = {note}/>)}
        </ul>
      </div>

      <div> {/* 2b */}
        <h1>[2b]Forms</h1>
        <div>
          <h2>Controlled components</h2>
          <h3>Notes</h3>
          <ul>
            {notes.map(note => <Note key={note.id} note={note}/>)}
          </ul>
          <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange}/>
            <button type='submit'>save</button>
          </form>
        </div>
        <div>
          <h2>Filtering Notes</h2>
          <h3>Notes</h3>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all'}
          </button>
          <ul>
            {notesToShow.map(note => <Note key={note.id} note={note}/>)}
          </ul>
        </div>
      </div>

      <div> {/* 2c */}
        <h1>[2c]Getting data from server</h1>
        <h2>Notes (Fetched from json-server)</h2>
        {finishFetch && 
          <ul>
          <li>{notesEffect[0].content}</li>
          <li>{notesEffect[1].content}</li>
          <li>{notesEffect[2].content}</li>
        </ul> 
        }
        
      </div>

      <div> {/* 2d */}
        <h1>[2d] Altering data in server</h1>
        <h2>Notes (fetched from json server)</h2>
        <Notification message={errorMessage}/>
        {finishFetch &&
          <>
            <button onClick={() => setShowAll(!showAll)}>show {showAll ? "important" : "all"}</button>
            <ul>
              {notesToShow2d.map(note => <ImportantNote note={note} toggleImportance={() => toggleImportanceOf(note.id)} key={note.id}/>)}
            </ul>
            <form onSubmit={addNoteToServer}>
              <input value={newNote} onChange={handleNoteChange}/>
              <button type='submit'>add new note</button>
            </form>
          </>
        }
      </div>

      <Footer />
    </>
  )
}


export default App
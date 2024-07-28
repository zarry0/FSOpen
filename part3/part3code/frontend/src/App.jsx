import { useState, useEffect } from 'react'
import ImportantNote from './components/ImportantNote.jsx'
import noteService from './services/notes.js'
import Notification from './components/Notification.jsx'
import Footer from './components/Footer.jsx'


function App() {
  const [notesEffect, setNotesEffect] = useState(null);
  const [finishFetch, setFinishFetch] = useState(false);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
    console.log('Effect')
    noteService
      .getAll()
      .then(initialNotes => {
        setNotesEffect(initialNotes);
        setFinishFetch(true)
      },
      () => setFinishFetch(false));
  }, []);

  if (finishFetch)
    console.log('render', notesEffect.length, 'notes');

  const notesToShow2d = showAll ? notesEffect : notesEffect.filter(note => note.important);


  const addNoteToServer = (event) => {
    event.preventDefault();
    console.log("buton pressed, sending to server...");
    const noteObj = {
      id : `${notesEffect.length + 1}`,
      content : newNote,
      important : Math.random() < 0.5
    };

    noteService.create(noteObj)
      .then(
        createdNote => {
        console.log(createdNote)
        setNotesEffect(notesEffect.concat(createdNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = (id) => {
    console.log('importance of ' + id + ' needs to be toggled');
    const url = `http://localhost:3001/notes/${id}`;
    const note = notesEffect.find(n => n.id === id);
    const updatedNote = {...note, important : !note.important};

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
      });
  };

  const handleNoteChange = (event) => {
    console.log("Event: ", event)
    console.log("Event target: ", event.target)
    console.log("Event target value: ", event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div> 
      <h1>Notes</h1>
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
      <Footer />
    </div>
  )
}

export default App;

/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react'
import Note from './components/Note'
import axios from 'axios'

const App = (props) => {

  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  const [notesEffect, setNotesEffect] = useState([]);
  const [finishFetch, setFinishFetch] = useState(false);
  useEffect(() => {
    console.log('Effect')
    axios
      .get('http://localhost:3001/notes')
      .then(
        response => {
        console.log('promise fulfilled')
        setNotesEffect(response.data)
        setFinishFetch(true)
      },
        () => setFinishFetch(false))
  }, [])
  console.log('render', notesEffect.length, 'notes')
  
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

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
  return (
    <>
      <div>
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

      <div>
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

      <div>
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
    </>
  )
}


export default App
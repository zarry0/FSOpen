/* eslint-disable react/jsx-key */
import Note from './components/Note'

const App = ({notes}) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
      </ul>
      <h1>Notes rendered with a map</h1>
      <ul>
        {notes.map(note => <li key={note.id}>{note.content}</li>)}
      </ul>
      <h1>Notes rendered with a map with its own component</h1>
      <ul>
        {notes.map(note => <Note key={note.id} note = {note}/>)}
      </ul>
    </div>
  )
}

export default App
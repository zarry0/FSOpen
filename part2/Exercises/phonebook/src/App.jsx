import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import { Persons } from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])
  const [personsFiltered, setPersonsFiltered] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value)
  }

  const handleAdd = (e) => {
    e.preventDefault()
    
    if (persons.find(person => person.name === newName) === undefined) {
      const personObj = { 
        name : newName,
        phone : newPhone
      };
      const newPersons = [...persons, personObj]
      setPersons(newPersons)
      setPersonsFiltered(newPersons)
    }else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewPhone('')
  }

  const handleFilter = (e) => {
    const newFilter = e.target.value
    if (newFilter !== "") {
      const newPersons = persons.filter(({name}) => name.toLowerCase().includes(filter.toLowerCase()))
      setPersonsFiltered(newPersons)
      console.log(newPersons)
    }else {
      setPersonsFiltered(persons)
    }
    setFilter(newFilter)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handler={handleFilter}/>

      <h2>add a new</h2>
  
      <PersonForm 
        nameValue={newName}
        numberValue={newPhone}
        handlers={{
          nameHandler: handleNameChange,
          numberHandler: handlePhoneChange,
          btnHandler : handleAdd
        }}
      />
      <h2>Numbers</h2>
      <Persons persons={personsFiltered}/>
    </div>
  )
}







export default App
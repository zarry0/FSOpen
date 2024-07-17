import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import { Persons } from './components/Persons'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])
  const [personsFiltered, setPersonsFiltered] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const baseURL = 'http://localhost:3001/persons';
  useEffect(() => {
    console.log("Inisde effect hook")
    axios
      .get(baseURL)
      .then(
        response => {
          console.log(response)
          const personsData = response.data
          setPersons(personsData)
          setPersonsFiltered(personsData)
        },
        error => console.log("Error ", error))
  }, []);

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
        number : newPhone
      };
      const newPersons = [...persons, personObj]
      console.log(newPersons)
      
      axios
        .post(baseURL, personObj)
        .then(response => {
          console.log(response.data)
          setPersons(newPersons)
          setPersonsFiltered(newPersons)
        })

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
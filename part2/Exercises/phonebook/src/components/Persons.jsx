export const Persons = ({persons}) => {
    return (<ul>{persons.map(person => <Person key={person.name} person={person}/>)}</ul>)
}

const Person = ({person}) => {
    return (
      <div>
        <li>{person.name} {person.number}</li>
      </div>
    )
}

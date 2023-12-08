const Header = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}
const Content = ({parts}) => {
  console.log('Content props: ')
  console.log(parts)
  return (
    <>
      <Part part = {parts[0]} />
      <Part part = {parts[1]} />
      <Part part = {parts[2]} />
    </> 
  )
}

const Part = ({part}) => {
  console.log('Part props: ')
  console.log(part)
  return <p>{part.name} {part.exercises}</p>
}

const Total = ({parts}) => {
  console.log('Total props: ')
  console.log(parts)
  const exercises = parts.map(part => part.exercises)
  let total = exercises.reduce((acc, num) => acc += num, 0)
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header title = {course}/>
      <Content parts = {parts} />
      <Total parts = {parts} />
    </div>  
  )
}

export default App

const Header = ({course}) => {
  return <h1>{course.name}</h1>
}

const Content = ({course}) => {
  const parts = course.parts
  return (
    <>
      <Part part = {parts[0]} />
      <Part part = {parts[1]} />
      <Part part = {parts[2]} />
    </> 
  )
}

const Part = ({part}) => {
  return <p>{part.name} {part.exercises}</p>
}

const Total = ({course}) => {
  const parts = course.parts
  const exercises = parts.map(part => part.exercises)
  let total = exercises.reduce((acc, num) => acc += num, 0)
  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header  course = {course} />
      <Content course = {course} />
      <Total   course = {course} />
    </div>  
  )
}

export default App

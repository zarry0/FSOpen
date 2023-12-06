const Header = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}
const Content = (props) => {
  return (
    <>
      <Part part = {props.parts[0]} exercise = {props.exercises[0]}></Part>
      <Part part = {props.parts[1]} exercise = {props.exercises[1]}></Part>
      <Part part = {props.parts[2]} exercise = {props.exercises[2]}></Part>
    </>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
  )
}

const Total = (props) => {
  let total = 0;
  for (let i = 0; i < props.exercises.length; i++) 
    total += props.exercises[i]
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header title = {course}></Header>
      <Content parts = {[part1, part2, part3]} 
               exercises = {[exercises1, exercises2, exercises3]}></Content>
      <Total exercises = {[exercises1, exercises2, exercises3]}></Total>
    </div>  
  )
}

export default App

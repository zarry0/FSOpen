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

const Total = ({exercises}) => {
  console.log('Total props: ')
  console.log(exercises)
  let total = exercises.reduce((acc, num) => acc += num, 0)
  // let total = 0;
  // for (let i = 0; i < exercises.length; i++) 
  //   total += exercises[i]
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header title = {course}/>
      <Content parts = {[part1, part2, part3]} />
      <Total exercises = {[part1.exercises, 
                          part2.exercises, 
                          part3.exercises]}/>
    </div>  
  )
}

export default App

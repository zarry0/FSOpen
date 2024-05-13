const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({parts}) => <div>{parts.map(part => <Part key={part.id} part={part}/>)}</div>


const Course = ({course}) => {
  return (
  <>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)}/>
  </>
)
}

export default Course
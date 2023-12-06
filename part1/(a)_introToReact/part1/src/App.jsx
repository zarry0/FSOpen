const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}

const Hello2 = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now, a+b)
  const name = 'Peter'
  const age = 10

  const friends = [
    {name: 'Peter', age: 4},
    {name: 'Maya', age: 10} 
  ]
  const friends2 = ['Peter', 'Maya']
  return (
    <div>
      <div>
        <p>Hello world, it is {now.toString()}</p>
        <p>
          {a} plus {b} is {a+b}
        </p>
      </div>

      <div>
        <h1>Greetings</h1>
        <h2>Hello component</h2>
        <Hello name='George'/>
        <Hello name='Daisy'/>
        <Hello props="hello" name="Dave" />
        <Hello props={1} />
      </div>

      <> {/* Esto es un fragment, un wrapper element 
              que no añade ningud div extra al DOM */}
        <h2>Hello2 component</h2>
        <Hello2 name='Maya' age={26+10}/>
        <Hello2 name='Tania' age={18}></Hello2>
        <Hello2 name={name} age={age}/>
      </>

      <>
        <h2>Friends</h2>
        <p>{friends[0].name} {friends[0].age}</p>
        <p>{friends[1].name} {friends[1].age}</p>
        <h2>Friends2</h2>
        <p>{friends2}</p>
      </>
    </div>
  )
}

export default App

import { useState } from "react"

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

  const [counter, setCounter] = useState(0)

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  const [stateObj, setStateObj] = useState({ left : 0, right : 0});

  const [allClicks, setAllClicks] = useState([]);

  const [totalWrongClicks, setTotalWrongClicks] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);

  const [value, setValue] = useState(10); 

  const [variableValue, setVariableValue] = useState(10);

  const setToValue = (val) => () => {
    setVariableValue(val)
    console.log('New value set to: ', val);
  }

  const curriedFn = (arg) => {
    return () => {
      console.log('hello', arg);
    }
  }
  const handler = () => {
    setValue(0);
    console.log('Clicked the button');
  }

  const handleLeftClick = () => {
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setAllClicks([...allClicks, 'L'])
    setTotalWrongClicks(left + right)
    setTotalClicks(updatedLeft + right)
  }

  const handleRightClick = () => {
    const updatedRight = right + 1
    setRight(updatedRight)
    setAllClicks([...allClicks, 'R'])
    setTotalWrongClicks(left + right)
    setTotalClicks(left + updatedRight)
  }
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
              que no añade ningun div extra al DOM */}
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

      <>
        <h1>Counter</h1>
        <Display counter={counter}/>
        <Button text='minus' onClick={() => setCounter(counter - 1)}/>
        <Button text='zero' onClick={() => setCounter(0)}/>
        <Button text='plus' onClick={() => setCounter(counter + 1)}/>
      </>

      <h1>Complex state</h1>
      <>
      <h2>Two separated states</h2>
      <p>Left: {left}</p>
      <Button text="+" onClick={handleLeftClick}/>
      <Button text="+" onClick={handleRightClick}/>
      <p>Right: {right}</p>
      </>

      <>
      <h2>A single state object</h2>
      <p>Left: {stateObj.left}</p>
      <button onClick={() => {
          setStateObj({ ...stateObj, left : stateObj.left + 1})
        }}>+</button>
      <button onClick={() => {
          setStateObj({ ...stateObj, right : stateObj.right + 1})
        }}>+</button>
      <p>Right: {stateObj.right}</p>
      </>

      <>
      <h2>Handling arrays</h2>
      <p>{allClicks.join(' ')}</p>
      </>

      <>
      <h2>Update of the state is asynchronous</h2>
      <p>Total clicks (wrong): {totalWrongClicks}</p>
      <p>Total clicks: {totalClicks}</p>
      </>

      <>
      <h2>Conditional Rendering</h2>
      <History allClicks={allClicks}/>
      </>

      <>
      <h2>Event handling revisited</h2>
      <div>
        {value}
        <Button onClick={handler} text='reset'/>
      </div>
      <div>
        <h3>Using currying</h3>
        <Button onClick={curriedFn('arg1')} text='button1'/>
        <Button onClick={curriedFn('arg2')} text='button2'/>
        <Button onClick={curriedFn('arg3')} text='button3'/>
      </div>
      <div>
        <h3>Using currying to set a value</h3>
        <Display counter={variableValue}/>
        <Button onClick={setToValue(1000)} text='1000'/>
        <Button onClick={setToValue(100)} text='100'/>
        <Button onClick={setToValue(10)} text='10'/>
        <Button onClick={setToValue(0)} text='0'/>
        <Button onClick={setToValue(variableValue + 1)} text='+1'/>
      </div>
      </>
    </div> 
  )
}

const Display = ({counter}) => <p>{counter}</p>

const Button = ({text, onClick}) => {
  return <button onClick = {onClick}>{text}</button>
}

const History = ({allClicks}) => {
  if (allClicks.length === 0) {
    return ( <div>
      the app is used by pressing the buttons
    </div> )
  }
  return (
    <div>
      button press history: {allClicks.join(' ')}
    </div>
  )
}

export default App
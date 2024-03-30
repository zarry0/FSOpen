import { useState } from "react"

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" handleClick={() => setGood(good + 1)}/>
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" handleClick={() => setBad(bad + 1)}/>
      
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positivePercent = (100 * good) / total;

  const showStats = (good + neutral + bad) > 0;
  if (!showStats) return <>No feedback given</>

  return (
    <table>
      <tbody>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='all' value={total}/>
      <StatisticLine text='average' value={average}/>
      <StatisticLine text='positive' value={`${positivePercent}%`}/>
      </tbody>
    </table>
  ); 
}

const StatisticLine = ({text, value}) => {
  return <tr><td>{text}</td><td>{value}</td></tr>;
}

export default App

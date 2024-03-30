import { useState } from "react"

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positivePercent = (100 * good) / total;
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h2>statistics</h2>
      good {good} <br/>
      neutral {neutral} <br/>
      bad {bad} <br/>
      all {total} <br/>
      average {average ? average : 0} <br/>
      positive {positivePercent ? positivePercent : 0} %
    </div>
  );
}

export default App

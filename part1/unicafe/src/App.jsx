import React, { useState, useEffect } from "react";

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Stats = ({good, neutral, bad, total, average, positive}) => {
  if (total == 0) {
    return <p>No feedback given yet.</p>
  } else {
    return (
      <div>
        <h1>stats for nerds</h1>
        <table>
          <tbody>
            <StatLine text="good" value ={good} />
            <StatLine text="neutral" value ={neutral} />
            <StatLine text="bad" value ={bad} />
            <StatLine text="total" value ={total} />
            <StatLine text="average" value ={average.toFixed(2)} />
            <StatLine text="positive" value ={`${positive.toFixed(2)}%`} />
          </tbody>
        </table>
      </div>
    )
  }
}


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  useEffect(() => {
    const updatedTotal = good + neutral + bad;
    const updatedAverage = updatedTotal ? (1 * good + -1 * bad) / updatedTotal : 0;
    const updatedPositive = updatedTotal ? (good / updatedTotal) * 100 : 0;

    setTotal(updatedTotal);
    setAverage(updatedAverage);
    setPositive(updatedPositive);

    console.log(`good: ${good}, neutral: ${neutral}, bad: ${bad}, total: ${updatedTotal}`);
  }, [good, neutral, bad]); // Runs whenever good, neutral, or bad changes

  const handleGoodClick = () => setGood((prev) => prev + 1);
  const handleNeutralClick = () => setNeutral((prev) => prev + 1);
  const handleBadClick = () => setBad((prev) => prev + 1);

  return (
    <div>
      <h1>give feedback thx</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Stats
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App
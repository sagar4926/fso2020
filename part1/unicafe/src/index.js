import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const getTotal = () => good + bad + neutral;

  const getAverage = () => {
    const total = getTotal();
    return total > 0 ? (good - bad) / getTotal() : total;
  };

  const getPositivePercentage = () => {
    const total = getTotal();
    return total > 0 ? (good * 100) / total : 0;
  };

  if (getTotal() === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <Statistic text="good" value={good}></Statistic>
        <Statistic text="neutral" value={neutral}></Statistic>
        <Statistic text="bad" value={bad}></Statistic>
        <Statistic text="all" value={getTotal()}></Statistic>
        <Statistic text="average" value={getAverage()}></Statistic>
        <Statistic text="positive" value={getPositivePercentage()}></Statistic>
      </tbody>
    </table>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)}></Button>
      <Button
        text="neutral"
        handleClick={() => setNeutral(neutral + 1)}
      ></Button>
      <Button text="bad" handleClick={() => setBad(bad + 1)}></Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

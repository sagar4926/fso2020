import React, { useState } from "react";
import ReactDOM from "react-dom";

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
  
  return (
    <>
      <p>all {getTotal()}</p>
      <p>average {getAverage()}</p>
      <p>positive {getPositivePercentage()} %</p>{" "}
    </>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

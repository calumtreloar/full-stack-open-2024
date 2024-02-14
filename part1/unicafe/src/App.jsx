import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setGoodCount = () => setGood(good + 1);
  const setNeutralCount = () => setNeutral(neutral + 1);
  const setBadCount = () => setBad(bad + 1);
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <table>
      <thead>
        <tr>
          <th>give feedback</th>
        </tr>
        <tr>
          <Button setCount={setGoodCount} text="good" />
          <Button setCount={setNeutralCount} text="neutral" />
          <Button setCount={setBadCount} text="bad" />
        </tr>
      </thead>

      <tbody>
        <tr>
          <th>statistics</th>
        </tr>
        <>
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            all={all}
            average={average}
            positive={positive}
          />
        </>
      </tbody>
    </table>
  );
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all > 0) {
    return (
      <>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={all} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positive} unit="%" />
      </>
    );
  }
  return (
    <tr>
      <td>No feedback given</td>
    </tr>
  );
};

const StatisticsLine = ({ text, value, unit }) => {
  return (
    <tr>
      <td>
        {text}: {value} {unit}
      </td>
    </tr>
  );
};

const Button = ({ setCount, text }) => {
  return (
    <td>
      <button onClick={setCount}>{text}</button>
    </td>
  );
};

export default App;

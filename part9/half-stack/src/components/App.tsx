import React from "react";
import Header from "./Header";
import Total from "./Total";
import Contents from "./Contents";

export type Course = {
  name: string;
  exerciseCount: number;
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: Course[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const total = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName}></Header>
      <Contents courses={courseParts}></Contents>
      <Total total={total}></Total>
    </div>
  );
};

export default App;

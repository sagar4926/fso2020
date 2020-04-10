import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

const Content = ({ data: [part1, part2, part3] }) => {
  return (
    <>
      <Part part={part1.name} exercise={part1.exercises}></Part>
      <Part part={part2.name} exercise={part2.exercises}></Part>
      <Part part={part3.name} exercise={part3.exercises}></Part>
    </>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course}></Header>
      <Content data={[part1, part2, part3]}></Content>
      <Total
        total={part1.exercises + part2.exercises + part3.exercises}
      ></Total>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

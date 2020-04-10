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

const Content = ({ parts: [part1, part2, part3] }) => {
  return (
    <>
      <Part part={part1.name} exercise={part1.exercises}></Part>
      <Part part={part2.name} exercise={part2.exercises}></Part>
      <Part part={part3.name} exercise={part3.exercises}></Part>
    </>
  );
};

const Total = ({parts: [part1, part2, part3]}) => {
  return <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

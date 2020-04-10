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

const Content = ({ data }) => {
  return (
    <>
      <Part part={data.part1} exercise={data.exercises1}></Part>
      <Part part={data.part2} exercise={data.exercises2}></Part>
      <Part part={data.part3} exercise={data.exercises3}></Part>
    </>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course}></Header>
      <Content
        data={{ part1, part2, part3, exercises1, exercises2, exercises3 }}
      ></Content>
      <Total total={exercises1 + exercises2 + exercises3}></Total>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

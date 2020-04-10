import React from "react";

const Header = (props) => {
  return <h3>{props.course}</h3>;
};

const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

const Content = ({ parts }) => {
  return parts.map((part) => (
    <Part key={part.id} part={part.name} exercise={part.exercises}></Part>
  ));
};

const Total = ({ parts }) => {
  const getTotal = () => {
    return parts.reduce((acc, part) => acc + part.exercises, 0);
  };

  return (
    <p>
      <strong>total of {getTotal()} exercises</strong>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  );
};

export default Course;

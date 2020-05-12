import React from "react";
import { CoursePart } from "./App";
import Part from "./Part";

type Props = {
  courseParts: CoursePart[];
};

const Contents: React.FC<Props> = ({ courseParts: courses }) => {
  return (
    <>
      {courses.map((course) => (
        <Part key={course.name} part={course}></Part>
      ))}
    </>
  );
};

export default Contents;

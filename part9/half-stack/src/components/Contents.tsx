import React from "react";
import { Course } from "./App";

type Props = {
  courses: Course[];
};
const Contents: React.FC<Props> = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Contents;

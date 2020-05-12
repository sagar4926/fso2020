import React, { ReactNode } from "react";
import { CoursePart } from "./App";

type Props = {
  part: CoursePart;
};

const Part: React.FC<Props> = ({ part }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Handling for this part is not implemented ${JSON.stringify(value)}`
    );
  };

  switch (part.name) {
    case "Fundamentals":
    case "JSX: The Why?": {
      return (
        <Container>
          <div>Name: {part.name}</div>
          <div>Exercise Count: {part.exerciseCount}</div>
          <div>Description: {part.description}</div>
        </Container>
      );
    }
    case "Deeper type usage": {
      return (
        <Container>
          <div>Name: {part.name}</div>
          <div>Exercise Count: {part.exerciseCount}</div>
          <div>Description: {part.description}</div>
          <div>Exercise Submission Link: {part.exerciseSubmissionLink}</div>
        </Container>
      );
    }
    case "Using props to pass data": {
      return (
        <Container>
          <div>Name: {part.name}</div>
          <div>Exercise Count: {part.exerciseCount}</div>
        </Container>
      );
    }
    default: {
      return assertNever(part);
    }
  }
};

const Container = ({ children }: { children: ReactNode }) => {
  return <div style={{ margin: 10 }}>{children}</div>;
};
export default Part;

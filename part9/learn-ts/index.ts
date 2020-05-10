import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./calculateExercises";

const app = express();
app.use(express.json());
app.get("/", (_req, res) => {
  res.send("");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (!weight || isNaN(weight)) {
    res
      .status(400)
      .send({ error: "Please send a valid weight as query param" });
  }
  if (!height || isNaN(height)) {
    res
      .status(400)
      .send({ error: "Please send a valid height as query param" });
  }

  res.send({
    weight,
    height,
    bmi: calculateBmi(weight, height),
  });
});

app.post("/exercise-calculator", (req, res) => {
  const body = req.body;
  if (!body.daily_exercises || !body.target) {
    return res.status(400).send({
      error: "parameters 'daily_exercises' and 'target' are required",
    });
  }

  if (!Array.isArray(body.daily_exercises)) {
    return res.status(400).send({
      error: "parameter 'daily_exercises' must be an array of numbers",
    });
  }
  const daily_exercises: number[] = body.daily_exercises.map((day: number) => {
    const n = Number(day);
    if (isNaN(n)) {
      res.status(400).send({
        error: "parameter 'daily_exercises' must be an array of numbers",
      });
    }
    return n;
  });
  const target = Number(body.target);
  if (isNaN(target)) {
    return res.status(400).send({
      error: "parameter 'target' must be a valid number",
    });
  }
  res.send(calculateExercises(daily_exercises, target));
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});

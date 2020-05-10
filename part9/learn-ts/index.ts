import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/", (_req, res) => {
  res.send("");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight: number = Number(req.query.weight);
  const height: number = Number(req.query.height);
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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});

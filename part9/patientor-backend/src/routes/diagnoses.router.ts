import express from "express";
import { getAllDiagnoses } from "../services/diagnoses.service";

const diagnosesRouter = express.Router();

diagnosesRouter.get("", (_req, res) => {
  res.send(getAllDiagnoses());
});

export default diagnosesRouter;

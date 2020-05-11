import express from "express";
import { getAllPatientsPublicInfo } from "../services/patients.service";

const patientsRouter = express.Router();

patientsRouter.get("", (_req, res) => {
  res.send(getAllPatientsPublicInfo());
});

export default patientsRouter;

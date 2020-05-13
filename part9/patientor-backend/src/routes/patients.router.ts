import express from "express";
import patientsService from "../services/patients.service";
import patientParser from "../parsers/patient.parser";

const patientsRouter = express.Router();

patientsRouter.get("", (_req, res) => {
  res.send(patientsService.getAllPatientsPublicInfo());
});

patientsRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(patientsService.getPatientById(id));
});

patientsRouter.post("", (req, res) => {
  res
    .status(201)
    .send(patientsService.createPatient(patientParser.parsePatient(req.body)));
});

export default patientsRouter;

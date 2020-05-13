import express from "express";
import patientParser from "../parsers/patient.parser";
import patientsService from "../services/patients.service";

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

patientsRouter.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getPatientById(id);
  if (!patient) {
    return res.status(404).end("Patient not found");
  }
  try {
    const requestEntry = patientParser.parseEntry(req.body);
    if (requestEntry) {
      const entry = patientsService.createPatientEntry(patient, requestEntry);
      res.status(200).send(entry);
    } else {
      return res.status(422).send("Unable to parse Entry");
    }
  } catch (e) {
    res.status(400).send(e);
  }
});
export default patientsRouter;

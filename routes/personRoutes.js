const express = require("express");
const router = express.Router();
const Person = require("../modules/Person");

router.post("/", async (req, res) => {
  try {
    const data = req.body; // assuming that body parser store the data at req.body
    const newPerson = new Person(data);

    // save person data to the database

    const response = await newPerson.save();
    console.log("Data Saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: " Internal Server Error" });
  }
});

// GET method to get the person data
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Person Data Extracted");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: " Internal Server Error" });
  }
});

// query parameter

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // Extract work type from the url parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("Data Extracted");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Work type not found" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: " Internal Server Error" });
  }
});

// update person data

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // extract the id(id assigned by mongodb) from URL parameter
    const updatedPersonData = req.body; // Update person data

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // return updated document
        runValidators: true, // run mongoose validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data Updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: " Internal Server Error" });
  }
});

// delete person data

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // extracted person id 
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data Deleted");
    res.status(200).json({message:"Person deleted successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: " Internal Server Error" });
  }
});
module.exports = router;

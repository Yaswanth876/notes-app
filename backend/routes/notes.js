const express = require("express");
const router = express.Router();
const Note = require("../models/note");

// GET all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new note
router.post("/", async (req, res) => {
  const note = new Note({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

// DELETE a note
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE (Edit) a note
router.put("/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
      },
      { new: true } // returns updated document
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

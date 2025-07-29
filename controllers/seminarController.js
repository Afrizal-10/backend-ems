const Seminar = require("../models/Seminar");

// Create Seminar
exports.createSeminar = async (req, res) => {
  try {
    const {title, description, date, location, speaker, capacity} = req.body;
    const image = req.file ? req.file.path : null;

    const newSeminar = await Seminar.create({
      title,
      description,
      date,
      location,
      speaker,
      capacity,
      image,
    });

    res.status(201).json({
      message: "Seminar created successfully",
      seminar: newSeminar,
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Get All Seminars
exports.getAllSeminars = async (req, res) => {
  try {
    const seminars = await Seminar.find();
    res.status(200).json(seminars);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Get Single Seminar by ID
exports.getSeminarById = async (req, res) => {
  try {
    const seminar = await Seminar.findById(req.params.id);
    if (!seminar) return res.status(404).json({message: "Seminar not found"});
    res.status(200).json(seminar);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Update Seminar
exports.updateSeminar = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }

    const seminar = await Seminar.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!seminar) return res.status(404).json({message: "Seminar not found"});

    res.status(200).json({
      message: "Seminar updated",
      seminar,
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Delete Seminar
exports.deleteSeminar = async (req, res) => {
  try {
    const seminar = await Seminar.findByIdAndDelete(req.params.id);
    if (!seminar) return res.status(404).json({message: "Seminar not found"});

    res.status(200).json({message: "Seminar deleted"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

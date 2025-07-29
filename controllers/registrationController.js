const Registration = require("../models/Registration");
const Seminar = require("../models/Seminar");

// Daftar seminar
const registerForSeminar = async (req, res) => {
  try {
    const {seminarId} = req.body;

    // Cek seminar
    const seminar = await Seminar.findById(seminarId);
    if (!seminar) {
      return res.status(404).json({message: "Seminar not found"});
    }

    // Cek apakah sudah terdaftar
    const existingRegistration = await Registration.findOne({
      user: req.user._id,
      seminar: seminarId,
    });

    if (existingRegistration) {
      return res
        .status(400)
        .json({message: "Already registered for this seminar"});
    }

    // Buat pendaftaran
    const registration = await Registration.create({
      user: req.user._id,
      seminar: seminarId,
    });

    res.status(201).json({
      message: "Registration successful",
      registration,
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Lihat semua seminar yang diikuti user
const getUserRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({user: req.user._id})
      .populate("seminar")
      .sort({createdAt: -1});

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Lihat detail tiket
const getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate("seminar")
      .populate("user", "name email");

    if (
      !registration ||
      registration.user._id.toString() !== req.user._id.toString()
    ) {
      return res.status(404).json({message: "Ticket not found"});
    }

    res.status(200).json(registration);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Semua tiket user (untuk halaman Ticket)
const getAllTicketsForUser = async (req, res) => {
  try {
    const registrations = await Registration.find({user: req.user._id})
      .populate("seminar")
      .populate("user", "name email")
      .sort({createdAt: -1});

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {
  registerForSeminar,
  getUserRegistrations,
  getRegistrationById,
  getAllTicketsForUser,
};

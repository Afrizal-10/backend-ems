const express = require("express");
const router = express.Router();
const {
  registerForSeminar,
  getUserRegistrations,
  getRegistrationById,
  getAllTicketsForUser,
} = require("../controllers/registrationController");
const {protect} = require("../middlewares/authMiddleware");

// Daftar seminar
router.post("/", protect, registerForSeminar);

// Semua tiket user (untuk halaman Ticket)
router.get("/me/all", protect, getAllTicketsForUser);

// Daftar seminar yang diikuti user
router.get("/", protect, getUserRegistrations);

// Detail tiket berdasarkan ID - LETAKKAN PALING AKHIR
router.get("/:id", protect, getRegistrationById);

module.exports = router;

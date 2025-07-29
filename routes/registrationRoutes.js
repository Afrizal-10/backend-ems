const express = require("express");
const router = express.Router();
const {
  registerForSeminar,
  getUserRegistrations,
  getRegistrationById,
  getAllTicketsForUser,
} = require("../controllers/registrationController");
const {protect} = require("../middlewares/authMiddleware");

//  daftar seminar
router.post("/", protect, registerForSeminar);

// daftar seminar yang diikuti user
router.get("/", protect, getUserRegistrations);

// detail tiket
router.get("/:id", protect, getRegistrationById);

// semua tiket user (untuk halaman Ticket)
router.get("/me/all", protect, getAllTicketsForUser);

module.exports = router;

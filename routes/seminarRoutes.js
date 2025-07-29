const express = require("express");
const router = express.Router();
const {
  createSeminar,
  getAllSeminars,
  getSeminarById,
  updateSeminar,
  deleteSeminar,
} = require("../controllers/seminarController");
const {protect, adminOnly} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

router.post("/", protect, adminOnly, upload.single("image"), createSeminar);
router.put("/:id", protect, adminOnly, upload.single("image"), updateSeminar);
router.delete("/:id", protect, adminOnly, deleteSeminar);
router.get("/", protect, getAllSeminars);
router.get("/:id", protect, getSeminarById);

module.exports = router;

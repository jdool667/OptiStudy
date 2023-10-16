const express = require("express");
const router = express.Router();
const {
  addSession,
  getSessions,
  editSession,
} = require("../controllers/session");

// router.post("/", checkToken);
router.post("/addSession", addSession);
router.get("/getSessions", getSessions);
router.put("/editSession", editSession);

module.exports = router;

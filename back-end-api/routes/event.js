const express = require("express");
const { createEvent, updateEventUser, showEvents, decreaseEventUser, searchEvents, eventDetail, getJoinedEvents, createdEvents } = require("../controllers/event");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { authMiddle } = require("../utils/middleware");
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "-" + Date.now() + "." + extension);
  },
});
const upload = multer({ storage: storage });

router.get("/", showEvents);
router.post("/", upload.single("image"), createEvent);

router.get("/:id", eventDetail);

router.post("/search", searchEvents);

router.post("/update_event", updateEventUser)
router.post("/decrease_event", decreaseEventUser)

router.post("/joined_events", getJoinedEvents)
router.post("/created_events", createdEvents)

module.exports = router;

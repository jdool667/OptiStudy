const e = require("express");
const Session = require("../models/Session");

exports.addSession = async (req, res) => {
  const { date, time, subject, last } = req.body;

  // console.log(req.body);

  const newSession = new Session({
    date,
    time,
    subject,
    last,
  });

  try {
    if (!date || !time || !subject || !last) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    if (Session.findOne({ date: date, time: time })) {
      return res.status(400).json({ message: "Session already scheduled" });
    }
    await newSession.save();
    return res.status(200).json({ message: "Session added" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Session not added" });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    return res.status(200).json(sessions);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Sessions not found" });
  }
};

exports.editSession = async (req, res) => {
  const { date, time, subject, last } = req.body.session;

  const newDate = req.body.newDate;

  try {
    const session = await Session.findOne({
      subject: subject,
      date: date,
      time: time,
    });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    session.last = last;
    session.date = formatDate(newDate);
    await session.save();
    return res.status(200).json({ message: "Session edited" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Session not edited" });
  }

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so add 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
};

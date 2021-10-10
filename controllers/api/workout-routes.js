const router = require('express').Router();
const mongojs = require("mongojs");
const db = require('../../models');

router.get("/", (req, res) => {
  db.Workout.aggregate([
    { $addFields: { totalDuration:{ $sum: "$exercises.duration" } } }
    ])
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/:id", ({ body, params }, res) => {
  db.Workout.findOneAndUpdate({ _id: mongojs.ObjectId(params.id) }, { $push: { exercises: body } }, { new: true })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  db.Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/range", (req, res) => {
  db.Workout.aggregate([
      { $addFields: { totalDuration:{ $sum: "$exercises.duration" } } }
    ])
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
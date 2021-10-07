const router = require('express').Router();
const db = require('../../models');

router.get("/", (req, res) => {
    db.Workout.find({}).sort({ _id:-1 }).limit(1)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
});

router.put("/:id", ({ body, params }, res) => {
    db.Exercise.create(body)
        .then(({ _id }) => db.Workout.findOneAndUpdate({ _id: mongojs.ObjectId(params.id) }, { $push: { exercise: _id } }, { new: true }))
        .then(dbExercise => {
            res.json(dbExercise);
        })
        .catch(err => {
            res.json(err);
        });
});

router.post("/", ({ body }, res) => {
    db.Exercise.create(body)
      .then(({ _id }) => db.Workout.create(body, _id))
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
});

router.get("/range", (req, res) => {
    db.Workout.find({})
      .populate("exercises")
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
});
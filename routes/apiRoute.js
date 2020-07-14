var express = require("express");
var router = express.Router();
const Workout = require("../models/workout.js");

module.exports = function(app) {
    router.use(function timeLog (req, res, next) {
        console.log("Time: ", Date.now());
        next();
    });
    
    router.post("/api/workouts", ({ body }, res) => {
        Workout.create(body)
          .then(dbWorkout => {
            res.json(dbWorkout);
          })
          .catch(err => {
            res.status(400).json(err);
          });
      });
      
    router.get("/api/workouts", (req, res) => {
        Workout.find({})
          .sort({ date: -1 })
          .then(dbWorkout => {
            res.json(dbWorkout);
          })
          .catch(err => {
            res.status(400).json(err);
          });
    });
      
    router.push("/api/workouts/:id", ({ body, params }, res) => {
        Workout.findByIdAndUpdate(
            params.id,
            { $push: {exercises: body }},
      
            { new: true, runValidators: true }
        ).then (dbWorkout => {
              res.json(dbWorkout);
        }).catch (err => {
              res.json(err);
        })
    });
      
    router.get("/api/workouts/range", (req,res) => {
        Workout.find({})
            .then(dbWorkout => {
                //console.log(dbWorkout)
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            })
    });
}



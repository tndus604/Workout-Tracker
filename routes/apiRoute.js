const Workout = require("../models/workout");

module.exports = function(app) {
    app.get("/api/workouts", function(req, res){
        Workout.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    });

    app.post("/api/workouts", function(req, res){
        Workout.create({})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });

    app.get("/api/workouts/range", function(req,res){
        Workout.find({})
            .then(data => {
                //console.log(dbWorkout)
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            })
    });

    app.post("/api/workouts/range", function(req, res) {
        Workout.create({})
        .then(data => res.json(data))
        .catch(err => {
            res.json(err);
        })
    })

    app.push("/api/workouts/:id", ({ body, params }, res) => {
        Workout.findByIdAndUpdate(
            params.id,
            { $push: {exercises: body }},
      
            { new: true, runValidators: true }
        ).then (data => {
              res.json(data);
        }).catch (err => {
              res.json(err);
        })
    });
}





const Product = require("../model/singers.model.js");
const Singer = require("../model/singers.model.js");

// Create and Save a new Singer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Creat a Singer
    const singer = new Singer({
        LastName: req.body.LastName,
        FirstName: req.body.FirstName,
        BirthYear: req.body.BirthYear
    });

    // Save Singer in the database
    Singer.create(singer, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Singer."
        });
        else res.send(data);
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Products."
            });
        else res.send(data);
    });
};

// Find a single Product with a ProductId
exports.findOne = (req, res) => {
    Singer.findById(req.params.SingerID, (err, data) => {
        if (err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Singer with id ${req.params.SingerID}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Singer with id " + req.params.SingerID
                });
            }
        } else res.send(data)
    });

};

// Update a Product identified by the ProductId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Singer.updateById(
        req.params.SingerID,
        new Singer(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Singer with id ${req.params.SingerID}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Singer with id " + req.params.SingerID
                    });
                }
            } else res.send(data);
        }
    );

};

// Delete a Product with the specified ProductId in the request
exports.delete = (req, res) => {
    Singer.remove(req.params.SingerID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Singer with id ${req.params.SingerID}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Singer with id " + req.params.SingerID
                });
            }
        } else res.send({ message: `Singer was deleted successfully!` });
    });

};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
    Singer.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Singers."
            });
        else res.send({ message: `All Singers were deleted successfully!` });
    });
};
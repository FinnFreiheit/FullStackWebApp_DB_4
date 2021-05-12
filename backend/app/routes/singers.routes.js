module.exports = app => {
    const singers = require("../controller/singers.controller.js");

    // Create a new Product
    app.post("/singers", singers.create);

    // GET all singers
    app.get("/singers", singers.findAll);

    // GET one single Product with SingerID
    app.get("/singers/:SingerID", singers.findOne);

    // Update one Product with SingerID
    app.put("/singers/:SingerID", singers.update);

    // Delete the Product with SingerID
    app.delete("/singers/:SingerID",singers.delete);

    // Delete all singers
    app.delete("/singers",singers.deleteAll);
};
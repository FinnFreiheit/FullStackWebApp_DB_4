const sql = require("./db.js");

// constructor

const Singer = function(singer) {
    this.LastName = singer.LastName;
    this.FirstName = singer.FirstName;
    this.BirthYear = singer.BirthYear;
};

Singer.create = (newSinger, result) => {
    sql.query("INSERT INTO Singer SET ?", newSinger, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }

        console.log("created Singer: ", {id: res.insertId, ...newSinger });
        result(null, { id: res.insertId, ...newSinger });
    });
};

Singer.findById = (SingerId, result) => {
    sql.query(`SELECT * FROM Singer WHERE SingerID = ${SingerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return; 
        }

        if (res.length) {
            console.log("found Singer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found singer with id 
        result({kind: "not_found"}, null);
    });
};

Singer.getAll = result => {
    sql.query("SELECT * FROM Singer", (err, res) => {
        if (err) {
            console.log("error: ",err);
            result(null, err);
            return;
        }

        console.log("Singer: ", res);
        result(null, res);
    });
};

Singer.updateById = (id, singer, result) => {
    sql.query("UPDATE Singer SET FirstName = ?, LastName = ?, BirthYear = ? WHERE SingerID = ?", [singer.FirstName, singer.LastName, singer.BirthYear, id],(err,res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return; 
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated singer: ", { id: id, ...singer });
            result(null, { id: id, ...singer });
    });
};

Singer.remove = (id, result) => {
    sql.query("DELETE FROM Singer WHERE SingerID = ? ", id, (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Member with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted singer with id: ", id);
        result(null, res);

    });
};

Singer.removeAll = result => {
    sql.query("DELETE FROM Singer", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Singer`);
        result(null, res);
    });
};

module.exports = Singer;
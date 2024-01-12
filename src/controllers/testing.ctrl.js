const db = require("../models");
const Testing = db.testing;

const findAll =  (req, res) => {
    Testing.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Testimoni."
        });
      });
  }

const find = (req,res) => {
    const id = req.params.id;

    Testing.findById(id)
    .then(data => {
        if (!data)
            res.status(404).send({massage: "Not found Testing with id " + id});
        else res.send(data);
    })
    .catch(err => {
        res.status(500).send({massage: "Error retrieving Testing with id " + id});
    });
}

module.exports = {
    findAll,
    find
}

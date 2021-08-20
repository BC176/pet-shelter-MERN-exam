const Pet = require('../models/pets.model');

const createPet = (req, res) => {
    const { body } = req;
    // console.log("BODY:", body);
    const { skill1, skill2, skill3 } = body;
    const skills = [skill1, skill2, skill3];
    Pet.create({
        name: body.name,
        type: body.type,
        description: body.description,
        skills,
    })
        .then((newPet) => {
            res.json({ newPet });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
};

const deletePet = (req, res) => {
    console.log(req.params.petID);
    Pet.deleteOne({ _id: req.params.petID })
        .then((deletedPet) => res.status(200).send("Pet Deleted"))
        .catch((err) => console.log(err));
};

const updatePet = (req, res) => {
    const { body } = req;
    const { skill1, skill2, skill3 } = body;
    const skills = [ skill1, skill2, skill3 ];
    body.skills = skills;
    Pet.findOneAndUpdate({ _id: req.params.petID }, body, {
        new: true,
        runValidators: true,
    })
        .then((pet) => res.json({ pet }))
        .catch((err) => console.log(err));
};

const getAllPets = (req, res) => {
    Pet.find()
        .then((allPets) => res.json({ allPets }))
        .catch((err) => console.log(err));
};

const getPetByID = (req, res) => {
    Pet.findOne({ _id: req.params.petID })
        .then((pet) => res.json({ pet }))
        .catch((err) => res.status(400).json({ err }));
};

module.exports = {
    createPet,
    deletePet,
    updatePet,
    getAllPets,
    getPetByID,
}
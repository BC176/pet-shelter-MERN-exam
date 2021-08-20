const PetController = require('../controllers/pets.controller');
module.exports = function (app) {
    app.get('/api/', PetController.getAllPets);
    app.post('/api/new', PetController.createPet);
    app.delete('/api/:petID', PetController.deletePet);
    app.put('/api/:petID', PetController.updatePet);
    app.get('/api/pet/:petID', PetController.getPetByID);
}


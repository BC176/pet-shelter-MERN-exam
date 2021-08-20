const mongoose = require('mongoose');
const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pets name is required"],
        minLength: [3, "Name must be at least 3 characters long"]
    },
    type: {
        type: String,
        required: [true, "Pet type is required"],
        minLength: [3, "Pet type must be at least 3 characters long"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [3, "Pet description must be at least 3 characters long"]
    },
    skills: {
        type: Array,
    },
    // skill2: {
    //     type: String,
    // },
    // skill3: {
    //     type: String,
    // }
}, { timestamps: true });

module.exports = mongoose.model('Pet', PetSchema);

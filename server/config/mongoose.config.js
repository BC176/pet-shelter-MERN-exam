const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/petdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(() => console.log("Established a connection to MongoDB"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));


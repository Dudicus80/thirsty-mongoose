const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/thirsty_mongoose', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.Promise = global.Promise;

mongoose.connection.on('open', function() {
    console.log(`Connected to Mongoose at host ${mongoose.connection.host} on port${mongoose.connection.port}`)
});
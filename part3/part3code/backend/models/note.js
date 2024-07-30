const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
console.log('connecting to ', url);

mongoose.set('strictQuery', false);
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message);
    });

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
});

noteSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id;
        delete returnedObj.__v;
    }
});

module.exports = mongoose.model('note', noteSchema);
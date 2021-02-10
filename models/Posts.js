const mongoose = require('mongoose');

const postModels = new mongoose.Schema({
    id: Number,
    title: String,
    body: String
})

module.exports = mongoose.model("Post", postModels)
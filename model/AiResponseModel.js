const mongoose = require('mongoose');

const AiResponseSchema = mongoose.Schema({
    Title: { type: String },
    Link: { type: String },
    Location: { type: String },
    Description: { type: String },
    Funds: { type: String },
    date_degree: { type: String },
    match_score: { type: String },
    aiRes: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
});


module.exports = mongoose.model('AIResponse', AiResponseSchema);
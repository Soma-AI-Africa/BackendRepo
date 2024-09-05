const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    googleId: { type: String },
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    middleName: { type: String },
    phoneNo: { type: String },
    nationality: { type: String },
    level_of_education: { type: String },
    university: { type: String },
    high_school: { type: String },
    course: { type: String },
    GPA: { type: String },
    graduation_date: { type: String },
    date_of_birth: { type: String },
    location: { type: String },
    degree: { type: String },
    funds_needed: { type: String },
    uploadedCV: { type: String },
    ResponseAi: [ {
        Title: { type: String },
        Link: { type: String },
        Location: { type: String },
        Description: { type: String },
        Funds: { type: String },
        date_degree: { type: String },
        match_score: { type: String }
    } ]
});

module.exports = mongoose.model('users', userModel);
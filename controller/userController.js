const userModel = require('../model/userModel');
const cloudinary = require('../utils/cloudinary');
const axios = require('axios');
const AiResponseSchema = require('../model/AiResponseModel');
const mongoose = require('mongoose');

exports.updateUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email: email });

        if (!user) return res.status('404').json({ message: 'user does not exist' });

        const update = await userModel.findByIdAndUpdate(user._id, req.body, { new: true });

        res.status(200).json({
            status: "Successful",
            message: "user data updated successful"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.uploadDocument = async (req, res, next) => {
    try {
        const id = req.params.userId;
        const user = await userModel.findById(id);

        // if (!user) return res.status(404).json({ message: "User does not exist" });
        if (!user) throw new AppError(404, "User does not exist");

        const files = req.file;
        if (!files) return res.status.json({ message: "File is required" });

        const imageURL = await cloudinary.uploads(files.path);

        const uploadFile = await userModel.findByIdAndUpdate(user._id, { uploadedCV: imageURL.url }, { new: true });

        res.status(200).json({
            status: "Successful",
            data: uploadFile
        });

    } catch (error) {
        return next(error);
    }
};

exports.getSingleUser = async (req, res, next) => {
    try {
        const id = req.params.userId;
        const user = await userModel.findById(id);

        if (!user) throw new AppError(404, "User does not exist");

        res.status(200).json({
            status: "Successful",
            data: user
        });

    } catch (error) {
        return next(error);
    }
};
exports.getAllUsers = async (req, res, next) => {
    try {
        const user = await userModel.find();
        if (user < 1) throw new AppError(404, "NO User Found");

        res.status(200).json({
            status: "Successful",
            data: user
        });

    } catch (error) {
        return next(error);
    }
};

exports.runAiModel = async (req, res, next) => {
    try {
        const id = req.params.userId;
        const user = await userModel.findById(id);
        if (!user) throw new AppError(404, "User does not exist");

        const response = await axios.post('https://soma-model.onrender.com/match-scholarships', user);

        const result = response.data;
        // console.log(result);
        // if (Array.isArray(result)) {
        //     for (let data of result) {
        //         const Airesponse = await AiResponseSchema(data);
        //         Airesponse.user = user._id;
        //         Airesponse.save();
        //         user.ResponseAi?.push(new mongoose.Types.ObjectId(Airesponse._id));
        //     };
        //     // user.save();
        // } else {
        //     console.error("Response data is not an array");
        // }

        // user.save();

        // const Airesponse = await AiResponseSchema({
        //     aiRes: response.data
        // });

        // Airesponse.user = user._id;
        // Airesponse.save();
        user.ResponseAi = result;
        user.save();

        res.status(200).json({
            message: "Data response as been added to the database",
            data: response.data
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};
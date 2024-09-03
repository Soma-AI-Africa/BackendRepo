const Airesponse = require('../model/AiResponseModel');

exports.getAIResponse = async (req, res, next) => {
    try {
        const getAiRes = await Airesponse.find();

        if (getAiRes < 1) return res.status(404).json({ message: "No data found" });

        res.status(200).json({
            status: "Successful",
            data: getAiRes
        });
    } catch (error) {
        return next(error);
    }
};
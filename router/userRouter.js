const express = require('express');

const { updateUser, uploadDocument, getAllUsers, getSingleUser, runAiModel } = require('../controller/userController');
const router = express.Router();
const upload = require('../utils/multer');

router.route('/update').patch(updateUser);
router.route('/').get(getAllUsers);
router.route('/:userId').get(getSingleUser);
router.route('/:userId').post(runAiModel);
router.route('/:userId/upload').patch(upload.single('uploadedCV'), uploadDocument);

module.exports = router;
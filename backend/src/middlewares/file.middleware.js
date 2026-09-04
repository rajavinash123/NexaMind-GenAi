const multer = require("multer")

const upload = multer({

    storage:multer.memoryStorage(),
    limit:{
        fileSize:5*1024*1024 //5 mb
    }
})

const uploadResume = (req, res, next) => {
    upload.any()(req, res, (error) => {
        if (error) {
            return next(error);
        }

        req.file = req.files[0];
        next();
    });
};

module.exports = {
    uploadResume
};
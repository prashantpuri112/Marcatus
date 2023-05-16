import multer from "multer";

// file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./files/data");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+ "_" + file.originalname);
    }
});

// filtering file
const filter = function (req, file, cb) {
    if (file.mimetype == 'file/csv' || file.mimetype == 'image/xlsx') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const uploadData = multer({
    storage: storage
});


export default uploadData
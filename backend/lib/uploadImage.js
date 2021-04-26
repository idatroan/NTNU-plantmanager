const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/public/images')
    },
    filename: (req, file, cb) => {
        cb(null, plant._id + '.png')
    }
})

const upload = multer({ storage: storage }).single('file');

module.exports = upload;
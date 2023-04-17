const multer = require('multer');

const upload = multer({dest: 'uploads/'});

const fileUploadMiddleware = upload.single('file')
module.exports = fileUploadMiddleware; 
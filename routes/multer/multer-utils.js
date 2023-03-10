const multer = require('multer');
const path = require('path');
// const storage = require('./multer-firebase');
const storage = require('./multer-s3');



const uploadTechPhoto = multer({ storage: storage,
    // limits: { fieldSize: 10 * 1024 * 1024 },
    // limits: {fileSize: 10},
    fileFilter: function(req, file, cb){
      checkFileType(file,cb)
    }
  }).single('image1');

  
  function checkFileType(file, cb){
    // allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype)
  
    if (mimetype && extname) {
      return cb(null, true)
    }else {
      // cb('Error: images only')
      return cb(null, true)
    }
  }

  const uploadJobPhotos = multer({ storage: storage,
    // limits: { fieldSize: 10 * 1024 * 1024 },
    // limits: {fileSize: 10},
    fileFilter: function(req, file, cb){
      checkFileType(file,cb)
    }
  }).array('images_ar', 10);

  
  function checkFileType(file, cb){
    // allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype)
  
    if (mimetype && extname) {
      return cb(null, true)
    }else {
      // cb('Error: images only')
      return cb(null, true)
    }
  }
  

module.exports = {
  uploadTechPhoto,
checkFileType,
uploadJobPhotos
}
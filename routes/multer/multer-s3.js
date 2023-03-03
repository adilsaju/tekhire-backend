// const { S3Client } = require('@aws-sdk/client-s3')
// const multerS3 = require('multer-s3')
// let aws = require('aws-sdk')
// let multer = require('multer')
// const config = require("../../config.json")


// aws.config.update({region: 'us-west-2',
// accessKeyId: config.aws.accessKey,
// secretAccessKey: config.aws.secretKey


// });
// // const s3 = new S3Client()
// s3 = new aws.S3();



// const storage = multerS3({
//       s3: s3,
//       bucket: 'tekk-main',
//       metadata: function (req, file, cb) {
//         cb(null, {fieldName: file.fieldname});
//       },
//       key: function (req, file, cb) {
//         cb(null, Date.now().toString())
//       }
//     })
  

// module.exports = storage

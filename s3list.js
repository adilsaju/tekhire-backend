// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
const config = require("./config.json")
// Set the region 
AWS.config.update({region: 'us-west-2',
accessKeyId: config.aws.accessKey,
secretAccessKey: config.aws.secretKey


});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Create the parameters for calling listObjects
var bucketParams = {
  Bucket : 'tekk-main',
};

// Call S3 to obtain a list of the objects in the bucket
s3.listObjects(bucketParams, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
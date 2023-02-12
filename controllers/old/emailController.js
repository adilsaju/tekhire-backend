const express = require('express');
const router = express.Router();
const Student = require('../models/technicianModel.js');
const Request = require('../models/requestModel.js');
const Admin = require('../models/employerModel.js');
const studentRequirements = require('../models/checklistModel.js');
const { request } = require('express');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const json2html = require('node-json2html');
// const { parse } = require('json2csv');
// var json2html = require('json2html')


const daftom = new Date();
daftom.setDate(daftom.getDate()+28);
let flgg;
const today = new Date();

async function main(recipient,reason, body) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'flightcoordinator.yoke@gmail.com',
        pass: 'wnamljtnjzuulvva'
        //actual pwd is: Oneringtorulethemall
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Yoke App ✈️" <mailer@yoke.com>', // sender address
      to: `${recipient}`, // list of receivers
      subject: `${reason}`, // Subject line
      text: `${body}`, // plain text body
      html: `${body}`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
// *********** Sent correct email data *************


  // ******** admin decline ********
  const sentEmail = () => {
    return async (req, res, next) => {
      // const requestInfo = await Request.requestModel.findById(
      //   req.params.id
      // );


      // let body1 = req.body.finalList
      // body1 = {}
      //TODO: get final list
// ===========
let body1 = await Request.requestModel
.find({
  isApproved: true,
  isRejected: false,
  isExpired: false,
  IsSentToCoordinator : false
})
.sort({ flightDate: 1 }).populate("requestedStudent").populate("approvedAdmin").select(["flightDate", "requestedDate", "requestedStudent", "approvedAdmin" ]);




let body2 = body1.filter((a) =>{
  return a.flightDate < daftom && a.flightDate > today
})


// ===========

kk = `
<table style="text-align: center; border: 1px solid black;">
  <tr>
    <th>Flight Date</th>
    <th>Requested Date</th>
    <th>Student Name</th>
    <th>Approved By</th>

  </tr>`
  if (body2.length > 0){ 
  body2.forEach((el)=>{
    flgg = true
kk+=`  <tr>
<td>${el.flightDate}</td>
<td>${el.requestedDate}</td>
<td>${el.requestedStudent.name}</td>
<td>${el.approvedAdmin && el.approvedAdmin.name}</td>
</tr>`

  })
  kk+=`
</table>
`
}else{
  flgg = false
}
// const fields = ['flightDate', 'isApproved', 'requestedDate'];
// const opts = { fields };

//   const csv = parse(body1, opts);
//   console.log(csv);


// let kk = json2html.render(body1, {plainHtml: true})
      // body1=JSON.stringify(body1)
      // body1 = json2html.transform(body1)

      const email = "flightcoordinator.yoke@gmail.com"
      if (flgg){
      try {
  
        main(email,"Final List",kk).catch(console.error);
        res.json("sent successfull");
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }else{
      res.json(flgg);
    }
      next();
    }; //end of middleware
  }; //end of declineRequest
  
  
  const sentEmailStudentApproved = () => {
    return async (req, res, next) => {
      let message = req.body.text
      let fldt = req.body.travelDate
      let studentmail = req.body.mailId
      body = `Hello, We have verified your documents and approved your requested flight on ${`${fldt}`}. You will receive a final confirmation email from the flight coordinator within 24 to 48 hours.`
      // let studentId = req.body.studentEmail

      // const studentEmail = Student.studentModel.findById(studentId).select(email);
      const studentEmail = studentmail
      try {
        // body=`<b>Hello world?</b>`
        main(studentEmail,message, body).catch(console.error);
        res.json("sent successfull");
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      next();
    }; //end of middleware
  }; //end of declineRequest


  const sentEmailStudentDeclined = () => {
    return async (req, res, next) => {
      let message = req.body.text
      let fldt = req.body.travelDate
      let ROD = req.body.declineReason
      let studentmail = req.body.mailId

      // const studenEmail = Student.studentModel.findById(studentId).select(email);
     
      body = `Hello, We declined your requested flight on ${fldt} due to the following reason: ${ROD}. Kindly fulfill all the requirements and make a new request. `
      const studentEmail = studentmail
      try {
        // body=`<b>Hello world?</b>`
        main(studentEmail,message, body).catch(console.error);
        res.json("sent successfull");
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      next();
    }; //end of middleware
  };  //end of declineRequest



  module.exports = {

    sentEmail,
    sentEmailStudentApproved,
    sentEmailStudentDeclined,

  };
  
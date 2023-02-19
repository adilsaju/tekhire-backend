const Job = require('../models/jobModel')
const technician = require('../models/technicianModel')
const offer = require('../models/offerModel')

require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')



const port = process.env.PORT || 5001
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true } )
const db = mongoose.connection 
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.error('connected to database'))




// console.log("rannnn data addd()")

//data creation
async function addData() {

    
    // const job1 = await Job.jobModel.create({name: "plumbing"})

    // const job1 = await tehncician.technicianModel.create({name: "Rolan", email:"a4@gmail.com", password: "12345678" })

    const job1 = await offer.offerModel.create({offerPrice: 300,jobID:'63ef008d43d9a5abeef994af', offerHours: 15, prefer_start_date:'2023-02-25T01:51:17.997+00:00'})

    await job1.save()
    
    console.log("data2 added");

    // const studentRequirements2 = await Checklist.studentRequirementsModel.create({flownHours: 123 , balance: 66, licenseType: "ppl", englishProficiency: true, medicalLicense: "abc", radioLicense: "abc", license: "xyz"})


    // const st1 = await Student.studentModel.findById("635cc5987f6ebdb5a0bc33f8");
    // const ad1 = await Student.studentModel.findById("635cc75e31911e7ed90568d1");
    
    // const admin1 = await Admin.employerModel.create({name: "Claire" , email: "claire74sss7@gmail.com", password: "12345678" })
    
    // const student1 = await Student.studentModel.create({name: "Mohit" , email: "adilsajus7ss47@gmail.com", password: "12345678", studentNumber: 35209583920, photo: "assffsafsafsa", program: "cpl", studentRequirements: studentRequirements1 })

    // const request1 = await Request.requestModel.create({requestedStudent: st1,approvedAdmin: ad1})
    
    // const student2 = await Student.studentModel.create({name: "Tarun" , email: "adilsaju6s46ss@gmail.com", password: "12345678", studentNumber: 35209583921, photo: "assffsafsafsa", program: "cpl", studentRequirements: studentRequirements2 })

    // const request2 =await Request.requestModel.create({requestedStudent: st1,approvedAdmin: ad1})
    
    // user.name = ""
    // await user.save()
    
    //const user  = new User({ name: "Kyle" , age: 26 })
    //await user.save()
    // await job1.save()
    console.log("data added");
}




addData()


exports.addData = addData

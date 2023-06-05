
// require("dotenv").config();
// const express = require("express");
// const app = express();
// const port = process.env.PORT || 80;
// const mongoose = require('mongoose');
// const bodyparser = require('body-parser');
// mongoose.connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     // we're connected!
//     console.log("!!connection is successfully")
// });


const express= require("express");

require('./db/config');

const cors= require("cors");
const User= require('./db/User');
const Contact= require('./db/Contact');
const CourseDetails=require('./db/CourseDetails');
const Enrolled=require('./db/Enrolled');
const TeachingDetails=require('./db/TeachingDetails')

const app= express();

app.use(express.json());
app.use(cors());

app.post("/register",async (req,res)=>{
  try{
    const check = await User.findOne({
        email: req.body.email});
    
    // if not null, check will return an object document of the match only    
    if(!check) 
    {
    let user= new User(req.body);
    let result= await user.save()
    res.send({response : "1"});
    }
    else
    {
        // means email already exist
        res.send({response : "2"});
    }
  }
  catch{
    res.send({response:"500"})
  }
});

app.post("/",async (req,res)=>{
    try {// if check is null then catch will handle
        const check = await User.findOne({
            email: req.body.requestBody.email
        })
        // const test=await User.deleteMany({ $expr: { $gt: [{ $strLenCP: "$name" }, 2] } })
        // console.log(test);
        if(!check)
        {
          // alert("Email not registered, SignUp first");
          res.send({response: "3"});
          return;
        }
        if (check.password === req.body.requestBody.password) {
            res.send({response: "1",name: check.name});//correct
        } else {
            // res.send("wrong password")
            // alert("Password is not correct!");
            res.send({response: "2"});
        }
    } catch {
        res.send({response:"500"})
    }

});

app.post('/contactdetails',async(req,res)=>{

  try{
    const auth= await Contact.findOne({
        email: req.body.email
    })
    // const deleteResult = await Contact.deleteMany({ gender: "Male" });// not part of code just want to delete all the entry beacuse there is no option to delete it directly by UI od atlas
    // console.log(deleteResult)
    if(!auth)
    {
        let newcontact=new Contact(req.body);
        let result= await newcontact.save();
        res.send({response:"1"})// details saved
    }
    else
    {
        res.send({response :"2"});//request already exist with this email
    }
  }
  catch
  {
    res.send({response:"500"});
  }
});

app.post('/coursedetails', async (req, res) => {
    try {
      const detail = await CourseDetails.findOne({ coursename: req.body.courseName });
  
      if (detail) {
        res.json(detail);
      } else {
        res.json({ error: "No details found for the given course name." });
      }
    } catch{
      // console.error('Error:', error);
      // res.status(500).json({ error: "Server error." });
      res.json({error:"500"})
    }
  });
  
  app.post('/enrolldetails', async(req,res)=>{

    console.log(req.body)
    try{
    const check=await Enrolled.findOne({email:req.body.requestBody.email});
    if(!check)
    {
        let detail= new Enrolled();
        detail.username = req.body.requestBody.username;
        detail.phone = req.body.requestBody.phone;
        detail.email = req.body.requestBody.email;
        detail.course = req.body.requestBody.course;
        detail.price = req.body.requestBody.price;
        let result= await detail.save();
        res.send({response : "1"});
    }
    else
    {
        res.send({response : "2"});
    }
}
catch{
  res.send({response:"500"})
}

  });

//working code to store base64 to mongodb here in server also but not accuratly worikg.
// const multer = require('multer');
// const upload = multer();
  
//   app.post('/teachingdetails', upload.single('resumeFile'), async (req, res) => {
//     console.log(req.body);
//     const check = await TeachingDetails.findOne({ email: req.body.email });
  
//     if (!check) {
//       const detail = new TeachingDetails();
//       detail.name = req.body.name;
//       detail.phone = req.body.phone;
//       detail.email = req.body.email;
//       detail.gender = req.body.gender;
//       detail.resumeFile = req.file.buffer.toString('base64');
//       detail.address = req.body.address;
//       detail.question = req.body.question;
  
//       await detail.save();
//       res.send({ response: "1" });
//     } else {
//       res.send({ response: "2" });
//     }
//   });


//  |
//  |
// \ /
// working code to upload file to server as pdf
// commenting this because of server restriction

// const multer = require('multer');

// const path = require('path');

// const fs = require('fs');

// // Define the storage configuration

// const storage = multer.diskStorage({
//   destination: './uploads',
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const fileExtension = path.extname(file.originalname);
//     cb(null, uniqueSuffix + fileExtension);
//   }
// });

// const upload = multer({ storage: storage });

//   app.post('/teachingdetails', upload.single('resumeFile'), async (req, res) => {
//     try{

//     // console.log(req.body); // Contains other form data
//     console.log(req.file); // Contains the uploaded file{
//     //     fieldname: 'resumeFile',
//     //     originalname: 'ADMIT CARD.pdf',
//     //     encoding: '7bit',
//     //     mimetype: 'application/pdf',
//     //     destination: './uploads',
//     //     filename: '1685888690855-345409022.pdf',
//     //     path: 'uploads\\1685888690855-345409022.pdf',
//     //     size: 245829
//     //   }req.file contains these details
  
//     const check = await TeachingDetails.findOne({ email: req.body.email });

//     if(check)
//     {
//     res.send({ response: "2" });
//     const filePath = req.file.path; // Replace with the actual file path

//     fs.unlink(filePath, (err) => {
//     if (err) {
//       console.error(err);
//       return;
//         }});
//     return;
//     }
//     // Save the form data and file path to the database
//     const { name, phone, email, gender, address, question } = req.body;
//     const resumeFilePath = req.file.path;
  
//     const detail = new TeachingDetails();
//     detail.name = name;
//     detail.phone = phone;
//     detail.email = email;
//     detail.gender = gender;
//     detail.resumeFile = resumeFilePath;
//     detail.address = address;
//     detail.question = question;
  
//     await detail.save();
  
//     res.send({ response: "1" });
//   }
//   catch{
//     res.send({response:"500"});
//   }
//   });
//Till here the code is  
  
  
// aulternative for this api

app.post('/teachingdetails',async (req,res)=>{

  try{
  const check = await TeachingDetails.findOne({ email: req.body.email });

  console.log(req.body)
    if(check)
    {
    res.send({ response: "2" });
    return;
    }
    else
    {
      const { name, phone, email, gender, address, question } = req.body;

      const detail= new TeachingDetails();
      detail.name = name;
      detail.phone = phone;
      detail.email = email;
      detail.gender = gender;
      detail.address = address;
      detail.question = question;

      let result=await detail.save();
      res.send({ response: "1" });
    }
  }
    catch(err){
          // console.log(err)
          res.send({response:"500"});
        }

})






























 // Analyse later first log it not logging second one is logging after file upload 
  

 
//  const multer = require('multer');
//  const path = require('path');
 
//  const storage = multer.diskStorage({
//    destination: './uploads',
//    filename: function (req, file, cb) {
//      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//      const fileExtension = path.extname(file.originalname);
//      cb(null, uniqueSuffix + fileExtension);
//    }
//  });
 
//  // Middleware to store a copy of the original request body
//  const storeOriginalRequestBody = (req, res, next) => {
//    req.originalBody = { ...req.body };
//    next();
//  };
 
//  app.post('/teachingdetails', storeOriginalRequestBody, async (req, res) => {
//    try {
//      console.log(req.originalBody); // Contains the original form data
 
//      const check = await TeachingDetails.findOne({ email: req.originalBody.email });
 
//      if (check) {
//        res.send({ response: "2" });
//        return;
//      }
 
//      const uploadMiddleware = multer({ storage: storage }).single('resumeFile');
//      uploadMiddleware(req, res, async (err) => {
//        if (err) {
//          // Handle any errors from the upload middleware
//          res.send({ response: "3" });
//          return;
//        }
 
//        // Access the original request body copy
//        console.log(req.originalBody);
 
//        // Save the form data and file path to the database
//        const { name, phone, email, gender, address, question } = req.originalBody;
//        const resumeFilePath = req.file ? req.file.path : null;
 
//        const detail = new TeachingDetails();
//        detail.name = name;
//        detail.phone = phone;
//        detail.email = email;
//        detail.gender = gender;
//        detail.resumeFile = resumeFilePath;
//        detail.address = address;
//        detail.question = question;
 
//        await detail.save();
 
//        res.send({ response: "1" });
//      });
//    } catch (err) {
//      console.log(err);
//      res.send({ response: "500" });
//    }
//  });
 

  













  
  
  //saving the file as base64 vin mongodb
  
// const fs = require('fs');

// async function saveAsPDF() {
    //   try {
        //     const document = await TeachingDetails.findOne({ email: 'MJI@BVV.com' });
        
        //     if (!document) {
            //       console.log('No document found with the specified email.');
            //       return;
            //     }
            
            //     // Convert the base64-encoded binary data back to a Buffer object
            //     const fileBuffer = Buffer.from(document.resumeFile, 'base64');
            
            //     // Specify the file path where you want to save the PDF
//     const filePath = './pdffile.pdf';

//     // Write the file buffer to the specified file path
//     fs.writeFileSync(filePath, fileBuffer, 'binary'); // Set encoding to 'binary'

//     console.log('PDF file saved:', filePath);
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// }

// saveAsPDF();

app.listen(5000);

// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 1000;

// const server = http.createServer((req, res) => {
    //   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
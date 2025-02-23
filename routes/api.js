const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const EventsForAll = require('../models/events')
const SpecialEvents = require('../models/specialevents')
const StudentS = require('../models/students'); // Import Student model
const Student = require('../models/student')
const jwt = require('jsonwebtoken')
const db = "mongodb+srv://Girish:8612@cluster0.3nug5.mongodb.net/Events?retryWrites=true&w=majority&appName=Cluster0";//* here i have to put database name after ".net/eventhub?retryWrites" and add password


const con = mongoose.connect(db, function(err){
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')      
    }
});


function verifyToken(req, res, next) 
{
  if(!req.headers.authorization) 
  {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') 
  {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) 
  {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

router.get('/events', async (req, res) => {
  
  try {
     
    const events = await EventsForAll.find(); // Fetch all events
    res.status(200).json(events);//*
    console.log("Got it") // Respond with JSON
  } catch (err) {
      res.status(500).send('Error retrieving events: ' + err.message);
  }
});


router.get('/special', verifyToken, async (req, res) => {
  try {
      const specials = await SpecialEvents.find(); // Fetch all specials
      res.status(200).json(specials); // Respond with JSON
  } catch (err) {
      res.status(500).send('Error retrieving specials: ' + err.message);
  }
});

router.post('/login', (req, res) => {
    let userData = req.body
    
    if ((userData.email == "Marvellous123") && (userData.password == "Marvellous123")) 
    {
      let payload = {subject: 1}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})   
    } 
    else 
    {
        res.status(401).send('Invalid Password')
    } 
})




///from server.js//////

//////////////////////////

router.post('/postData', async (req, res) => {
  try {
      const data = req.body;

      // Ensure _id is a number
      if (typeof data._id !== 'number') {
          return res.status(400).json({ message: '_id must be a number' });
      }

      const newStudent = new Student(data); // Create new Student document
      const result = await newStudent.save(); // Save to MongoDB

      console.log('Student admission added:', result);
      res.status(201).json({
          message: 'Student admitted successfully!',
          insertedId: result._id,
          insertedData: result
      });
  } catch (err) {
      console.error('Error inserting student data:', err);
      res.status(500).send('Internal Server Error');
  }
});

  //


  ///

  router.post('/postDataS', async (req, res) => {
    try {
      const data = req.body;
  
      // Ensure _id is a number
      if (typeof data._id !== 'number') {
        return res.status(400).json({ message: '_id must be a number' });
      }
  
      const newStudent = new StudentS(data); // Use Mongoose model
      const result = await newStudent.save(); // Save to DB
  
      console.log('Student admission added:', result);
      res.status(201).json({
        message: 'Student admitted successfully!',
        insertedId: result._id,
        insertedData: result
      });
    } catch (err) {
      console.error('Error inserting student data:', err);
      res.status(500).send('Internal Server Error');
    }
  });
  //

  router.get('/getDataS', async (req, res) => {
    try {
        const data = await StudentS.find(); // Fetch all student records
        console.log('Student admissions retrieved:', data);
        res.json(data);
    } catch (err) {
        console.error('Error retrieving student data:', err);
        res.status(500).send('Internal Server Error');
    }
});
  ///




//////*my edit///// connecting 

// async function addUser() {
//   try {
//       const newUser = new User({
          
//           email: "johndoe@example.com",
//           password: "hashedpassword123" // Make sure to hash passwords in real apps
//       });

//       const savedUser = await newUser.save();
//       console.log("User saved:", savedUser);
//   } catch (error) {
//       console.error("Error saving user:", error);
//   }
// }

// // Call the function
// addUser();

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');

const api = require('./routes/api');
const port = 3000;

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json()); 

app.use('/api', api);

// app.listen(port, function(){
//     console.log("Marvellous Innfosystems : Server running on localhost:" + port);
// });

const PORT = process.env.PORT || 3000;  // Use Render’s assigned port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



/////////////////////////////////////////
//////////////////Database/////////////////////

// const {MongoClient} = require("mongodb");
// const { MongoClient, ObjectId } = require('mongodb');
// const URL = "mongodb://localhost:27017"
// const client = new MongoClient(URL);


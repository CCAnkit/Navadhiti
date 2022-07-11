const express = require('express');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
require("dotenv").config();
const cors = require("cors");
const fs = require("fs")
var fileUpload = require('express-fileupload');
const { insertData, getData } = require("./controllers/formController.js");


// init express app
const app = express();

// parsing the data into JSON format.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));  

// Handel errors & configs
const { PORT, MONGODB_URI, NODE_ENV,ORIGIN } = require("./utils/config.js");
const { API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR } = require("./utils/errors.js");

// middlewares
app.use(express.json());
app.use( cors({ credentials: true, origin: ORIGIN, optionsSuccessStatus: 200 }) );

// log in development environment
if (NODE_ENV === "development") { 
    const morgan = require("morgan"); 
    app.use(morgan("dev")); 
}

// index route
app.get("/", (req, res) => {
  res.status(200).json({ type: "success", message: "Server is up and running", data: null });
});

// page not found error handling  middleware
app.use("*", (req, res, next) => {
  const error = { status: 404, message: API_ENDPOINT_NOT_FOUND_ERR };
  next(error);
});

// global error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  const message = err.message || SERVER_ERR;
  const data = err.data || null;
  res.status(status).json({ type: "error", message, data });
});


// File upload
app.use(fileUpload());

app.post("/insertData", insertData)

app.post("/getData", getData)


// Database Connection and Server listening
async function main() {
    try {
        await mongoose.connect(MONGODB_URI || "mongodb+srv://CCAnkit:CCAnkit09@clusternew.gds9x.mongodb.net/NavadhitiAssignment", {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
  
        console.log("MongoDb database is connected");

        app.listen(PORT || 3000, () => console.log(`Server listening on port` + (PORT || 3000) ));
    } 
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}
  
main();
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { addData } = require('./scripts/data-create');
const mainRoute = require('./routes/mainRoute');
const notificationRoute = require('./routes/notificationRoute');
const authRoute = require('./routes/authRoute');
const session = require('express-session');

const Student = require('./models/technicianModel');
const Admin = require('./models/employerModel');
const Job = require('./models/jobModel');

const errorHandler = require('./middlewares/errorMiddleware');
const jwt = require('jsonwebtoken');
const cors = require('cors');

//SOCKET FOR CHAT
const http = require('http');
const socketServer = require('./socket2/socket-server');
const server = http.createServer(app);
socketServer.init(server);
//

const port = process.env.PORT || 5001;

// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true } )
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.error('connected to database'));
const middleware = require('./middlewares/authMiddleware');

// Request.requestModel.collection.dropIndexes(function (err, results) {
//     // Handle errors
// });
// addData()
app.use(cors());
app.use(middleware.decodeToken);

//middleware
app.use(express.json());
// app.disable('view cache');
// Set up session middleware
app.use(
  session({
    secret: 'abcdefg',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//router
app.use('/api/v1/', mainRoute);
app.use('/api/v1/', notificationRoute);
app.use('/api/v1/', authRoute);

// app.use("/login", login)

//error handler middleware
app.use(errorHandler);
// app.use(bodyParser()) // support encoded bodies
// bodyParser.json([])
// app.use(errorHandler)
app.use((req, res, next) => {
  res.status(404);
  res.send({
    error: '404 Page: Not found',
  });
});

server.listen(port, () => {
  console.log('server started');
});

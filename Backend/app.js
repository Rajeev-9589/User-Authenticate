const express = require('express');
const adminLoginRoute = require('./route/adminlogin');
require('./db')
const userCreation = require('./route/UserCreation')
const userLogin = require('./route/Userlogin')
const getallusers =require('./route/FetchingUsers')
const approvinguser = require ('./route/Approvinguser')
const Userdtls = require('./route/FetchingUserdtl');
const addinguserdtl =require('./route/AddingDetails')
const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });


app.use('/admin', adminLoginRoute);
app.use('/user', userCreation);
app.use('/user', userLogin);
app.use('/fetched',getallusers);
app.use('/adding',addinguserdtl);

app.use(Userdtls);

app.use(approvinguser);



app.get('/hey', (req, res) => {
    res.json("Hey Buddy!!!");
});

app.listen(4400, () => {
    console.log("App is listening on port 4400");
});

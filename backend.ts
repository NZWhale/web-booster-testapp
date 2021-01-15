const nodemailer = require('nodemailer')
const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors');
const app = express()
const port = 3001
const user = "nodemailerwb@gmail.com"
const password = "RaFV95uk"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.post('/sendMail', function (req, res) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: user,
            pass: password
        }
    });

    let mailDetails = {
        from: user,
        to: req.body.email,
        subject: 'Purchase information',
        text: req.body.email + ' ' + req.body.name + ' ' + req.body.phone
    };



    transporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });
})

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
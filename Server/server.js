const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://playbay:orbital1232@playbaybackend.l2ib1.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then((result) => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));


app.use(express.urlencoded({ extended: true }));
const Newsletter = require('./newsletter');


app.get('/all-newsletters', (req, res) => {
    Newsletter.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

app.post('/add-newsletter', (req, res) => {
    const newsletter = new Newsletter(req.body);

    newsletter.save()
        .then((result) => {
            console.log("newsletter uploaded");
        })
        .catch((err) => {
            console.log(err);
        })
})

// app.get('/api/customers', (req, res) => {
//     const customers = [
//         {id: 1, firstName: 'hi'}
//     ];

//     res.json(customers);
// });

const PORT = 5000;

app.listen(PORT, () => console.log(`server start liao, port ${PORT}`));

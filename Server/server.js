const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const { createTokens, validateToken } = require('./Authentication/JWT.js');

const dbURI = 'mongodb+srv://playbay:orbital1232@playbaybackend.l2ib1.mongodb.net/PlayBay?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then((result) => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));
    
app.use(express.urlencoded({ extended: true, limit: '500mb' }));
app.use(express.json({limit: '500mb'}));
app.use(cookieParser());

const Newsletter = require('./Schemas/newsletter.js');

app.get('/all-newsletters', (req, res) => {
    Newsletter.find().sort({ createdAt: -1 })
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
        .then(() => {
            console.log("newsletter uploaded");
            res.redirect("/home");
        })
        .catch((err) => {
            console.log(err);
        })
})

const User = require('./Schemas/user.js');

app.post('/new-user', async (req, res) => {
    const presentUser = await User.findOne({username: req.body.username});
    if (!presentUser)
    {
        const user = new User(req.body);
        user.password = await bcrypt.hash(user.password, 10);
        user.save()
            .then(() => {
                console.log("New account created.");
                res.redirect("/signupsuccessful");
            })
            .catch((err) => {
                console.log(err);
            })
    }
    else
    {
        res.redirect("/signupdupuser");
    }
})

app.post('/user-login', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (user)
    {
        const correctpw = await bcrypt.compare(req.body.password, user.password);

        if (correctpw)
        {
            const accessToken = createTokens(user);
            res.cookie("accesstoken", accessToken, {
                maxAge: 60 * 60 * 1000 
            });

            res.redirect("/home");
        }
        else
        {
            res.redirect("/loginerror");

        }
    }
    else
    {
        
        res.redirect("/loginerror");
    }
})

app.get("/authentication", validateToken, (req, res) => {
    res.json([{"allowaccess": true}]);
});

app.get('/all-profile', (req, res) => {
    User.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

app.post('/change-dp', (req, res) => {
    User.updateOne({username: req.body.username}, {$set: {dp: req.body.dp}}, (err, res) => {
    });
    res.redirect("/profile/" + req.body.username);
})

app.post('/change-bios', (req, res) => {
    User.updateOne({username: req.body.username}, {$set: {bios: req.body.bios}}, (err, res) => {
    });
    res.redirect("/profile/" + req.body.username);
})


const PORT = 5000;

app.listen(PORT, () => console.log(`server start liao, port ${PORT}`));

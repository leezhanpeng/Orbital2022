const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const { createTokens, validateToken } = require('./Authentication/JWT.js');
require('dotenv').config();

const dbURI = process.env.DATABASE_URI;

mongoose.connect(dbURI)
    .then((result) => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true, limit: '500mb' }));
app.use(express.json({limit: '500mb'}));
app.use(cookieParser());

const Newsletter = require('./schemas/newsletter.js');

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

const User = require('./schemas/user.js');
const DisplayPic = require('./schemas/displaypic.js');

app.post('/new-user', async (req, res) => {
    const presentUser = await User.findOne({username: req.body.username});
    if (!presentUser)
    {
        const user = new User(req.body);
        const dp = new DisplayPic({
            username: req.body.username,
            dp: req.body.dp});
        dp.save();
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

app.get('/all-dp', (req, res) => {
    DisplayPic.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
})


app.post('/change-dp', (req, res) => {
    DisplayPic.updateOne({username: req.body.username}, {$set: {dp: req.body.dp}}, (err, res) => {
    });
    res.redirect("/profile/" + req.body.username);
})

app.post('/change-bios', (req, res) => {
    User.updateOne({username: req.body.username}, {$set: {bios: req.body.bios}}, (err, res) => {
    });
    res.redirect("/profile/" + req.body.username);
})

const FriendRequest = require('./schemas/friendreqs.js');

app.post('/add-friend', async (req, res) => {
    const userToAdd = await User.findOne({username: req.body.to});

    if (req.body.to === req.body.from)
    {
        res.redirect("/addedself")
    }
    else
    {
        if (userToAdd)
        {
            const userSelf = await User.findOne({username: req.body.from});
            const friendExist = await userSelf.friends.filter(x => x === req.body.to);
            if (friendExist.length == 0)
            {
                const friendReq = await FriendRequest.findOne({from: req.body.from, to:req.body.to});
                if (!friendReq)
                {
                    const actualRequest = new FriendRequest(req.body);
                    actualRequest.save()
                        .then(() => {
                            console.log("friend request sent");
                            res.redirect("/addedfriend");
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
                else
                {
                    res.redirect("/alreadyaddedfriend");
                }
            }
            else
            {
                res.redirect("/alreadyfriends");
            }
        }
        else
        {
            res.redirect("/addfrienderror");
        }
    }

})

app.get('/all-requests', (req, res) => {
    FriendRequest.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

app.post('/accept-friendreq', (req, res) => {
    FriendRequest.deleteOne({from: req.body.from, to:req.body.to}, (err, res) => {
    });
    User.updateOne({username: req.body.to}, {$push: {friends: req.body.from}}, (err, res) => {
    });
    User.updateOne({username: req.body.from}, {$push: {friends: req.body.to}}, (err, res) => {
    });
    res.redirect('/friendslist');
})

app.post('/reject-friendreq', (req, res) => {
    FriendRequest.deleteOne({from: req.body.from, to:req.body.to}, (err, res) => {
    });
    res.redirect('/friendslist');
})

app.post('/delete-friend', (req, res) => {
    User.updateOne({username: req.body.to}, {$pull: {friends: req.body.from}}, (err, res) => {
    });
    User.updateOne({username: req.body.from}, {$pull: {friends: req.body.to}}, (err, res) => {
    });
    res.redirect('/friendslist');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server start liao, port ${PORT}`));

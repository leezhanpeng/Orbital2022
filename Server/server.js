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
const TetrisRecord = require('./schemas/tetris.js');
const TypingRecord = require('./schemas/typing.js');
const SnakeRecord = require('./schemas/snake.js');

app.post('/new-user', async (req, res) => {
    const presentUser = await User.findOne({username: req.body.username});
    if (!presentUser)
    {
        const user = new User(req.body);
        const dp = new DisplayPic(req.body);
        const tetris = new TetrisRecord(req.body);
        const typing = new TypingRecord(req.body);
        const snake = new SnakeRecord(req.body);
        dp.save();
        tetris.save();
        typing.save();
        snake.save();
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

app.get('/tetris-records', (req, res) => {
    TetrisRecord.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
})
app.post('/update-tetris-records', async (req, res) => {
    const user = await TetrisRecord.findOne({username: req.body.username});
    if (req.body.finalclearedlines)
    {
        let timing = "";
        let succeed = true;
        if (req.body.finaltime != "FAILED")
        {
            timing = req.body.finaltime.split(' ')[1];
        }
        else
        {
            succeed = false;
        }
        const bestTiming = user.recordTime;
        let updateTime = false;
        if (succeed && bestTiming != "NIL")
        {
            if (parseInt(timing.slice(0, 2)) < parseInt(bestTiming.slice(0, 2)))
            {
                updateTime = true;
            }
            else if (parseInt(timing.slice(0, 2)) == parseInt(bestTiming.slice(0, 2)))
            {
                if (parseInt(timing.slice(3, 5)) < parseInt(bestTiming.slice(3, 5)))
                {
                    updateTime = true;
                }
                else if (parseInt(timing.slice(3, 5)) == parseInt(bestTiming.slice(3, 5)))
                {
                    if (parseInt(timing.slice(6, 8)) < parseInt(bestTiming.slice(6, 8)))
                    {
                        updateTime = true;
                    }
                }
            }
        }
        const setLines = parseInt(req.body.finalclearedlines) + user.totalLinesCleared;
        const setGameFinished = parseInt(req.body.clearedgame) + user.total40LinesFinished;
        const setTetrisesCleared = parseInt(req.body.fourlinescleared) + user.tetrisesCleared;
        if (updateTime || (bestTiming == "NIL" && succeed))
        {
            TetrisRecord.updateOne({username: req.body.username}, {$set: {totalLinesCleared: setLines, recordTime: timing, total40LinesFinished: setGameFinished, tetrisesCleared: setTetrisesCleared}}, (err, res) => {
            });
            res.status(200);
        }
        else
        {
            TetrisRecord.updateOne({username: req.body.username}, {$set: {totalLinesCleared: setLines, total40LinesFinished: setGameFinished, tetrisesCleared: setTetrisesCleared}}, (err, res) => {
            });
            res.status(200);
        }
    }
    else
    {
        const setWins = parseInt(req.body.wincount) + user.tetrisWins;
        TetrisRecord.updateOne({username: req.body.username}, {$set: {tetrisWins: setWins}}, (err, res) => {
        });
        res.status(200);
    }
});

app.get('/typing-records', (req, res) => {
    TypingRecord.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

app.post('/update-typing-records', async (req, res) => {
    const user = await TypingRecord.findOne({username: req.body.username});
    let update = false;
    if (user.recordWPM < req.body.wpm)
    {
        update = true;
    }
    if (update)
    {
        if (parseInt(req.body.pos) == 1)
        {
            TypingRecord.updateOne({username: req.body.username}, {$set: {recordWPM: Math.round(req.body.wpm * 100) / 100, wordsCleared: user.wordsCleared + parseInt(req.body.wordstyped), typingWins: user.typingWins + 1}}, (err, res) => {
            });
            res.status(200);
        }
        else
        {
            TypingRecord.updateOne({username: req.body.username}, {$set: {recordWPM: Math.round(req.body.wpm * 100) / 100, wordsCleared: user.wordsCleared + parseInt(req.body.wordstyped)}}, (err, res) => {
            });
            res.status(200);
        }
    }
    else
    {
        if (parseInt(req.body.pos) == 1)
        {
            TypingRecord.updateOne({username: req.body.username}, {$set: {wordsCleared: user.wordsCleared + parseInt(req.body.wordstyped), typingWins: user.typingWins + 1}}, (err, res) => {
            });
            res.status(200);    
        }
        else
        {
            TypingRecord.updateOne({username: req.body.username}, {$set: {wordsCleared: user.wordsCleared + parseInt(req.body.wordstyped),}}, (err, res) => {
            });
            res.status(200);
        }
    }
});

app.get('/snake-records', (req, res) => {
    SnakeRecord.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

app.post('/update-snake-records', async (req, res) => {
    const user = await SnakeRecord.findOne({username: req.body.username});
    if (req.body.totaljewels)
    {
        let timing = "";
        let succeed = true;
        if (req.body.finaltime != "FAILED")
        {
            timing = req.body.finaltime.split(' ')[1];
        }
        else
        {
            succeed = false;
        }
        const bestTiming = user.recordTime;
        let updateTime = false;
        if (succeed && bestTiming != "NIL")
        {
            if (parseInt(timing.slice(0, 2)) < parseInt(bestTiming.slice(0, 2)))
            {
                updateTime = true;
            }
            else if (parseInt(timing.slice(0, 2)) == parseInt(bestTiming.slice(0, 2)))
            {
                if (parseInt(timing.slice(3, 5)) < parseInt(bestTiming.slice(3, 5)))
                {
                    updateTime = true;
                }
                else if (parseInt(timing.slice(3, 5)) == parseInt(bestTiming.slice(3, 5)))
                {
                    if (parseInt(timing.slice(6, 8)) < parseInt(bestTiming.slice(6, 8)))
                    {
                        updateTime = true;
                    }
                }
            }
        }
        const setPower = parseInt(req.body.totalpower) + user.powerupsReceived;
        const setSabos = parseInt(req.body.totalsabo) + user.sabosGiven;
        const setJewels = parseInt(req.body.totaljewels) + user.jewelsCollected;
        let setRecordLengthCleared = user.recordLength
        if (req.body.longestlength > user.recordLength)
        {
            setRecordLengthCleared = parseInt(req.body.longestlength);
        }
        if (updateTime || (bestTiming == "NIL" && succeed))
        {
            SnakeRecord.updateOne({username: req.body.username}, {$set: {recordTime: timing, recordLength: setRecordLengthCleared, jewelsCollected: setJewels, sabosGiven: setSabos, powerupsReceived: setPower}}, (err, res) => {
            });
            res.status(200);
        }
        else
        {
            SnakeRecord.updateOne({username: req.body.username}, {$set: {recordLength: setRecordLengthCleared, jewelsCollected: setJewels, sabosGiven: setSabos, powerupsReceived: setPower}}, (err, res) => {
            });
            res.status(200);
        }
    }
    else
    {
        const setWins = parseInt(req.body.wincount) + user.snakeWins;
        SnakeRecord.updateOne({username: req.body.username}, {$set: {snakeWins: setWins}}, (err, res) => {
        });
        res.status(200);
    }

});


const FriendRequest = require('./schemas/friendreqs.js');
const { update } = require('./schemas/newsletter.js');

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
                const returnReq = await FriendRequest.findOne({from: req.body.to, to:req.body.from});
                if (returnReq)
                {
                    res.redirect("/returnfriendrequest");
                }
                else if (!friendReq)
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

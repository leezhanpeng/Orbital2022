import React, { useState, useEffect } from 'react';
import styles from "../Styles/friendslist.module.css";
import profile from "../Assets/profilelogo.png";
import bin from "../Assets/trashbin.png";

import { useCookies } from 'react-cookie';

const FriendsList = () => {

    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    
    const [cookies] = useCookies();

    const username = () => {
    return parseJwt(cookies.accesstoken).username;
    }

    const [friends, setFriends] = useState([]);
    const [noFriends, setNoFriends] = useState([]);
    const [loading, setLoading] = useState(["loading"]);

    useEffect(() => {
        const fetchData = async () => {
        const result = await fetch('/all-profile');
        const jsonResult = await result.json();
        const profile = jsonResult.filter(x => x.username === username())
        if (profile.length > 0)
        {
            const friends = profile[0].friends
            if (friends.length > 0)
            {
                setFriends(friends);
            }
            else
            {
                setNoFriends([false]);
            }
            setLoading([])
        }
        }
        fetchData();
    });

    const [requests, setRequests] = useState([]);
    const [noReq, setNoReq] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
        const result = await fetch('/all-requests');
        const jsonResult = await result.json();
        const requests = jsonResult.filter(x => x.to === username())
        setRequests(requests);
        if (requests.length === 0)
        {
            setNoReq(["none"]);
        }
        }
        fetchData();

    });


    return (
        <div>
            <div className={styles["pagecontent"]}>
                
                <div className={styles["titles"]}>
                    <a href={"/friendslist"} className={styles["listtitle"]}>
                    Friends List
                    </a>
                    <a href={"/addfriend"} className={styles["addtitle"]}>
                    Add friend
                    </a>
                </div>

                <div className={styles["friendlistbox"]}>
                    <div className={styles["friendlistlabels"]}>
                        <label className={styles["friendlistlabel"]}>Username</label>
                        <label className={styles["friendlistlabel"]}>Player State</label>
                        <label className={styles["friendlistlabel"]}>Profile</label>
                        <label className={styles["friendlistlabel"]}>Delete</label>
                    </div>
                    {
                        loading.map((load, index) => (
                            <div key={index} className={styles["nofriendtext"]}>
                                Loading... Please wait.
                            </div>
                        ))
                    }
                    {
                        noFriends.map((nofriend, index) => (
                            <div key={index} className={styles["nofriendtext"]}>
                                You do not have any friends in PlayBay. Why not add one?
                            </div>
                        ))
                    }
                    {
                        friends.map((friend, index) => (
                            <div key={index} className={styles["friend"]}>
                                <label className={styles["friendusername"]}>{friend}</label>
                                <label className={styles["location"]}>INPROGRESS</label>
                                <div className={styles["profileiconholder"]}>
                                    <a href={"/profile/" + friend}><img className={styles["profileicon"]} src={profile}></img></a>
                                </div>
                                <form className={styles["form"]} action={'/delete-friend'} method={"POST"}>
                                    <div className={styles["invisinput"]}>
                                        <input id="from" name="from" type={"text"} value={username()} readOnly></input>
                                    </div>
                                    <div className={styles["invisinput"]}>
                                        <input id="to" name="to" type={"text"} value={friend} readOnly></input>
                                    </div>
                                    <div className={styles["biniconholder"]}>
                                        <button className={styles["button"]}><img className={styles["binicon"]} src={bin}></img></button>
                                    </div>
                                </form>
                            </div>
                        ))
                    }

                </div>

                <div className={styles["friendrequests"]}>
                    <label className={styles["friendreqtitle"]}>Friend Requests</label>
                    {
                        noReq.map((none, index) => (
                            <div key={index} className={styles["norequest"]}>
                                {"[No requests as of yet]"}
                            </div>
                        ))
                    }
                    {
                        requests.map((request, index) => (
                            <div key={index} className={styles["friendreq"]}>
                                <a href={"/profile/" + request.from} className={styles["friendprofile"]}>{request.from}</a>
                                <div className={styles["buttons"]}>
                                    <form className={styles["form"]} action={'/accept-friendreq'} method={"POST"}>
                                        <div className={styles["invisinput"]}>
                                            <input id="from" name="from" type={"text"} value={request.from} readOnly></input>
                                        </div>
                                        <div className={styles["invisinput"]}>
                                            <input id="to" name="to" type={"text"} value={request.to} readOnly></input>
                                        </div>
                                        <button className={styles["btn"]}>Accept</button>
                                    </form>
                                    <form className={styles["form"]} action={'/reject-friendreq'} method={"POST"}>
                                        <div className={styles["invisinput"]}>
                                            <input id="from" name="from" type={"text"} value={request.from} readOnly></input>
                                        </div>
                                        <div className={styles["invisinput"]}>
                                            <input id="to" name="to" type={"text"} value={request.to} readOnly></input>
                                        </div>
                                        <button className={styles["btn"]}>Reject</button>
                                    </form>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
    }

export default FriendsList
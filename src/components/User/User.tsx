import React, { useEffect, useState } from "react"
import "./User.css"
import axios from "axios"
import { data } from "../Sidebar/Data"


export const User = () => {

    const [user, setUser] = useState("")
    const [isloaded, setLoaded] = useState(false)

    useEffect(() => {
        const res = axios.get(`${process.env.REACT_URI}/user/0`).then((res) => {
            setUser(res.data.username)
            setLoaded(true)
        }).catch((err) => console.error(err))
    })
    
    return <div className="user-page">
        <div className="user-profile">
            <div className="user-profile-info">
                <div className="picture"/>
                <div className="user-profile-text">
                    <span>
                        {user}
                    </span>
                    <span style={{marginTop: "0.7vh"}}>
                        {user}
                    </span>
                    <span style={{marginTop: "0.7vh"}}>
                        test.123@gmail.com
                    </span>
                </div>
            </div>
        </div>
        <div className="user-permissions-logs">
            <div className="user-logs">
                <span>
                    Logs
                </span>
                <div className="logs">
                    <span className="log-txt">
                        Log 1
                    </span>
                    <span className="log-txt">
                        Log 2
                    </span>
                </div>
            </div>
            <div className="user-permissions">
                <div className="user-perms">
                    <div className="perms-head">
                        <span>
                            Permissions
                        </span>
                        <button>
                            Ajouter une permissions
                        </button>
                    </div>
                    <div className="perm-content">
                        <span className="log-txt">
                            Perm 1
                        </span>
                        <span className="log-txt">
                            Perm 2
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default User
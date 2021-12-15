import axios from "axios"
import React, { useEffect, useState } from "react"

import "./Users.css"


export const Users = () => {
    const [users, setUsers] = useState([""])
    const [isloaded, setLoaded] = useState(false)

    useEffect(() => {
        if (!isloaded) {
            const res = axios.get(`process.env.REACT_URI/user/0`).then((rep) => {
                setUsers(rep.data.username)
                setLoaded(true)
            }).catch((err) => console.error(err))            
        }

    })
    return (
        <div className="users">
            {users.map((elm) => 
                <div className="user-prev">
                    <div className="pp"/>
                        <span style={{fontSize: "2em"}}> 
                            {elm}
                        </span> 
                    </div>
            )}
            
        </div>
    )
}

export default Users
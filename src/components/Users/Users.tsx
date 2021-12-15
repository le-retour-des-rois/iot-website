import axios from "axios"
import React, { useEffect, useState } from "react"

import "./Users.css"


export const Users = () => {
    const [users, setUsers] = useState<any[]>([])
    const [isloaded, setLoaded] = useState(false)

    useEffect(() => {
        if (!isloaded) {
            const res = axios.get(`http://localhost:8400/user`).then((rep) => {
                const tmp: any[] = []
                rep.data.map((elm: any) => { tmp.push({ name: elm.username, id: elm.id, org: elm.org_id }) })
                console.log(tmp)
                setUsers(tmp)
                setLoaded(true)
            }).catch((err) => console.error(err))
        }

    })
    return (
        <div className="users">
            {users != undefined ? users.map((elm) =>
                <button className="user-prev">
                    <div className="pp" />
                    <span style={{ fontSize: "2em" }}>
                        {elm.name}
                    </span>
                </button>
            ) : <></>}
        </div>
    )
}

export default Users
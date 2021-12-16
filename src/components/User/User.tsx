import React, { useEffect, useState } from "react"
import "./User.css"
import axios from "axios"
import { data } from "../Sidebar/Data"
import { Button, Menu, MenuItem } from "@mui/material"


export const User = () => {
    const [userDoors, setUserDoors] = useState<string[]>([])

    const uri = (window.location.href).split('/')
    const user = uri[uri.length - 1].replace("%20", " ")

    return <div className="user-page">
        <div className="user-profile">
            <div className="user-profile-info">
                <div className="picture" />
                <div className="user-profile-text">
                    <span>
                        {user}
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
                        <Form userDoors={userDoors} setUserDoors={setUserDoors} user={user} />
                    </div>
                    <div className="perm-content">
                        {userDoors.map((d) =>
                            <span className="log-txt">
                                {d}
                            </span>)}
                    </div>
                </div>
            </div>
        </div>
    </div>
}

interface Form {
    userDoors: string[]
    setUserDoors: any
    user: string
}

export const Form = ({ userDoors, setUserDoors, user }: Form) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    return (<div >
        <Button style={{ color: "#292C35", fontSize: "0.7em" }} onClick={(e: any) => handleClick(e)}>
            Ajouter une permissions
        </Button>
        {<FormContent anchorEl={anchorEl} setAnchorEl={setAnchorEl} userDoors={userDoors} setUserDoors={setUserDoors} user={user} />}
    </div>)
}

interface FormProps {
    anchorEl: any
    setAnchorEl: any
    userDoors: string[]
    setUserDoors: any
    user: string
}

export const FormContent = ({ anchorEl, setAnchorEl, userDoors, setUserDoors, user }: FormProps) => {
    const open = Boolean(anchorEl);
    //get user id
    const [isloaded, setLoaded] = useState(false)
    const [id, setId] = useState(0)
    const [doors, setDoors] = useState<string[]>([])
    const getDoors = () => {
        axios.get('http://192.168.0.10:8400/door/Le%20Retour%20Des%20Rois').then((res) => {
            var tmp: string[] = []
            res.data.map((elm: any) => {
                tmp.push(elm.name)
            })
            setDoors(tmp)
        }).catch((err) => console.error(err))

    }

    useEffect(() => {
        if (!isloaded) {
            getDoors()
            axios.get(`http://192.168.0.10:8400/user/name/Le%20Retour%20Des%20Rois/${user}`).then((res) => {
                console.log(res.data.id)
                setId(res.data.id)
            }).catch((err) => console.error(err))
            if (id !== 0) {
                axios.get(`http://192.168.0.10:8400/admin/user/${id}`).then((res) => {

                    setUserDoors(res.data)
                    console.log(res.data)
                    setLoaded(true)
                })
            }
        }

    })

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<div>
        <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            {doors.map((elm) => <MenuItem onClick={(e) => {
                if (doors.find((e) => elm == e) != undefined) {
                    const tmp = userDoors
                    tmp.push(elm)
                    axios.post('http://192.168.0.10:8400/admin/assign', { user_id: id, section_ids: [], door_names: tmp }).then((res) => {
                        setLoaded(false)
                    })
                }
                else {
                    const newList = userDoors.filter((item) => item !== elm);
                    axios.post('http://192.168.0.10:8400/admin/assign', { user_id: id, section_ids: [], door_names: newList }).then((res) => {
                        setLoaded(false)
                    })
                }
            }}>{elm}</MenuItem>)}
        </Menu>
    </div>)
}

export default User
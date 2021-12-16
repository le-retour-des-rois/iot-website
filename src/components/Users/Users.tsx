import { Button, TextField } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "./Users.css"
import { Link } from "react-router-dom";


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
        <div className="users-back">
            <div className="users">
                {users != undefined ? users.map((elm) =>
                <Link className="user-prev" to={`/user/${elm.name}`}>
                    <div className="pp" />
                    <span style={{ fontSize: "2em" }}>
                        {elm.name}
                    </span>  
                </Link>
            ) : <></>}
            </div>
            <Form setLoaded={setLoaded}/> 
        </div>

    )
}

interface Form {
    setLoaded: any
}

export const Form = ({setLoaded}: Form) => {
    const [isHide, setHide] = useState(false)
    console.log(isHide)

    return (<div style={{marginBottom: "10vh"}}>
        <Button onClick={() => setHide(!isHide)} style={{backgroundColor: "#DCAE52", marginTop: "10vh", minWidth: "30vw", minHeight: "7vh", borderRadius: "10px", color: "#292C35", fontSize: "1.5em"}}>
            Ajouter un utilisateur
        </Button>
        {isHide ? <FormContent setHide={setHide} setLoaded={setLoaded}/> : <></>}
    </div>)
}

interface FormProps {
    setHide: any
    setLoaded: any
}

export const FormContent = ({setHide, setLoaded}: FormProps) => {
    const [mac, setMac] = useState("")
    const [name, setName] = useState("")
    const [rank, setRank] = useState("Type")
    const [password, setPassword] = useState("")
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const createUser = () => {
        axios.post('http://localhost:8400/user', { username: name, type: rank.toLowerCase(), organization_name: "Le Retour Des Rois", mac_addr: mac, password: password }).then((rep) => {console.log(rep)}).catch((err) => {console.log(err)})
    }
    return (<div className="form-door">
        <h1 style={{color: "#DCAE52"}}>
            Ajouter une porte
        </h1>
        <TextField variant="outlined" label="Nom d'utilisateur" style={{minWidth: "80%", marginTop: "3vh" }} sx={{ input: { color: 'white' }}} onChange={(e) => {setName(e.target.value)}}/>
        <TextField variant="outlined" label="Mot de passe" style={{minWidth: "80%", marginTop: "3vh"}} sx={{ input: { color: 'white'} }} onChange={(e) => {setPassword(e.target.value)}}/>
        <TextField variant="outlined" label="Mac adresse" style={{minWidth: "80%" , marginTop: "3vh"}} sx={{ input: { color: 'white' }}} onChange={(e) => {setMac(e.target.value)}}/>
        <Button style={{minWidth: "80%", backgroundColor: "#292C35", fontSize: "1.5em", color: "#DCAE52", marginTop: "3vh", border: "solide"}} onClick={(e: any) => {
            handleClick(e)
        }}>
            {rank}
        </Button>
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
        <MenuItem onClick={() => {setRank("Admin") 
        handleClose()}}>Admin</MenuItem>
        <MenuItem onClick={() => {setRank("Regular") 
        handleClose()}}>Regular</MenuItem>
        </Menu>
        <Button style={{minWidth: "80%", backgroundColor: "#DCAE52", fontSize: "1.5em", color: "#292C35", marginTop: "3vh"}} onClick={() => {
            createUser()
            setHide(false)
            setLoaded(false)
        }}>
            Ajouter
        </Button>
    </div>)
}

export default Users
import React, { useEffect, useState } from "react"

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SensorDoorIcon from '@mui/icons-material/SensorDoor';
import "./Org.css"
import { Link } from "react-router-dom"
import axios from "axios";
import { Button, TextField } from "@mui/material"

interface DoorProps {
    name: string
    hash: string
    section: string
    deleteDoor: any
}

export const Org = () => {
    const [theDoors, setDoors] = useState<{ hash: string, name: string, organization_name: string, section_name: string }[]>([])
    const [isloaded, setLoaded] = useState(false)
    const uri = (window.location.href).split('/')
    const section = uri[uri.length - 1].replace("%20", " ")
    useEffect(() => {
        if (!isloaded) {
            const res = axios.get(`http://192.168.0.10:8400/door/Le%20Retour%20Des%20Rois/${section}/`).then((rep) => {
                console.log(rep)
                setDoors(rep.data)
                setLoaded(true)
            }).catch((err) => console.error(err))
        }

    })

    const deleteDoor = (name: string) => {
        const res = axios.delete(`http://192.168.0.10:8400/door/Le%20Retour%20Des%20Rois/${section}/${name}`).then((rep) => {
            console.log("Door deleted")
            setLoaded(false)
        }).catch((err) => console.error(err))
    }
    console.log(section)
    return (<div className="organisation">
        <OrgName name={section} />
        <div className="doorsContainer">
            <div className="doors">
                {theDoors.map((elm, idx) => idx % 2 == 0 ? <Door deleteDoor={deleteDoor} name={elm.name} hash={elm.hash} section={section} /> : <></>)}
            </div>
            <div className="doors">
                {theDoors.map((elm, idx) => idx % 2 == 1 ? <Door deleteDoor={deleteDoor} name={elm.name} hash={elm.hash} section={section} /> : <></>)}
            </div>
        </div>
        <Form />
    </div>)
}

export const Form = () => {
    const [isHide, setHide] = useState(false)
    console.log(isHide)

    return (<div>
        <Button onClick={() => setHide(!isHide)} style={{ backgroundColor: "#DCAE52", marginTop: "10vh", minWidth: "30vw", minHeight: "7vh", borderRadius: "10px", color: "#292C35", fontSize: "1.5em" }}>
            Ajouter une porte
        </Button>
        {isHide ? <FormContent setHide={setHide} /> : <></>}
    </div>)
}

interface FormProps {
    setHide: any
}

export const FormContent = ({ setHide }: FormProps) => {
    const [hash, setHash] = useState("")
    const [name, setName] = useState("")
    const uri = (window.location.href).split('/')
    const section = uri[uri.length - 1].replace("%20", " ")
    const createPorte = () => {
        axios.post('http://192.168.0.10:8400/door', { name: name, hash: hash, organization_name: "Le Retour Des Rois", section_name: section }).then((rep) => { console.log(rep) }).catch((err) => { console.log(err) })
    }
    return (<div className="form-door">
        <h1 style={{ color: "#DCAE52" }}>
            Ajouter une porte
        </h1>
        <TextField variant="outlined" label="Nom de la porte" style={{ minWidth: "80%", marginTop: "2vh" }} sx={{ input: { color: 'white' } }} onChange={(e) => { setName(e.target.value) }} />
        <TextField variant="outlined" label="Hash de la porte" style={{ minWidth: "80%", marginTop: "2vh" }} sx={{ input: { color: 'white' } }} onChange={(e) => { setHash(e.target.value) }} />
        <Button style={{ minWidth: "80%", maxWidth: "80%", backgroundColor: "#DCAE52", fontSize: "1.5em", color: "#292C35", marginTop: "5vh" }} onClick={() => {
            createPorte()
            setHide(false)
        }}>
            Ajouter
        </Button>
    </div>)
}

interface OrgNameProps {
    name: string
}

export const OrgName = ({ name }: OrgNameProps) => {
    return <div className="orgName">
        <span className="name">
            {name}
        </span>
    </div>
}

export const Door = ({ name, deleteDoor }: DoorProps) => {

    return <div className="door">
        <div className="name-cont">
            <SensorDoorIcon style={{ marginRight: "1vw", color: "#292C35", fontSize: "2.5em" }} />
            <span style={{ fontSize: "2em", color: "#292C35" }}>
                {name}
            </span>
        </div>

        <div>
            <Link to={`/door/${name}`}>
                <EditIcon style={{ marginRight: "1vw", color: "#292C35", fontSize: "2em" }} />
            </Link>
            <button style={{ border: "none", backgroundColor: "#DCAE52" }} onClick={() => deleteDoor(name)}>
                <DeleteIcon style={{ color: "#292C35", fontSize: "2.5em" }} />
            </button>


        </div>
    </div>
}

export default Org
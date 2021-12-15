import React from "react"

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SensorDoorIcon from '@mui/icons-material/SensorDoor';
import "./Org.css"
import {Link} from "react-router-dom"

interface DoorProps {
    name: string
    hash: string
}

interface OrgProps {
    name: string
    doors: DoorProps[]
}

export const Org = ({name, doors}: OrgProps) => {
    const uri = (window.location.href).split('/')
    const section = uri[uri.length - 1]
    console.log(section)
    return (<div className="organisation">
        <OrgName name={section}/>
        <div className="doorsContainer">
            <div className="doors">
                {doors.map((elm, idx) => idx % 2 == 0 ? <Door name={elm.name} hash={elm.hash}/> : <></>)}
            </div>
            <div className="doors">
                {doors.map((elm, idx) => idx % 2 == 1 ?<Door name={elm.name} hash={elm.hash}/>: <></>)}
            </div>            
        </div>

        
    </div>)
}

interface OrgNameProps {
    name: string
}

export const OrgName = ({name}: OrgNameProps) => {
    return <div className="orgName">
        <span className="name">
            {name}
        </span>
    </div>
}

export const Door = ({name, hash}: DoorProps) => {
    return <div className="door">
            <div className="name-cont">
                <SensorDoorIcon style={{marginRight: "1vw", color: "#292C35", fontSize: "2.5em"}}/>
                <span style={{fontSize: "2em", color: "#292C35"}}>
                    {name}
                </span> 
            </div>
            
            <div>
                <Link to={`door/${name}`}>
                    <EditIcon style={{marginRight: "1vw", color: "#292C35", fontSize: "2em"}}/>
                </Link>
                
                <DeleteIcon style={{color: "#292C35", fontSize: "2em"}}/>
            </div>
        </div>
}

export default Org
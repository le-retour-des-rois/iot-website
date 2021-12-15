import React, {useState} from "react"
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import "./Sidebar.css"
import {data} from "./Data"
import { Link } from 'react-router-dom';

export const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false)
    const [color, setColor] = useState("Overview")
    return <>
         <MenuIcon style={{fontSize: 50}} onClick={() => setSidebar(!sidebar)}/>
        <div className={sidebar ? "side-container active" : "side-container"}>
            <div className="side-head">
                <PersonIcon style={{fontSize: 40, color:  "#292C35"}}/>
                <span style={{fontSize: 30, color:  "#292C35"}}>
                    Admin
                </span>
            </div>
            <h1 className="orga-text" style={{color: "white"}}>
                Organisation
            </h1>
            {data.map((elm) => <Link className={color == elm.name ? "nav-links-chosen" : "nav-links"} to={elm.path} onClick={() => setColor(elm.name)}>
                {elm.name}
            </Link>
            )}
            <span style={{fontSize: "1.5em", color: "red", marginTop: "5vh"}}>
                Logout
            </span>
        </div>
    </>
}

export default Sidebar
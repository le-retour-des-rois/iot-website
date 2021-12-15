import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import "./Topbar.css"
import Sidebar from "../Sidebar/Sidebar"
import logo from "../../assets/logo.png"

export const TopBar = () => {
    return <div className="topbar">
        <div className="topbarContainer">
            <div style={{minWidth: "10vw"}}></div>
            <img src={logo} className="logo"/>
            <div className="adminMenu">
                <PersonIcon style={{fontSize: 50}}/>
                <span style={{fontSize: 25}}>
                    Admin
                </span>
                <Sidebar/>
            </div>
        </div>

    </div>
}

export default TopBar
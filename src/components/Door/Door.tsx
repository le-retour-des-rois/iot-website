import React from "react"
import "./Door.css"
export const Door = () => {
    const uri = (window.location.href).split('/')
    const door = uri[uri.length - 1].replace("%20", " ")
    console.log(door)
    return (<div className="door-page">
        <div className="door-prev" >
            <h1 className="title-door">
                {door}
            </h1>
        </div>
    </div>)
}

export default Door
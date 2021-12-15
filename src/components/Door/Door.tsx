import React from "react"

export const Door = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const door = queryParams.get('door')

    return <div className="door-page">
        <div >

        </div>
    </div>
}

export default Door
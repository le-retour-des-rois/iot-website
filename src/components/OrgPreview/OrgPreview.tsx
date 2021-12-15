import React from "react"
import "./OrgPreview.css"
import {Link} from "react-router-dom"

interface PreviewProps {
    name: string,
    link: string
}

export const Preview = ({name, link}: PreviewProps) => {
    return <Link className="preview" to={link}>
        <span>
            {name}
        </span>
    </Link>
}

export default Preview
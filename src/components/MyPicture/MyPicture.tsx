/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"

type MyPictureProps = {
    caption: string,
    children: React.Node
}

const MyPicture = ({caption, children}: MyPictureProps) => {
    console.log('caption :' + caption);
    return (
    <div className="picture">
        Hi
        <div className="test">
            { caption }
        </div>
    </div>

)};

export default MyPicture;
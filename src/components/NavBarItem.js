import React from "react";
function NavBarItem({ render, ...props }) {

    if (render) {
        return (

            <li className="nav-item">
                <a className="nav-link" href={props.link} onClick={props.logout}>{props.label}</a>
            </li>
        )
    } else {
        return <></>;
    }

}
export default NavBarItem
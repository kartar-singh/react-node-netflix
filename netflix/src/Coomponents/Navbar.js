import React from "react";
import { Link } from "react-router-dom";
import Navbar from "reactjs-navbar";

const navbar = () =>{
    return (
<>
<h1>fnjdf</h1>
        <div>
            <li>
                <Link to="/">list</Link>
            </li>
            <Link to="/logout">logout</Link>
        </div>
         </>
    )
}

export default Navbar
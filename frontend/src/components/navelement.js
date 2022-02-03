import React from "react"
import "bootstrap/dist/css/bootstrap.css";
import {NavLink} from "react-router-dom";

export default function Navbar(){
    return(
        <div>
           <nav className="navbar navar-expand-lg navbar-light bg-light">
               <NavLink className="navbar-brand" to="/">
                   <img style={{"width":25+'%'}} src="http://" alt ="Mongo sleek"></img>
               </NavLink>
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item ">
          <NavLink className="navlink" to ="/create"></NavLink>
          </li>
    </ul>
</div>    
 </nav>  
 </div>  
    );
}
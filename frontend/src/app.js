import React from "react";
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/navelement.js"
import Records from "./components/records.js";
import Likes from "./components/like.js";
import Followers from "./components/follow.js";
import CreateUser from "./components/create.js";
import Unfollow from "./components/unfollow.js"


const App = ()=>{
    return(
        <div className ="Backend">
            <Navbar />
            <Routes>
                <Route exact path = "/navelement" element ={<Navbar/>} />
                <Route exact path ="/create/" element={<CreateUser />} />
                <Route exact path ="/records"element={<Records />} />
                <Route exact path ="/follow/:id"element={<Followers/>} />
                <Route exact path ="/unfollow/:id "element={<Unfollow />} />
                <Route exact path ="/like/:id"element={<Likes />} />
            </Routes>
        </div>
    );
    };
 export default App;

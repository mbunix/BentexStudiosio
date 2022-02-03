/* eslint-disable no-undef */
import React,{useState} from "react";
import {useNavigate} from "react-router";

export default function     Create(){
    const[form , setForm ]= useState({
        Username:"",
        password :"",
        account_type:""
    });
    const navigate = useNavigate();

    //fom updation
    function updateForm(value){
        return setForm((prev)=>{
            return{...prev,...value};
        });
    }

    //form submisions
    async function onSubmit(e){
        e.preventDefaults();
        //post to create a new user
        const newUser ={...form};
        await fetch("http://localhost:5000/record/users/add",{
            method:"POST",
            headers:{
                "Content-Type":"application.json",
            },
            body:JSON.stringify(newUser),
        })
        .catch(error=>{
            window.alert(error);
            return;
        })
        ;setForm({Username:"", password:"", account_type:""});
        navigate("/")
    }
    return(
        <div>
            <h3>Please Create Your account</h3>
            <form onSubmit={onSubmit} >
                <div className="form-group">
                    <label htmlFor="Username">Username</label>
                    <input
                    type="text"
                    className="form-control"
                    id="Username"
                    value={form.Username}
                    onChange={(e)=> updateForm({Username:e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                    type="text"
                    className="form-control"
                    id="Username"
                    value={form.password}
                    onChange={(e)=> updateForm({Password:e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                        className="form-check-input"
                        type="radio"
                        name="account_type"
                        id ="public"
                        value ="public"
                        checked ={form.account_type === 'public'}
                        onChange={(e)=>updateForm({account_type:e.target.value})}
                        />
                        <label htmlFor ="public" className="form-check-label">public</label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                        className="form-check-input"
                        type="radio"
                        name="account_type"
                        id ="private"
                        value ="private"
                        checked ={form.account_type === "private"}
                        onChange={(e)=>updateForm({account_type:e.target.value})}
                        />
                        <label htmlFor ="private" className="form-check-label">private</label>
                    </div>
                </div>
                <div className="form-group">
                    <input 
                    type ="submit"
                    value="create User"
                    className="btn btn-primary"
                    />
                </div>
         </form>
        </div>
    );
}


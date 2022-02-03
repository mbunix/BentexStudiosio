/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React ,{useState ,useEffect} from "react";
import {useParams, useNavigate} from "react-router";

export default function Like(){
    const [button ,setButton]= useState({
        username:"",
        account_type:"",
        like:"",
        record:[]
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchdata(){
            const id = params.id.toString();
            const response =await fetch(`http://localhost:5000/record/likes${params.id.toString()}`);
            if (!record){
                window.alert(`record with id ${id} not found `);
                navigate("/")
                return;
            }
            setButton (record)
        }
        fetchdata();
        return;
    },[params.id, navigate]);
    //
    
    async function onSubmit(e){
        e.preventDefault();
        const editedUser ={
            liked :button.like
        };

        //post update to the followe
        await fetch(`http://localhost:5000/update/Users/likes${params.id}`,{ 
            method:"POST",
            body:JSON.stringify(editedUser),
            headers:{
                'Content-Type':'application.json'
            },
        });
        navigate("/")
    }
    return(
        <div> like
            <button onSubmit={onSubmit}>
                <div className ="button-group">
                    <input
                    type="submit"
                    value="update Record"
                    className="btn btn-primary"
                    />
                </div>
            </button>
        </div>
    
    );
}
/* eslint-disable no-undef */
import React ,{useState ,useEffect} from "react";
import {useParams, useNavigate} from "react-router";

export default function Follow(){
    const [Button ]= useState({
        username:"",
        account_type:"",
        follow:"",
        record:[]
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchdata(){
            const id = params.id.toString();
            const response =await fetch(`http://localhost:5000/record/follow/${params.id.toString()}`);
            if (!response.ok){
                const message =`an error occured : $ {response.statusText}`;
                window.alert(message);
                
                return;
            }
            const record =await response.json();
            if (!record){
                window.alert(`Record with ${id} not found`);
                navigate("/")
            }
            
            setButton (record)
        }
        fetchdata();
        return;
    },[params.id, navigate]);
    
    async function onSubmit(e){
        e.preventDefault();
        const editedUser ={
            followed :Button.newfollow
        };

        //post update to the follow
        await fetch(`http://localhost:5000/update/follow/${params.id}`,{ 
            method:"POST",
            body:JSON.stringify(editedUser),
            headers:{
                'Content-Type':'application.json'
            },
        });
        navigate("/")
    }
    return(
        <div> follow 
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
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import React,{useState,useEffect} from "react";
import {useParams, useNavigate} from "react-router";

export default function Unfollow(){
    // eslint-disable-next-line no-unused-vars
    const [form ,setForm]= useState({
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
            const response =await fetch(`http://localhost:5000/record/follower${params.id.toString()}`);
            if (!record){
                window.alert(`record with id ${id} not found `);
                navigate("/")
                return;
            }
            const records =await response.json();
            setRecords(records);
        }
        fetchdata();
        return;
        
    },[params.id, navigate]);
    
    async function deleteRecord(id){
        await fetch(`http://localhost:5000/record/follower${id}`,{
            method:"DELETE"
        });
        const newRecord =records.filter((el)=>el._id!==id);
        setRecords(newRecord)
    }
    return(
        <div> Unfollow 
            <button onSubmit={onSubmit}>
                <div className ="button-group">
                <Record
                record={record}
                deleteRecord={()=>deleteRecord(record._id)}
                key={record._id}
                />
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

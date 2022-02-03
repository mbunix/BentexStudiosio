import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom"

const Record =(props)=>(
    <tr>
        <td>{props.record.username}</td>
        <td>{props.record.password}</td>
        <td>{props.record.account_type}</td>
        <td>
            <Link className="btn btn-link" to ={`/follow/${props.record._id}`}>Follow</Link>
            <button className="btn btn-link"
            onClick={()=>{
                props.deleteRecord(props.record._id);
            }}
            >Delete</button>
            </td>
    </tr>
)
export default function RecordLists(){
    const [records, setRecords] = useState([]);

    useEffect(()=>{
        async function getRecords(){
            const response= await fetch ( `http://localhost:5000/record/`);
            if (!response.ok){
                const message =`An error :${response.statusText}`;
                window.alert(message);
                return;
            }
            const records=await response.json();
            setRecords(records);
        }
        getRecords();
        return;
    },[records.length]);
    async function deleteRecord(id){
        await fetch(`https://localhost:5000/${id}`,{
            method:"DELETE"
        });
        const newRecord =records.filter((el)=> el._id!== id);
        setRecords(newRecord);
    }

    function recordLists(){
        return records.map((record)=>{
            return(
                <Record
                record={record}
                deleteRecord={()=>deleteRecord(record._id)}
                key ={record._id}
                />
            );
        });
    }
    return(
        <div><h3>User lists</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
            <tr>
                <th>Username</th>
                <th>account_type</th>
            </tr>
        </thead>
        <tbody>{recordLists()}</tbody>
        </table>
        </div>
    );
}




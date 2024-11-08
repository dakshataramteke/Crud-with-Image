

import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Student = () => {
    const [students, setStudents] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:8080/home")
            .then((res) => {
                console.log("API Response:", res.data);
                if (Array.isArray(res.data)) {
                    setStudents(res.data);
                } else {
                    console.error("API response is not an array:", res.data);
                }
            })
            .catch(err => {
                console.error("Error fetching data:", err.response ? err.response.data : err.message);
            });
    }, []);
  

    
  const notify = () => {
    toast.error(" Delete Successfully")
  }
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/student/${id}`)
                .then(() => console.log("Deleted successfully"))
                .catch((err) => console.error("Delete error:", err));
            
            setStudents(students.filter(student => student.Id !== id));
            notify();
        } catch (err) {
            console.error("Error in deletion:", err);
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='container m-5' style={{ border: "2px solid black", boxShadow: "2px 2px 4px gray" }}>
                <Link to={"/create"} className='btn btn-primary my-4'>ADD+</Link>
                <table className='table'>
                    <thead>
                        <tr style={{backgroundColor: '#FFC0CB'}}>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.slice().reverse().map((student) => (
                            <tr key={student.Id}>
                                <td>{student.Name}</td>
                                <td>{student.Email}</td>
                                <td>
                                    <img src={`http://localhost:8080/uploads/${student.Image}`} alt={student.Name} style={{ width: '120px', height: '80px', 
                                    objectFit: 'cover' , border:"1px solid black"}} />
                                </td>
                                <td className='d-flex'>
                                    <Link to={`update/${student.Id}`} className='btn btn-sm btn-success mx-2'>Update</Link>
                                    <button className='btn btn-sm btn-danger' onClick={() => handleDelete(student.Id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Student;



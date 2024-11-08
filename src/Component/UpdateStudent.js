
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateStudent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { id } = useParams();
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState(null); // State to hold error message
    const navigate = useNavigate();

   
const submit = (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('image', file);
  formData.append('name', name);
  formData.append('email', email);

  const notify = () => {
    toast.success("Student Data Update Successfully")
  }
  axios.put(`http://localhost:8080/home/update/${id}`, formData)
      .then(res => {
          if (res.data.Status === "Success") {
            notify(); // alert k jagah par notify
              navigate("/home");
          } else {
              console.log("Failed to update student");
          }
      })
      .catch(err => {
          setError("Error updating student data.");
          console.log("Error updating student:", err);
      });
};

const handleFile = (e) => {
  const selectedFile = e.target.files[0];
  setFile(selectedFile);
  
  if (selectedFile) {
      setImagePreview(URL.createObjectURL(selectedFile));
  } else {
      setImagePreview(null);
  }
};

    return (
        <div className='container mt-5 p-5' style={{ border: "2px solid black" }}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={submit}>
                <h2 className='text-center'>Update Student</h2>
                <div className="form-group">
                    <label htmlFor="Name">Name</label>
                    <input
                        type="text"
                        value={name}
                        name='Name'
                        onChange={e => setName(e.target.value)}
                        className="form-control"
                        id="Name"
                        placeholder="Enter Name"
                        autoComplete="name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Email">Email</label>
                    <input
                        type="email"
                        value={email}
                        name='Email'
                        onChange={e => setEmail(e.target.value)}
                        className="form-control"
                        id="Email"
                        placeholder="Enter Email"
                        autoComplete="email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFile}
                        className="form-control"
                        id="image"
                        accept="image/*"
                    />
                </div>
                {imagePreview && (
                    <div className="mt-3">
                        <p>Image Preview:</p>
                        <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '80px', objectFit: 'cover' }} />
                    </div>
                )}
                <button type="submit" className="btn btn-primary mt-3">Update</button>
            </form>
        </div>
    );
};

export default UpdateStudent;



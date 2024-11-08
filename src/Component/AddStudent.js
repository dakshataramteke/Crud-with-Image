import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        // Create a preview URL for the selected image
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    // Toast notification function
    const notify = () => {
      toast.success("Student Data Successfull")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:8080/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.status === 200 || response.status === 201) {  // Assuming 201 Created is the expected success status
                notify();
                navigate('/home');  // Redirect back to the student list or desired page
            } else {
                console.error('Unexpected response:', response);
            }
        } catch (error) {
            if (error.response) {
                console.error('Error adding student:', error.response.data);
                alert(`Error: ${error.response.data}`);
            } else {
                console.error('Error adding student:', error.message);
                alert('An error occurred while adding the student. Please try again.');
            }
        }
    };

    return (
        <div className="container p-3 m-5 mx-auto" style={{border: "2px solid black"}}>
            <h2 className='text-center'>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="file" className="form-control" onChange={handleImageChange} accept="image/*" required />
                </div>
                {imagePreview && (
                    <div className="mt-3">
                        <p>Image Preview:</p>
                        <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', border:"1px solid black" }} />
                    </div>
                )}
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
            
        </div>
    );
};

export default AddStudent;

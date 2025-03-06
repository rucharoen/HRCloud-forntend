import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CreateProduct.css'; // ใช้ CSS เดียวกันกับ CreateProduct.js

const UpdateProduct = () => {
    const [employeeID, setEmployeeID] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [message, setMessage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/product/${id}`);
                setEmployeeID(res.data.employeeID);   
                setFullName(res.data.fullName);       
                setPhone(res.data.phone);             
                setBirthDate(res.data.birthDate);     
            } catch (error) {
                setMessage("เกิดข้อผิดพลาดในการดึงข้อมูล");
            }
        };
        if (id) {
            fetchUser();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/update-product/${id}`, { employeeID, fullName, phone, birthDate });
            navigate("/");
        } catch (error) {
            setMessage("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
        }
    };

    return (
        <div className='create-container'>
            <h1 className='title'>🔄 อัปเดตข้อมูลพนักงาน</h1>
            {message && <p className='error-message'>{message}</p>}

            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>รหัสพนักงาน</label>
                        <input
                            type="text"
                            className="form-control"
                            value={employeeID}
                            onChange={(e) => setEmployeeID(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>ชื่อ-นามสกุล</label>
                        <input
                            type="text"
                            className="form-control"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>เบอร์โทรศัพท์</label>
                        <input
                            type="tel"
                            className="form-control"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            pattern="^\d{10}$"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>วันเกิด</label>
                        <input
                            type="date"
                            className="form-control"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="btn-group">
                        <button type="submit" className="btn-submit">✅ อัปเดตข้อมูล</button>
                        <button type="button" className="btn-cancel" onClick={() => navigate('/')}>❌ ยกเลิก</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateProduct.css';

function CreateProduct() {
    const [employeeID, setEmployeeID] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/create-product", { employeeID, fullName, phone, birthDate });
            navigate('/');
        } catch (error) {
            setMessage("เกิดข้อผิดพลาด กรุณาลองอีกครั้ง");
        }
    };

    return (
        <div className='create-container'>
            <h1 className='title'>➕ เพิ่มพนักงานใหม่</h1>
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
                        <button type="submit" className="btn-submit">✅ ตกลง</button>
                        <button type="button" className="btn-cancel" onClick={() => navigate('/')}>❌ ยกเลิก</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateProduct;

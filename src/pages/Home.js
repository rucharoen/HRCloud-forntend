import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css'; // นำเข้าไฟล์ CSS ที่สร้างใหม่

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await axios.get('http://localhost:5000/');
            setData(res.data);
        } catch (error) {
            console.log("Fail", error);
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm("คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้?")) {
            try {
                await axios.delete(`http://localhost:5000/delete-product/${id}`);
                fetchProduct();
            } catch (error) {
                console.log("Error deleting product: " + error);
            }
        }
    }

    return (
        <div className='home-container'>
            <h1 className='title'>📋 ข้อมูลบุคลากร</h1>

            <div className='table-container'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>รหัสพนักงาน</th>
                            <th>ชื่อ-นามสกุล</th>
                            <th>เบอร์โทรศัพท์</th>
                            <th>วันเกิด</th>
                            <th>แก้ไขข้อมูล</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.employeeID}</td>
                                <td>{item.fullName}</td>
                                <td>{item.phone}</td>
                                <td>{item.birthDate}</td>
                                <td>
                                    <div className="btn-group">
                                        <Link to={`edit-product/${item.id}`} className='btn-edit'>✏️ แก้ไข</Link>
                                        <button className="btn-delete" onClick={() => deleteUser(item.id)}>🗑️ ลบ</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link to="/create-product" className='btn-create'>➕ เพิ่มพนักงาน</Link>
        </div>
    );
}

export default Home;

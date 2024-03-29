import './home.css';
import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Spinner, Card, Button, Alert } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import { Cart3, BoxArrowRight } from 'react-bootstrap-icons';
import axios from 'axios';
import { IoLogOutOutline } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
const categories = ['books', 'electronics', 'vehicles'];
const Home = () => {
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [expalert, setAlert] = useState(false);
    const [name, setName] = useState(localStorage.getItem('name'));
    const navigate = useNavigate();
    const handleClick = () => {
         navigate('/all')
    }
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }
    const addexpense = async (e) => {
        e.preventDefault();
        try {
            var obj = {
                price: price,
                desc: desc,
                category: category
            };

            const token = localStorage.getItem("token");

            let res = await axios.post("process.env.REACT_APP_API_KEY/expense", obj, { headers: { Authorization: token } });
            if (res.status === 201) {
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 2000);
            }


        } catch (error) {
            console.error("Error posting data:", error);
        }
    }

    return (
        <div className='homediv'>
            <div className='navbody'>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Spinner animation="grow" size="sm" variant="light" />
                    <Spinner animation="grow" variant="light" />
                    <Container>
                        <Nav className="me-auto navlinks">
                            <NavLink to="/home" className='curr'>Home</NavLink>
                            <NavLink to="/about" className='curr'>About Us</NavLink>
                            <NavLink to="/contact" className='curr'>Contact Us</NavLink>
                            <span id='spanid'>Signed in as : {name}</span>
                            <Nav.Link className='allbtn' onClick={handleClick}>
                                <CiViewList size={30} />
                            </Nav.Link>
                            <Nav.Link className='logoutbtn' onClick={handleLogout}>
                                <IoLogOutOutline /> Logout
                            </Nav.Link>

                        </Nav>
                    </Container>
                </Navbar>
                {expalert && (
                    <Alert key='primary' className='alertclass' variant='primary'>
                        Expense Added
                    </Alert>
                )}
                <form id="formId">
                    <label htmlFor="expense">Choose expense amount</label>
                    <input type="number" id="expense" placeholder="amount" required value={price} onChange={(e) => setPrice(e.target.value)} />

                    <label htmlFor="description">Choose description</label>
                    <input type="text" id="description" required placeholder="write something" value={desc} onChange={(e) => setDesc(e.target.value)} />

                    <label htmlFor="ca">Choose a category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                    </select>

                    <button id="addExpense" onClick={addexpense}>Add Expense</button>
                </form>
            </div>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Contact Us</h3>
                        <p>Email: info@example.com</p>
                        <p>Phone: +1 123-456-7890</p>
                    </div>
                    <div className="footer-section">
                        <h3>Address</h3>
                        <p>123 Main Street</p>
                        <p>City, Country</p>
                    </div>
                    <div className="footer-section">
                        <h3>Follow Us</h3>
                        <p>Facebook | Twitter | Instagram</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Your Company Name. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;

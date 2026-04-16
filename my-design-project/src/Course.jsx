import React, { useState, useEffect } from 'react';
import './App.css';

const Register = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', phoneNumber: '' });
    const [status, setStatus] = useState({ loading: false, success: false, message: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, message: 'მიმდინარეობს გაგზავნა...' });

        try {
            const response = await fetch('https://mentor-2-8mbm.onrender.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ loading: false, success: true, message: 'წარმატებით გაიგზავნა!' });
                setFormData({ firstName: '', lastName: '', phoneNumber: '' });
            } else {
                setStatus({ loading: false, success: false, message: data.error || 'შეცდომა' });
            }
        } catch (err) {
            setStatus({ loading: false, success: false, message: 'სერვერი გამორთულია!' });
        }
    };

    useEffect(() => {
        if (window.lucide) window.lucide.createIcons();
    }, [formData, status]);

    return (
        <div className="register-page">
            <div className="form-container">
                <div className="form-card">
                    <div className="form-header">
                        <div className="register-logo">
                            <span className="la-text">LA</span>
                            <span className="sub-text">LAWCRAFT ACADEMY</span>
                        </div>
                        <h1 className="form-title">რეგისტრაცია</h1>
                        <p className="form-subtitle">შეიყვანეთ თქვენი მონაცემები</p>
                    </div>

                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="input-group">
                            <label>სახელი</label>
                            <div className="input-wrapper">
                                <i data-lucide="user" className="input-icon"></i>
                                <input 
                                    name="firstName" 
                                    value={formData.firstName} 
                                    onChange={handleInputChange} 
                                    placeholder="სახელი"
                                    required 
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>გვარი</label>
                            <div className="input-wrapper">
                                <i data-lucide="users" className="input-icon"></i>
                                <input 
                                    name="lastName" 
                                    value={formData.lastName} 
                                    onChange={handleInputChange} 
                                    placeholder="გვარი"
                                    required 
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>ტელეფონის ნომერი</label>
                            <div className="input-wrapper">
                                <i data-lucide="phone" className="input-icon"></i>
                                <input 
                                    name="phoneNumber" 
                                    value={formData.phoneNumber} 
                                    onChange={handleInputChange} 
                                    placeholder="555 XX XX XX"
                                    required 
                                />
                            </div>
                        </div>

                        <button type="submit" className="submit-btn" disabled={status.loading}>
                            {status.loading ? 'იგზავნება...' : 'რეგისტრაცია'}
                        </button>
                    </form>

                    {status.message && (
                        <div className={`status-message ${status.success ? 'success' : 'error'}`}>
                            {status.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;
import React, { useState } from 'react';
import { User, Users, Mail, Phone, PartyPopper, AlertCircle } from 'lucide-react';
import ReCAPTCHA from "react-google-recaptcha";
import '../css/App.css';

const Register = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '' });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ loading: false, message: '' });
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);

    const validate = (name, value) => {
        if (name === "firstName" || name === "lastName") {
            return /^[a-zA-Zა-ჰ\s]+$/.test(value) ? "" : "გამოიყენეთ მხოლოდ ასოები";
        }
        if (name === "email") {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "არასწორი მეილი";
        }
        if (name === "phoneNumber") {
            return /^[0-9]{9}$/.test(value) ? "" : "უნდა იყოს 9 ნიშნა";
        }
        return "";
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "phoneNumber" && value.length > 9) return;
        setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleExit = () => {
        if (document.referrer && document.referrer !== window.location.href) {
            window.location.href = document.referrer;
        } else {
            window.history.back();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!captchaToken) {
            setStatus({ loading: false, message: 'გთხოვთ გაიაროთ კაპჩა' });
            return;
        }

        setStatus({ loading: true, message: '' });

        try {
            const response = await fetch('https://mentor-2-8mbm.onrender.com/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    captchaToken: captchaToken
                })
            });

            const data = await response.json();

            if (response.ok) {
                setShowSuccessModal(true);
                setFormData({ firstName: '', lastName: '', email: '', phoneNumber: '' });
                setCaptchaToken(null);
                setStatus({ loading: false, message: '' });
            } else {
                setStatus({ loading: false, message: data.error || 'რეგისტრაცია ვერ მოხერხდა' });
                setShowErrorModal(true);
            }
        } catch (err) {
            setStatus({ loading: false, message: 'სერვერი არ რეაგირებს' });
            setShowErrorModal(true);
        }
    };

    return (
        <div className="register-page" id="register">
            <div className="form-container">
                <div className="form-card">
                    <div className="register-logo">
                        <span className="la-text">LA</span>
                        <span className="sub-text">LAWCRAFT ACADEMY</span>
                    </div>
                    <h1 className="form-title">რეგისტრაცია</h1>
                    
                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="input-group">
                            <label>სახელი</label>
                            <div className={`input-wrapper ${errors.firstName ? 'input-error' : ''}`}>
                                <User className="input-icon" size={20} />
                                <input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="სახელი" required />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>გვარი</label>
                            <div className={`input-wrapper ${errors.lastName ? 'input-error' : ''}`}>
                                <Users className="input-icon" size={20} />
                                <input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="გვარი" required />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>ელ-ფოსტა</label>
                            <div className={`input-wrapper ${errors.email ? 'input-error' : ''}`}>
                                <Mail className="input-icon" size={20} />
                                <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="example@mail.com" required />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>ტელეფონი</label>
                            <div className={`input-wrapper ${errors.phoneNumber ? 'input-error' : ''}`}>
                                <Phone className="input-icon" size={20} />
                                <input name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleInputChange} placeholder="5XXXXXXXX" required />
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                            <ReCAPTCHA
                                sitekey="6LdCP8EsAAAAAPhpSXIhxtMgwXQmTIQf-yp1sImu"
                                onChange={(token) => setCaptchaToken(token)}
                            />
                        </div>

                        <button type="submit" className="submit-btn" disabled={status.loading || !captchaToken}>
                            {status.loading ? 'იგზავნება...' : 'რეგისტრაცია'}
                        </button>
                    </form>
                    {status.message && <p className="error-text" style={{color: '#dc3545', textAlign: 'center', marginTop: '10px'}}>{status.message}</p>}
                </div>
            </div>

            {showSuccessModal && (
                <div className="success-modal-overlay">
                    <div className="success-modal">
                        <PartyPopper size={50} color="#c5a059" />
                        <h2>გილოცავთ!</h2>
                        <p>მონაცემები წარმატებით გაიგზავნა.</p>
                        <div className="modal-actions">
                            <button className="stay-btn" onClick={() => setShowSuccessModal(false)}>დარჩენა</button>
                            <button className="exit-btn" onClick={handleExit}>გასვლა</button>
                        </div>
                    </div>
                </div>
            )}

            {showErrorModal && (
                <div className="error-modal-overlay">
                    <div className="error-modal">
                        <AlertCircle size={40} color="#dc3545" />
                        <h2>შეცდომა!</h2>
                        <p>{status.message}</p>
                        <button onClick={() => setShowErrorModal(false)}>გასაგებია</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
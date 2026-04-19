import React, { useState, useEffect } from 'react';
import '../css/App.css';

const Register = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', phoneNumber: '' });
    const [status, setStatus] = useState({ loading: false, success: false, message: '' });
    const [isVerified, setIsVerified] = useState(false);
    const [showChallenge, setShowChallenge] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [currentLevel, setCurrentLevel] = useState(0);
    const [shuffledImages, setShuffledImages] = useState([]);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [loadedImages, setLoadedImages] = useState({});

    const challenges = [
        {
            title: 'ველოსიპედი',
            images: [
                { id: 1, type: 'გზა', url: 'https://thumbs.dreamstime.com/b/leningrad-region-russia-april-highway-potholes-poor-quality-pavement-primary-stage-its-destruction-road-car-143374340.jpg' },
                { id: 2, type: 'მანქანა', url: 'https://loremflickr.com/400/400/car?lock=2' },
                { id: 3, type: 'ველოსიპედი', url: 'https://loremflickr.com/400/400/bicycle?lock=3' },
                { id: 4, type: 'ავტობუსი', url: 'https://loremflickr.com/400/400/bus?lock=4' },
                { id: 5, type: 'ველოსიპედი', url: 'https://loremflickr.com/400/400/bicycle?lock=5' },
                { id: 6, type: 'მოტოციკლი', url: 'https://loremflickr.com/400/400/motorcycle?lock=6' }
            ]
        },
        {
            title: 'შუქნიშანი',
            images: [
                { id: 7, type: 'გზა', url: 'https://loremflickr.com/400/400/trafficlight?lock=7' },
                { id: 8, type: 'გზა', url: 'https://loremflickr.com/400/400/road?lock=8' },
                { id: 9, type: 'შუქნიშანი', url: 'https://loremflickr.com/400/400/trafficlight?lock=9' },
                { id: 10, type: 'შენობა', url: 'https://loremflickr.com/400/400/building?lock=10' },
                { id: 11, type: 'შუქნიშანი', url: 'https://loremflickr.com/400/400/trafficlight?lock=11' },
                { id: 12, type: 'ქუჩა', url: 'https://loremflickr.com/400/400/street?lock=12' }
            ]
        }
    ];

    useEffect(() => {
        if (showChallenge) {
            setShuffledImages([...challenges[currentLevel].images].sort(() => Math.random() - 0.5));
            setSelectedImages([]);
            setLoadedImages({});
        }
    }, [showChallenge, currentLevel]);

    const handleImageLoad = (id) => {
        setLoadedImages(prev => ({ ...prev, [id]: true }));
    };

    const toggleImage = (id) => {
        setSelectedImages(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const verifyCaptcha = () => {
        const currentTitle = challenges[currentLevel].title;
        const correctIds = shuffledImages.filter(img => img.type === currentTitle).map(img => img.id);
        const isCorrect = selectedImages.length === correctIds.length && selectedImages.every(id => correctIds.includes(id));

        if (isCorrect) {
            setIsVerified(true);
            setShowChallenge(false);
        } else {
            setShowErrorModal(true);
            setSelectedImages([]);
            setCurrentLevel((prev) => (prev + 1) % challenges.length);
        }
    };

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isVerified) return;
        setStatus({ loading: true, success: false, message: 'მიმდინარეობს გაგზავნა...' });
        try {
            const response = await fetch('https://mentor-2-8mbm.onrender.com/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setStatus({ loading: false, success: true, message: 'წარმატებით გაიგზავნა!' });
                setFormData({ firstName: '', lastName: '', phoneNumber: '' });
                setIsVerified(false);
            } else {
                const data = await response.json();
                setStatus({ loading: false, success: false, message: data.error || 'შეცდომა' });
            }
        } catch (err) {
            setStatus({ loading: false, success: false, message: 'სერვერი გამორთულია!' });
        }
    };

    useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [formData, status, isVerified, showChallenge, selectedImages, showErrorModal]);

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
                            <div className="input-wrapper">
                                <i data-lucide="user" className="input-icon"></i>
                                <input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="სახელი" required />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>გვარი</label>
                            <div className="input-wrapper">
                                <i data-lucide="users" className="input-icon"></i>
                                <input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="გვარი" required />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>ტელეფონის ნომერი</label>
                            <div className="input-wrapper">
                                <i data-lucide="phone" className="input-icon"></i>
                                <input name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="5XXXXXXXX" required />
                            </div>
                        </div>

                        <div className="captcha-container">
                            <div className="captcha-box">
                                <div className="captcha-left">
                                    {!isVerified ? (
                                        <div className="checkbox" onClick={() => setShowChallenge(true)}></div>
                                    ) : (
                                        <div className="verified-check"><i data-lucide="check" style={{ color: '#009d5a' }}></i></div>
                                    )}
                                    <span className="captcha-text">მე არ ვარ რობოტი</span>
                                </div>
                                <div className="captcha-right">
                                    <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" />
                                    <span>reCAPTCHA</span>
                                    <small>Privacy - Terms</small>
                                </div>
                            </div>

                            {showChallenge && (
                                <div className="image-challenge-popup">
                                    <div className="challenge-header">
                                        <p>მონიშნეთ ყველა სურათი: <strong>{challenges[currentLevel].title}</strong></p>
                                    </div>
                                    <div className="image-grid">
                                        {shuffledImages.map((img) => (
                                            <div key={img.id} className={`grid-item ${selectedImages.includes(img.id) ? 'selected' : ''}`} onClick={() => toggleImage(img.id)}>
                                                {!loadedImages[img.id] && <div className="img-loader"><div className="spinner"></div></div>}
                                                <img src={img.url} alt="captcha" onLoad={() => handleImageLoad(img.id)} style={{ display: loadedImages[img.id] ? 'block' : 'none' }} />
                                                {selectedImages.includes(img.id) && <div className="check-overlay">✓</div>}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="challenge-footer">
                                        <button type="button" onClick={verifyCaptcha}>შემოწმება</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button type="submit" className="submit-btn" disabled={status.loading || !isVerified}>
                            {status.loading ? 'იგზავნება...' : 'რეგისტრაცია'}
                        </button>
                    </form>
                    {status.message && <div className={`status-message ${status.success ? 'success' : 'error'}`}>{status.message}</div>}
                </div>
            </div>

            {showErrorModal && (
                <div className="error-modal-overlay">
                    <div className="error-modal">
                        <i data-lucide="alert-circle" className="modal-icon"></i>
                        <h2>არასწორია!</h2>
                        <button onClick={() => setShowErrorModal(false)}>გასაგებია</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
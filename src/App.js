import React, { useState } from 'react';

const App = () => {
    const [contacts, setContacts] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', number: '', image: null, countryCode: '+1' });
    const [isEditing, setIsEditing] = useState(false);
    const [currentContactIndex, setCurrentContactIndex] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [showImageFormatPopup, setShowImageFormatPopup] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            setForm({ ...form, image: URL.createObjectURL(imageFile) });
            setShowImageFormatPopup(true);
        }
    };

    const handleImageFormatSelect = (format) => {
        setForm({ ...form, imageFormat: format });
        setShowImageFormatPopup(false);
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateNumber = (number) => {
        return /^[0-9]{10}$/.test(number);
    };

    const handleAddContact = () => {
        if (!validateEmail(form.email)) {
            setErrorMsg('Invalid email format.');
            return;
        }

        if (!validateNumber(form.number)) {
            setErrorMsg('Invalid phone number format (should be 10 digits).');
            return;
        }

        setContacts([...contacts, form]);
        setForm({ name: '', email: '', number: '', image: null, countryCode: '+1' });
        setErrorMsg('');
    };

    const handleUpdateContact = () => {
        if (!validateEmail(form.email)) {
            setErrorMsg('Invalid email format.');
            return;
        }

        if (!validateNumber(form.number)) {
            setErrorMsg('Invalid phone number format (should be 10 digits).');
            return;
        }

        const updatedContacts = contacts.map((contact, index) =>
            index === currentContactIndex ? form : contact
        );
        setContacts(updatedContacts);
        setIsEditing(false);
        setCurrentContactIndex(null);
        setForm({ name: '', email: '', number: '', image: null, countryCode: '+1' });
        setErrorMsg('');
    };

    const handleEditContact = (index) => {
        setForm(contacts[index]);
        setIsEditing(true);
        setCurrentContactIndex(index);
    };

    const handleDeleteContact = (index) => {
        const updatedContacts = [...contacts];
        updatedContacts.splice(index, 1);
        setContacts(updatedContacts);
    };

    return (
        <div className="container">
            <h1>𝕮𝖔𝖓𝖙-𝕮𝖔𝖓𝖓𝖊𝖈𝖙</h1>
            <div className="grid-container">
                <div className="add-contact">
                    <h2>{isEditing ? 'Update Contact' : 'Add Contact'}</h2>
                    <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleInputChange} />
                    <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleInputChange} />
                    <div className="phone-input">
                        <div className="country-code">
                            <select name="countryCode" value={form.countryCode} onChange={handleInputChange}>
                                <option value="+1">+1 (USA)</option>
                                <option value="+91">+91 (India)</option>
                                <option value="+44">+44 (UK)</option>
                                <option value="+81">+81 (Japan)</option>
                                <option value="+86">+86 (China)</option>
                                <option value="+33">+33 (France)</option>
                                <option value="+49">+49 (Germany)</option>
                                {/* Add more country codes as needed */}
                            </select>
                        </div>
                        <input type="tel" name="number" placeholder="Contact Number (10 digits)" value={form.number} onChange={handleInputChange} />
                    </div>
                    <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
                    {errorMsg && <p className="error">{errorMsg}</p>}
                    <div className="buttons">
                        {isEditing ? (
                            <button onClick={handleUpdateContact}>Update Contact</button>
                        ) : (
                            <button onClick={handleAddContact}>Add Contact</button>
                        )}
                    </div>
                </div>
                <div className="saved-contacts">
                    <h2>Saved Contacts</h2>
                    <div className="contact-list">
                        {contacts.map((contact, index) => (
                            <div key={index} className="contact-card">
                                <div className="contact-image">
                                    <img src={contact.image} alt={contact.name} />
                                </div>
                                <div className="contact-info">
                                    <h3>{contact.name}</h3>
                                    <p>Email: {contact.email}</p>
                                    <p>Phone: {contact.countryCode} {contact.number}</p>
                                    <div className="contact-actions">
                                        <button className="edit-btn" onClick={() => handleEditContact(index)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDeleteContact(index)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showImageFormatPopup && (
                <div className="image-format-popup">
                    <h3>Select Image Format</h3>
                    <button onClick={() => handleImageFormatSelect('png')}>PNG</button>
                    <button onClick={() => handleImageFormatSelect('jpg')}>JPG</button>
                    <button onClick={() => handleImageFormatSelect('jpeg')}>JPEG</button>
                </div>
            )}
        </div>
    );
};

export default App;



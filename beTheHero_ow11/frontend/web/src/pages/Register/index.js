import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './styles.css';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(event) {
        event.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try {
            const response = await api.post('ongs', data)

            alert(`Your access ID: ${response.data.id} `)

            history.push('/')
        } catch (error) {
            alert(`Error: ${error}, Try again!`)
        }

        
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo Heroes" />

                    <h1>Register</h1>
                    <p>Make your registration, enter the platform and help people find the cases of your NGO.</p>
                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#e02041" />
                        I'm not registered
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="NGO name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={event => setEmail(event.target.value)} 
                    />
                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={event => setWhatsapp(event.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            placeholder="City"
                            value={city}
                            onChange={event => setCity(event.target.value)} 
                        />
                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }}
                            value={uf}
                            onChange={event => setUf(event.target.value)} 
                        />
                    </div>

                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}
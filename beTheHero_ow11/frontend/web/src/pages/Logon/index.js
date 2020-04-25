import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api'

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const response = await api.post('sessions', {id})

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('profile')
        } catch (error) {
            alert(`Login failed! ${error}. Try again.`)
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo Heroes" />

                <form onSubmit={handleLogin}>
                    <h1>Login</h1>

                    <input 
                        placeholder="Your ID"
                        value={id}
                        onChange={event => setId(event.target.value)}
                    />
                    <button type="submit" className="button">Go in</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#e02041" />
                        I'm not registered
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}
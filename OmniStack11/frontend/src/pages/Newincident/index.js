import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function Newincident() {
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[value, setValue] = useState('');
    
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(event) {
        event.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })

            history.push('/profile')
        } catch (error) {
            alert(`Error registering incident! ${error}, please try again.`)
        }

    }

    return (
        <div className="newincident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo Heroes" />

                    <h1>Register new incident</h1>
                    <p>Write the text in detail to find a hero to solve this.</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#e02041" />
                        Back to Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Incident Title"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <textarea 
                        placeholder="Description"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                    <input 
                        placeholder="BRL value"
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />
                    

                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}
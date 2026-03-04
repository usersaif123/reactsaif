import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-hero d-flex align-items-center justify-content-center text-white" style={{
            height: '80vh',
            background: 'linear-gradient(45deg, #12c2e9, #c471ed, #f64f59)',
            borderRadius: '15px',
            margin: '2rem 0'
        }}>
            <Container className="text-center">
                <h1 className="display-1 fw-bold mb-4 animate__animated animate__fadeInDown">
                    Welcome to Esprit Events
                </h1>
                <p className="lead mb-5 animate__animated animate__fadeIn" style={{ fontSize: '1.5rem' }}>
                    Discover and manage the most exciting events happening at Esprit.
                </p>
                <Button
                    variant="light"
                    size="lg"
                    className="px-5 py-3 rounded-pill shadow-lg fw-bold"
                    onClick={() => navigate('/events')}
                >
                    Explore Events
                </Button>
            </Container>
        </div>
    );
};

export default Home;

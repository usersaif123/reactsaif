import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import Event from './Event';
import eventsData from '../events.json';

const Events = () => {
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        setShowWelcome(true);
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 3000);

        console.log('Events component mounted');
        return () => {
            clearTimeout(timer);
            console.log('Events component unmounted');
        };
    }, []);

    return (
        <Container>
            {showWelcome && (
                <Alert variant="info" className="my-3">
                    Hey welcome to Esprit Events
                </Alert>
            )}
            <h1 className="my-4 text-center">Upcoming Events</h1>
            <Row>
                {eventsData.map((event, index) => (
                    <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                        <Event event={event} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Events;

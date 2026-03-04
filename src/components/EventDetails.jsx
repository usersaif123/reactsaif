import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Alert, Button } from 'react-bootstrap';
import { getallEvents } from '../service/api';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await getallEvents(id);
                setEvent(response.data);
            } catch (err) {
                console.error("Error fetching event details:", err);
                setError(true);
            }
        };

        fetchEventDetails();
    }, [id]);

    if (error) {
        return (
            <Container className="my-5">
                <Alert variant="danger">
                    Event does not exist
                </Alert>
                <Button onClick={() => navigate('/events')}>Back to Events</Button>
            </Container>
        );
    }

    if (!event) {
        return <Container className="my-5"><p>Loading event details...</p></Container>;
    }

    return (
        <Container className="my-5">
            <Card>
                <Card.Img variant="top" src={`/images/${event.img}`} alt={event.name} />
                <Card.Body>
                    <Card.Title>{event.name}</Card.Title>
                    <Card.Text>{event.description}</Card.Text>
                    <Card.Text><strong>Price:</strong> {event.price} DT</Card.Text>
                    <Card.Text><strong>Available Tickets:</strong> {event.nbTickets}</Card.Text>
                    <Card.Text><strong>Participants:</strong> {event.nbParticipants}</Card.Text>
                    <Button variant="primary" onClick={() => navigate('/events')}>
                        Back to Events
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EventDetails;

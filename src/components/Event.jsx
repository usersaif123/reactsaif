import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';

const Event = ({ event }) => {
    const [nbTickets, setNbTickets] = useState(event.nbTickets);
    const [nbParticipants, setNbParticipants] = useState(event.nbParticipants);
    const [liked, setLiked] = useState(event.like);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        console.log(`Event ${event.name} mounted`);
        return () => console.log(`Event ${event.name} unmounted`);
    }, [event.name]);

    const handleBook = () => {
        if (nbTickets > 0) {
            setNbTickets(nbTickets - 1);
            setNbParticipants(nbParticipants + 1);
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 2000);
        }
    };

    const handleLike = () => {
        setLiked(!liked);
    };

    return (
        <Card style={{ margin: '10px', position: 'relative' }}>
            <Card.Img
                variant="top"
                src={`/images/${event.img}`}
                alt={event.name}
                style={{ height: '300px', objectFit: 'cover' }}
            />
            {nbTickets === 0 && (
                <div style={{
                    position: 'absolute',
                    top: '50px',
                    left: '10%',
                    width: '80%',
                    transform: 'rotate(-20deg)',
                    backgroundColor: 'rgba(255, 0, 0, 0.8)',
                    color: 'white',
                    fontSize: '2rem',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    padding: '10px',
                    borderRadius: '10px',
                    zIndex: 10
                }}>
                    SOLD OUT
                </div>
            )}
            <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>
                    Price: {event.price}<br />
                    Number of tickets: {nbTickets}<br />
                    Number of participants: {nbParticipants}
                </Card.Text>
                <div className="d-flex gap-2">
                    <Button
                        variant="info"
                        onClick={handleLike}
                        style={{ color: 'white' }}
                    >
                        {liked ? "Dislike" : "Like"}
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleBook}
                        disabled={nbTickets === 0}
                    >
                        Book an event
                    </Button>
                </div>
                {showMessage && (
                    <Alert variant="success" className="mt-2">
                        You have booked an event
                    </Alert>
                )}
            </Card.Body>
        </Card>
    );
};

export default Event;

import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getallEvents, editEvent } from '../service/api';

const UpdateEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        img: '',
        price: 0,
        nbTickets: 0,
        nbParticipants: 0,
        like: false
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await getallEvents(id);
                setFormData(response.data);
            } catch (err) {
                console.error("Error fetching event details:", err);
                setError("Failed to load event details.");
            }
        };

        fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            img: e.target.files[0].name
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editEvent(id, formData);
            navigate('/events');
        } catch (err) {
            console.error("Error updating event:", err);
            setError("Failed to update event. Please try again.");
        }
    };

    if (error && !formData.name) {
        return (
            <Container className="my-5">
                <Alert variant="danger">{error}</Alert>
                <Button onClick={() => navigate('/events')}>Back to Events</Button>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <h2>Modify {formData.name}</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" value={formData.description} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter price" name="price" value={formData.price} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formNbTickets">
                    <Form.Label>Number of Tickets</Form.Label>
                    <Form.Control type="number" placeholder="Enter number of tickets" name="nbTickets" value={formData.nbTickets} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formImg">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name="img" onChange={handleFileChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update
                </Button>
                <Button variant="secondary" className="ms-2" onClick={() => navigate('/events')}>
                    Cancel
                </Button>
            </Form>
        </Container>
    );
};

export default UpdateEvent;

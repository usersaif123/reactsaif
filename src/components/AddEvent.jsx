import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addEvent } from '../service/api';

const AddEvent = () => {
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
            await addEvent(formData);
            navigate('/events');
        } catch (err) {
            console.error("Error adding event:", err);
            setError("Failed to add event. Please try again.");
        }
    };

    return (
        <Container className="my-5">
            <h2>Add a new Event to your Event List</h2>
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
                    <Form.Control type="file" name="img" onChange={handleFileChange} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add an Event
                </Button>
                <Button variant="secondary" className="ms-2" onClick={() => navigate('/events')}>
                    Cancel
                </Button>
            </Form>
        </Container>
    );
};

export default AddEvent;

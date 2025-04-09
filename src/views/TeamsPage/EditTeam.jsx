import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

function EditTeam({ isCreate, api }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const teamId = !isCreate ? id : '';

    const title = !isCreate ? "Edit Team" : "Add Team";

    const [formData, setFormData] = useState({});
    const [coachOptions, setCoachOptions] = useState([]);
    const [validated, setValidated] = useState(false);
    const [phoneValid, setPhoneValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);

    useEffect(() => {
        const fetchCoachOptions = async () => {
            try {
                const coachData = await api.list("coaches");
                const options = coachData.map(coach => ({
                    value: coach.coachName,
                    label: coach.coachName
                }));
            
                setCoachOptions(options);
    
                setFormData(prevFormData => ({
                    ...prevFormData,
                    id: parseInt(id),
                    name: '',
                    coachName: '', 
                    motto: '',
                    coachPhone: '',
                    coachEmail: ''
                }));
            } catch (error) {
                console.error('Error fetching coach options:', error);
            }
        };
    
        fetchCoachOptions();
    }, [api, isCreate, teamId]);
    
    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handlePhoneChange = (e) => {
        setFormData({ ...formData, coachPhone: e.target.value });
        setPhoneValid(validatePhoneNumber(e.target.value));
        setValidated(false);
    };

    const handleEmailChange = (e) => {
        setFormData({ ...formData, coachEmail: e.target.value });
        setEmailValid(validateEmail(e.target.value));
        setValidated(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false || !phoneValid || !emailValid) {
            event.stopPropagation();
            setValidated(true);
        } else {
            try {
                if (isCreate) {
                    await api.create(formData);
                } else {
                    console.log(formData)
                    await api.update(formData);
                }
                navigate("/teams");
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    };
    

    return (
        <Container>
            <h1>{title}</h1>
            <Form
                className="mb-2"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter team name"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">Please enter a team name.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formCoach">
                    <Form.Label>Coach</Form.Label>
                    <Form.Control
                        as="select"
                        required
                        value={formData.coachName || ''}
                        onChange={(e) => setFormData({ ...formData, coachName: e.target.value })}
                    >
                        <option value="">Select a coach</option>
                        {coachOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">Please select a coach.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formMotto">
                    <Form.Label>Motto</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter team motto"
                        value={formData.motto || ''}
                        onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
                    />
                </Form.Group>
                <Form.Group controlId="formCoachPhone">
                    <Form.Label>Coach Phone</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter coach phone"
                        value={formData.coachPhone || ''}
                        onChange={handlePhoneChange}
                        isInvalid={!phoneValid}
                    />
                    <Form.Control.Feedback type="invalid">Please enter a valid phone number (10 digits).</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formCoachEmail">
                    <Form.Label>Coach Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter coach email"
                        value={formData.coachEmail || ''}
                        onChange={handleEmailChange}
                        isInvalid={!emailValid}
                    />
                    <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {isCreate ? 'Create' : 'Update'}
                </Button>
            </Form>
        </Container>
    );
}

export default EditTeam;

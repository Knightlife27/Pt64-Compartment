import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import '../../styles/category.css';

export const Category = () => {
    const { store, actions } = useContext(Context);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleCreateCategory = () => {
        actions.handleCreateCategory(newCategoryName);
        setNewCategoryName('');
        handleClose();
    };

    const handleDeleteCategory = async (categoryId) => {
        const response = await fetch(process.env.BACKEND_URL + "api/delete_category", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: categoryId })
        });
        if (response.ok) {
            actions.fetchCategories();
        } else {
            console.error('Failed to delete category:', response.status);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4" style={{ color: '#77d0d3' }}>Categories</h2>
            <Row>
                {store.categories.map(category => (
                    <Col md={4} key={category.id} className="mb-4">
                        <Card className="h-100 shadow-sm">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link to={`/categories/${category.id}`} className="text-decoration-none">
                                        <Card.Title>{category.categoryName}</Card.Title>
                                    </Link>
                                    <Button 
                                        variant="danger" 
                                        size="sm"
                                        onClick={() => handleDeleteCategory(category.id)}
                                    >
                                        &times;
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className="text-center mt-4">
                <Button 
                    variant="primary" 
                    onClick={handleShow}
                    style={{ backgroundColor: '#77d0d3', borderColor: '#77d0d3' }}
                >
                    Create New Category
                </Button>
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton style={{ backgroundColor: '#77d0d3', color: 'white' }}>
                    <Modal.Title>Create New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCategoryName">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category name"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleCreateCategory}
                        style={{ backgroundColor: '#77d0d3', borderColor: '#77d0d3' }}
                    >
                        Create Category
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
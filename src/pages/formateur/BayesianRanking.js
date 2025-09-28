import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Spinner, Table, Badge, Form, Alert } from 'react-bootstrap';
import NavbarMinimal from "../../components/NavbarMinimal";
import SidebarFormateur from "../../components/SidebarFormateur";

const BayesianRanking = () => {
    const [data, setData] = useState({ formations: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    "http://localhost:8000/api/formations/ranking/bayesian",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                // ajouter la propriété selectedMethod à chaque formation
                const formationsWithMethod = response.data.formations.map(f => ({
                    ...f,
                    selectedMethod: 'weighted' // valeur par défaut
                }));
                setData({ formations: formationsWithMethod });
            } catch (err) {
                console.error(err);
                setError("Erreur lors du chargement des données");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderStars = (rating) => {
        const numRating = Number(rating) || 0;
        return [...Array(5)].map((_, i) => (
            <span key={i} className={i < numRating ? "text-warning" : "text-secondary"}>
                {i < Math.floor(numRating) ? '★' : '☆'}
            </span>
        ));
    };

    const safeToFixed = (value, decimals = 2) => {
        const num = Number(value);
        return isNaN(num) ? '0.00' : num.toFixed(decimals);
    };

    if (loading) {
        return (
            <div>
                <NavbarMinimal />
                <div className="d-flex">
                    <SidebarFormateur />
                    <Container className="d-flex justify-content-center align-items-center"
                        style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
                        <Spinner animation="border" variant="primary" />
                    </Container>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <NavbarMinimal />
                <div className="d-flex">
                    <SidebarFormateur />
                    <Container className="p-5" style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
                        <Alert variant="danger" className="text-center">
                            {error}
                        </Alert>
                    </Container>
                </div>
            </div>
        );
    }

    return (
        <div>
            <NavbarMinimal />
            <div className="d-flex">
                <SidebarFormateur />
                <Container className="p-5" style={{ flex: 1, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
                    <Card className="bg-white shadow rounded p-4">
                        <h2 className="text-primary mb-4 text-center" style={{ fontWeight: "bold" }}>
                            🏆 Classement des Formations
                        </h2>

                        <Table striped bordered hover responsive>
                            <thead className="table-dark text-center">
                                <tr>
                                    <th width="5%">#</th>
                                    <th width="35%">Formation</th>
                                    <th width="20%">Score</th>
                                    <th width="15%">Évaluations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.formations.map((formation, index) => (
                                    <tr key={formation.id}>
                                        <td className="align-middle fw-bold">{index + 1}</td>
                                        <td>
                                            <div className="fw-bold">{formation.titre}</div>
                                            {formation.formateur?.user && (
                                                <div className="text-muted small">
                                                    Par {formation.formateur.user.nom} {formation.formateur.user.prenom}
                                                </div>
                                            )}
                                        </td>
                                        <td className="align-middle text-center">
                                            <div className="d-flex flex-column align-items-center">
                                                <Form.Select
                                                    size="sm"
                                                    value={formation.selectedMethod}
                                                    onChange={(e) => {
                                                        const newMethod = e.target.value;
                                                        setData(prev => ({
                                                            ...prev,
                                                            formations: prev.formations.map(f =>
                                                                f.id === formation.id ? { ...f, selectedMethod: newMethod } : f
                                                            )
                                                        }));
                                                    }}
                                                    style={{ width: "160px", marginBottom: "8px" }}
                                                >
                                                    <option value="weighted">Score Pondéré</option>
                                                    <option value="average">Moyenne Simple</option>
                                                </Form.Select>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    {renderStars(
                                                        formation.selectedMethod === 'weighted'
                                                            ? formation.bayesian_score
                                                            : formation.average_rating
                                                    )}
                                                    <span className="ms-2 fw-bold">
                                                        {safeToFixed(
                                                            formation.selectedMethod === 'weighted'
                                                                ? formation.bayesian_score
                                                                : formation.average_rating
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle text-center">
                                            <Badge bg={formation.evaluations_count > 0 ? 'success' : 'secondary'} className="fs-6 text-white">
                                                {formation.evaluations_count || 0}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        {data.formations.length === 0 && (
                            <Alert variant="info" className="mt-4 text-center">
                                Aucune formation disponible pour le moment.
                            </Alert>
                        )}
                    </Card>
                </Container>
            </div>
        </div>
    );
};

export default BayesianRanking;

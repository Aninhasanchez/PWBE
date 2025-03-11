import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import './styles.css';
import ModalProfessores from "../modal";
import Head from '../head';
import Footer from '../footer';

export default function Disciplinas() {

    const [dados, setDados] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [professorSelecionado, setProfessorSelecionado] = useState(null);
    const [texto, setTexto] = useState('');

    const handleEdit = (professor) => {
        setProfessorSelecionado(professor);
        setModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Tem certeza que deseja excluir?")) {
            setDados(dados.filter(professor => professor.id !== id));
        }
    };

    const handleAdd = () => {
        setProfessorSelecionado(null);
        setModalOpen(true);
    };

    const handleSearch = () => {
        console.log("Buscar professor com nome:", texto);
        setModalOpen(true);
    };

    return (
        <main className="main">
            <Head />
            <div className="container_home">
                <section className="section_home">
                    <div className="table">
                        {dados.map((professor) => (
                            <div key={professor.id} className="lista">
                                <FaEdit className="edit" onClick={() => handleEdit(professor)} />
                                <FaTrash className="delete" onClick={() => handleDelete(professor.id)} />
                                <span className="id">{professor.id}</span>
                                <span className="ni">{professor.ni}</span>
                                <span className="nome">{professor.nome}</span>
                                <span className="email">{professor.email}</span>
                                <span className="cel">{professor.cel}</span>
                                <span className="ocup">{professor.ocup}</span>
                            </div>
                        ))}
                    </div>
                    <div className="footer">
                        <FaPlus className="adicionar" onClick={handleAdd} />
                        <input
                            placeholder="Nome do professor"
                            value={texto}
                            onChange={(e) => setTexto(e.target.value)}
                        />
                        <FaSearch className="procurar" onClick={handleSearch} />
                    </div>
                    <ModalProfessores 
                        isOpen={modalOpen} 
                        onClose={() => setModalOpen(false)} 
                        professorSelecionado={professorSelecionado}
                        setProfessorSelecionado={setProfessorSelecionado}
                    />
                </section>
            </div>
            <Footer />
        </main>
    );
}

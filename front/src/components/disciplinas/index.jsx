import React, { useState, useEffect } from "react";
import axios from "axios"
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import './styles.css';

import ModalDisciplinas from "../modal_disciplinas";
import Head from '../head';
import Footer from '../footer';

export default function Disciplinas() {

    const [dados, setDados] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const token = localStorage.getItem('token')
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
    const [texto, setTexto] = useState('');
    const [up, setUp] = useState(false)

    useEffect(() => {

        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/disciplinas", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDados(response.data);
                console.log(response.data)
                console.log("Response Data:", response.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, [up]);


    const atualizar = async (disciplinaSelecionada  ) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/disciplinas/id/${disciplinaSelecionada.id}`,
                {
                    sigla: disciplinaSelecionada.sigla,
                    curso: disciplinaSelecionada.curso,
                    semestre: disciplinaSelecionada.semestre,
                    cargaHoraria: disciplinaSelecionada.cargaHoraria,
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )
            setDados(dados.map((disciplinas) => disciplinas.id === disciplinaSelecionada.id ? disciplinaSelecionada: disciplinas))
            setModalOpen(false)
        } catch (error) {
            console.error(error)
        }

    }

    const apagar = async (id) => {
        if (window.confirm("Tem certeza? ")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/disciplinas/id/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                setDados(dados.filter(disciplinas => disciplinas.id !== id))
            }

            catch (error) {
                console.error(error)
            }
        }

    }


    const search = async (texto) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/search/?search=${texto}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setDisciplinaSelecionada(response.data[0])
        } catch (error) {
            console.error(error)
        }
    }

    
    return (
        <main className="main">
            <Head />
            <div className="container_home">
                <section className="section_home">
                    <div className="table">
                        {dados.map((disciplinas) => (
                            <div key={disciplinas.id} className="lista">
                                <FaEdit className="edit" onClick={() => { setModalOpen(true), setDisciplinaSelecionada(disciplinas) }} />
                                <FaTrash className="delete" onClick={() => apagar(disciplinas.id)} />
                                <span className="sigla">Sigla: {disciplinas.sigla} |</span>
                                <span className="curso">Curso: {disciplinas.curso} |</span>
                                <span className="semestre">Semestre: {disciplinas.semestre} |</span>
                                <span className="cargaHoraria">Carga Horaria: {disciplinas.cargaHoraria}</span>
                            </div>
                        ))}
                    </div>
                    <div className="footer">
                        <FaPlus className="adicionar" onClick={() => { setModalOpen(true), setDisciplinaSelecionada(null) }} />
                        <input
                            placeholder="Nome da disciplina"
                            value={texto}
                            onChange={(e) => setTexto(e.target.value)}
                        />
                        <FaSearch className="procurar" onClick={() => {setModalOpen(true) , search(texto)}} />
                    </div>
                    <ModalDisciplinas 
                        isOpen={modalOpen} 
                        onClose={() => setModalOpen(false)} 
                        disciplinaSelecionada={disciplinaSelecionada}
                        setDisciplinaSelecionada={setDisciplinaSelecionada}
                        up={up}
                        setUp={setUp}
                    />
                </section>
            </div>
            <Footer/>
        </main>
    );
}

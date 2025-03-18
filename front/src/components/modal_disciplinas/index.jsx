import React, { useEffect, useState } from "react";
import axios from 'axios'
import './styles.css'

const ModalDisciplinas = ({
  isOpen,
  onClose,
  disciplinaSelecionada,
  up,
  setUp
}) => {
  if (!isOpen) return null

  const [sigla, setSigla] = useState(disciplinaSelecionada?.sigla || '')
  const [curso, setCurso] = useState(disciplinaSelecionada?.curso || '')
  const [semestre, setSemestre] = useState(disciplinaSelecionada?.semestre || '')
  const [cargaHoraria, setCargaHoraria] = useState(disciplinaSelecionada?.cargaHoraria || '')
  const token = localStorage.getItem('token')



  useEffect(() => {
    if (disciplinaSelecionada) {
      setSigla(disciplinaSelecionada.sigla || '')
      setCurso(disciplinaSelecionada.curso || '')
      setSemestre(disciplinaSelecionada.semestre || '')
      setCargaHoraria(disciplinaSelecionada.cargaHoraria || '')
    } else {
      setSigla('')
      setCurso('')
      setSemestre('')
      setCargaHoraria('')
    }
  }, [])



  const upDate = async () => {
    console.log("Disciplina email: ", disciplinaSelecionada)
    const response = await axios.put(`http://127.0.0.1:8000/api/disciplinas/id/${disciplinaSelecionada.id}`,
      {
        sigla: sigla,
        curso: curso,
        semestre: semestre,
        cargaHoraria: cargaHoraria,
      }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    )
    console.log("Response: ", response.data)
    onClose()
    setUp(!up)

  }

  const newTeacher = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/disciplinas',
        {
          sigla: sigla,
          curso: curso,
          semestre: semestre,
          cargaHoraria: cargaHoraria,
        }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      onClose()
      setUp(!up)
    } catch (error) {

    }

  }

  const handleSubmit = () => {
    // e.preventDefault();
    console.log("Disciplina S: ", disciplinaSelecionada)


  }

  return (
    <div className="modal-overlay">
      <div className="modal_container">
        <button className="close_button" onClick={onClose}>X</button>
        <h2>{disciplinaSelecionada ? "Editar" : "Cadastrar"}</h2>
        <div className="body_modal">
          <div className="caixa1">
            <form onSubmit={handleSubmit}>

              <input
                className="sigla_modal"
                value={sigla}
                onChange={(e) => setSigla(e.target.value)}
                placeholder="SIGLA"
              />
              <input
                className="curso_modal"
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                placeholder="CURSO"
              />
              <input
                className="semestre_modal"
                value={semestre}
                onChange={(e) => setSemestre(e.target.value)}
                placeholder="SEMESTRE"
              />
              <input
                className="cargaHoraria_modal"
                value={cargaHoraria}
                onChange={(e) => setCargaHoraria(e.target.value)}
                placeholder="CARGA HORARIA"
              />

              <button type="submit" onClick={disciplinaSelecionada ? upDate : newTeacher}>{disciplinaSelecionada ? "Atualizar" : "Salvar"}</button>
            </form>
          </div>
          <div className="caixa2">
            <div className="foto">

            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default ModalDisciplinas
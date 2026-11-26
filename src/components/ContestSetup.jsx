import { useState } from 'react'

const CONTEST_TYPES = {
  'Concurso de talentos': ['Creatividad', 'Técnica', 'Presencia en escena'],
  'Feria de proyectos': ['Innovación', 'Presentación', 'Dominio del tema'],
  'Concurso de cocina': ['Sabor', 'Presentación del plato', 'Originalidad'],
  Personalizado: [],
}

// Id único (no se repite aunque se recargue la página, porque los datos viven en localStorage)
const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8)

export default function ContestSetup({ onSave, onCancel }) {
  const [name, setName] = useState('')
  const [type, setType] = useState('Concurso de talentos')
  const [criteria, setCriteria] = useState(
    CONTEST_TYPES['Concurso de talentos'].map((c) => ({ id: newId(), name: c }))
  )
  const [criterionInput, setCriterionInput] = useState('')
  const [participants, setParticipants] = useState([])
  const [participantName, setParticipantName] = useState('')
  const [participantProject, setParticipantProject] = useState('')
  const [error, setError] = useState('')

  
  function handleTypeChange(e) {
    const selected = e.target.value
    setType(selected)
    setCriteria(CONTEST_TYPES[selected].map((c) => ({ id: newId(), name: c })))
  }

  function addCriterion(e) {
    e.preventDefault()
    const value = criterionInput.trim()
    if (!value) return
    setCriteria([...criteria, { id: newId(), name: value }])
    setCriterionInput('')
  }

  function removeCriterion(id) {
    setCriteria(criteria.filter((c) => c.id !== id))
  }

  function addParticipant(e) {
    e.preventDefault()
    const value = participantName.trim()
    if (!value) return
    setParticipants([
      ...participants,
      { id: newId(), name: value, project: participantProject.trim(), votes: [] },
    ])
    setParticipantName('')
    setParticipantProject('')
  }

  function removeParticipant(id) {
    setParticipants(participants.filter((p) => p.id !== id))
  }

  function handleSave() {
    if (!name.trim()) return setError('Escribe el nombre del concurso.')
    if (criteria.length === 0) return setError('Agrega al menos un criterio de evaluación.')
    if (participants.length < 2) return setError('Agrega al menos 2 participantes.')
    setError('')
    onSave({ id: newId(), name: name.trim(), type, criteria, participants })
  }

  return (
    <section className="card">
      <h2>Nuevo concurso</h2>

      <label className="field">
        Nombre del concurso
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Feria de proyectos 2026"
        />
      </label>

      <label className="field">
        Tipo de concurso
        <select value={type} onChange={handleTypeChange}>
          {Object.keys(CONTEST_TYPES).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <h3>Criterios de evaluación</h3>
      <ul className="chip-list">
        {criteria.map((c) => (
          <li key={c.id} className="chip">
            {c.name}
            <button type="button" onClick={() => removeCriterion(c.id)} aria-label={`Quitar ${c.name}`}>
              ×
            </button>
          </li>
        ))}
      </ul>
      <form className="row" onSubmit={addCriterion}>
        <input
          type="text"
          value={criterionInput}
          onChange={(e) => setCriterionInput(e.target.value)}
          placeholder="Nuevo criterio"
        />
        <button type="submit" className="btn secondary">Agregar criterio</button>
      </form>

      <h3>Participantes</h3>
      <form className="row" onSubmit={addParticipant}>
        <input
          type="text"
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
          placeholder="Nombre del participante"
        />
        <input
          type="text"
          value={participantProject}
          onChange={(e) => setParticipantProject(e.target.value)}
          placeholder="Presentación (opcional)"
        />
        <button type="submit" className="btn secondary">Agregar participante</button>
      </form>

      {participants.length === 0 ? (
        <p className="muted">Aún no hay participantes.</p>
      ) : (
        <ul className="simple-list">
          {participants.map((p) => (
            <li key={p.id}>
              <span>
                <strong>{p.name}</strong>
                {p.project && <> — {p.project}</>}
              </span>
              <button type="button" className="btn danger small" onClick={() => removeParticipant(p.id)}>
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="error">{error}</p>}

      <div className="row">
        <button type="button" className="btn primary" onClick={handleSave}>
          Guardar concurso
        </button>
        {onCancel && (
          <button type="button" className="btn secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </section>
  )
}

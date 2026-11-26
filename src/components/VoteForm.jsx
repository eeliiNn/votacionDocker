import { useState } from 'react'
import { MAX_SCORE } from '../utils/scoring.js'

export default function VoteForm({ criteria, onSubmit, onCancel }) {
  const [judge, setJudge] = useState('')
  // Cada criterio inicia en 5 (valor medio)
  const [scores, setScores] = useState(
    Object.fromEntries(criteria.map((c) => [c.id, 5]))
  )

  function handleScoreChange(criterionId, value) {
    setScores({ ...scores, [criterionId]: Number(value) })
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({ judge: judge.trim() || 'Anónimo', scores })
  }

  return (
    <form className="vote-form" onSubmit={handleSubmit}>
      <label className="field">
        Nombre del juez (opcional)
        <input type="text" value={judge} onChange={(e) => setJudge(e.target.value)} />
      </label>

      {criteria.map((c) => (
        <label key={c.id} className="field">
          <span className="score-label">
            {c.name} <strong>{scores[c.id]}</strong>
          </span>
          <input
            type="range"
            min="1"
            max={MAX_SCORE}
            step="1"
            value={scores[c.id]}
            onChange={(e) => handleScoreChange(c.id, e.target.value)}
          />
        </label>
      ))}

      <div className="row">
        <button type="submit" className="btn primary">Guardar voto</button>
        <button type="button" className="btn secondary" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  )
}

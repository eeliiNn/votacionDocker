import { useState } from 'react'
import VoteForm from './VoteForm.jsx'
import { participantAverage } from '../utils/scoring.js'

export default function ParticipantList({ contest, onAddVote, onShowResults, onBack }) {
  const participants = contest.participants
  const [votingId, setVotingId] = useState(null) // participante que se está calificando

  const totalVotes = participants.reduce((sum, p) => sum + p.votes.length, 0)

  function handleSubmit(participantId, vote) {
    onAddVote(participantId, vote)
    setVotingId(null)
  }

  return (
    <section>
      <div className="card">
        <h2>Participantes y votación</h2>
        <p className="muted">
          Pulsa "Calificar" en una presentación para dar tus notas. Cada participante puede recibir
          varios votos (por ejemplo, de distintos jueces).
        </p>
      </div>

      <div className="grid">
        {participants.map((p) => (
          <article key={p.id} className="card participant">
            <h3>{p.name}</h3>
            {p.project && <p className="muted">{p.project}</p>}
            <p>
              Votos recibidos: <strong>{p.votes.length}</strong>
            </p>
            <p>
              Promedio actual:{' '}
              <strong>{p.votes.length > 0 ? participantAverage(p).toFixed(2) : '—'}</strong>
            </p>

            {votingId === p.id ? (
              <VoteForm
                criteria={contest.criteria}
                onSubmit={(vote) => handleSubmit(p.id, vote)}
                onCancel={() => setVotingId(null)}
              />
            ) : (
              <button type="button" className="btn primary" onClick={() => setVotingId(p.id)}>
                Calificar
              </button>
            )}
          </article>
        ))}
      </div>

      <div className="card center row">
        <button type="button" className="btn secondary" onClick={onBack}>
          Volver a concursos
        </button>
        <button
          type="button"
          className="btn primary"
          onClick={onShowResults}
          disabled={totalVotes === 0}
        >
          Ver resultados y ganador
        </button>
      </div>
      {totalVotes === 0 && (
        <p className="muted center">Registra al menos un voto para ver resultados.</p>
      )}
    </section>
  )
}

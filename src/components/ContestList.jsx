export default function ContestList({ contests, onVote, onResults, onDelete, onNew }) {
  function handleDelete(contest) {
    if (window.confirm(`¿Eliminar el concurso "${contest.name}"? Se perderán sus votos.`)) {
      onDelete(contest.id)
    }
  }

  return (
    <section>
      <div className="card">
        <h2>Concursos disponibles</h2>
        <p className="muted">Elige un concurso para votar o crea uno nuevo.</p>
        <button type="button" className="btn primary" onClick={onNew}>
          Crear nuevo concurso
        </button>
      </div>

      <div className="grid">
        {contests.map((c) => {
          const totalVotes = c.participants.reduce((sum, p) => sum + p.votes.length, 0)
          return (
            <article key={c.id} className="card">
              <h3>{c.name}</h3>
              <p>
                <span className="badge">{c.type}</span>
              </p>
              <p className="muted">
                {c.participants.length} participantes · {c.criteria.length} criterios ·{' '}
                {totalVotes} votos
              </p>
              <div className="row">
                <button type="button" className="btn primary" onClick={() => onVote(c.id)}>
                  Votar
                </button>
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => onResults(c.id)}
                  disabled={totalVotes === 0}
                >
                  Resultados
                </button>
                <button type="button" className="btn danger small" onClick={() => handleDelete(c)}>
                  Eliminar
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

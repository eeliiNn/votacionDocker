import { buildRanking, getWinners, criterionAverage } from '../utils/scoring.js'

export default function Results({ contest, onVote, onBack }) {
  const participants = contest.participants
  const ranking = buildRanking(participants)
  const winners = getWinners(ranking)
  const withoutVotes = participants.filter((p) => p.votes.length === 0)

  return (
    <section>
      <div className="card winner">
        <h2>Resultados</h2>
        {winners.length === 1 ? (
          <p className="winner-text">
            🏆 Ganador: <strong>{winners[0].name}</strong> con {winners[0].average.toFixed(2)} puntos
          </p>
        ) : (
          <p className="winner-text">
            🤝 Empate en el primer lugar entre{' '}
            <strong>{winners.map((w) => w.name).join(', ')}</strong> con{' '}
            {winners[0].average.toFixed(2)} puntos
          </p>
        )}
      </div>

      <div className="card">
        <h3>Tabla de posiciones</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Participante</th>
                {contest.criteria.map((c) => (
                  <th key={c.id}>{c.name}</th>
                ))}
                <th>Votos</th>
                <th>Promedio</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((p, index) => (
                <tr key={p.id} className={winners.some((w) => w.id === p.id) ? 'highlight' : ''}>
                  <td>{index + 1}</td>
                  <td>{p.name}</td>
                  {contest.criteria.map((c) => (
                    <td key={c.id}>{criterionAverage(p, c.id).toFixed(2)}</td>
                  ))}
                  <td>{p.votes.length}</td>
                  <td>
                    <strong>{p.average.toFixed(2)}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {withoutVotes.length > 0 && (
          <p className="muted">
            Sin votos todavía: {withoutVotes.map((p) => p.name).join(', ')}
          </p>
        )}
      </div>

      <div className="card center row">
        <button type="button" className="btn secondary" onClick={onVote}>
          Seguir votando
        </button>
        <button type="button" className="btn primary" onClick={onBack}>
          Volver a concursos
        </button>
      </div>
    </section>
  )
}

export const MAX_SCORE = 10

export function average(numbers) {
  if (numbers.length === 0) return 0
  const total = numbers.reduce((sum, n) => sum + n, 0)
  return total / numbers.length
}

export function voteAverage(vote) {
  return average(Object.values(vote.scores))
}

export function participantAverage(participant) {
  return average(participant.votes.map(voteAverage))
}

export function criterionAverage(participant, criterionId) {
  return average(participant.votes.map((v) => v.scores[criterionId] ?? 0))
}

export function buildRanking(participants) {
  return participants
    .filter((p) => p.votes.length > 0)
    .map((p) => ({ ...p, average: participantAverage(p) }))
    .sort((a, b) => b.average - a.average)
}

export function getWinners(ranking) {
  if (ranking.length === 0) return []
  const top = ranking[0].average
  return ranking.filter((p) => Math.abs(p.average - top) < 0.0001)
}

import { useState } from 'react'
import useLocalStorage from './utils/useLocalStorage.js'
import ContestList from './components/ContestList.jsx'
import ContestSetup from './components/ContestSetup.jsx'
import ParticipantList from './components/ParticipantList.jsx'
import Results from './components/Results.jsx'

export default function App() {
  const [contests, setContests] = useLocalStorage('concursos', [])
  const [view, setView] = useState('home')
  const [selectedId, setSelectedId] = useState(null)

  const selected = contests.find((c) => c.id === selectedId)

  const currentView = contests.length === 0 ? 'setup' : view

  function handleSaveContest(newContest) {
    setContests([...contests, newContest])
    setView('home')
  }

  function handleDeleteContest(id) {
    setContests(contests.filter((c) => c.id !== id))
  }

  function openContest(id, nextView) {
    setSelectedId(id)
    setView(nextView)
  }

  function handleAddVote(participantId, vote) {
    setContests(
      contests.map((c) =>
        c.id !== selectedId
          ? c
          : {
              ...c,
              participants: c.participants.map((p) =>
                p.id === participantId ? { ...p, votes: [...p.votes, vote] } : p
              ),
            }
      )
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sistema de votación</h1>
        {selected && (currentView === 'voting' || currentView === 'results') && (
          <p className="subtitle">
            {selected.name} · <span className="badge">{selected.type}</span>
          </p>
        )}
      </header>

      <main>
        {currentView === 'home' && (
          <ContestList
            contests={contests}
            onVote={(id) => openContest(id, 'voting')}
            onResults={(id) => openContest(id, 'results')}
            onDelete={handleDeleteContest}
            onNew={() => setView('setup')}
          />
        )}

        {currentView === 'setup' && (
          <ContestSetup
            onSave={handleSaveContest}
            onCancel={contests.length > 0 ? () => setView('home') : null}
          />
        )}

        {currentView === 'voting' && selected && (
          <ParticipantList
            contest={selected}
            onAddVote={handleAddVote}
            onShowResults={() => setView('results')}
            onBack={() => setView('home')}
          />
        )}

        {currentView === 'results' && selected && (
          <Results
            contest={selected}
            onVote={() => setView('voting')}
            onBack={() => setView('home')}
          />
        )}
      </main>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { getHello } from './api'

type Status = 'loading' | 'ok' | 'error'

function App() {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('loading')
  const [answer, setAnswer] = useState('') // State for the answer text box

  useEffect(() => {
    getHello()
      .then((data) => {
        setMessage(data.message)
        setStatus('ok')
      })
      .catch(() => setStatus('error'))
  }, [])

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value)
  }

  const handleSubmit = () => {
    console.log('Answer submitted:', answer)
    // Add logic to validate or send the answer to the backend
    //Curentley just logs the answer to the console.
  }

  return (
    <main>
      <h1>Hello from React!</h1>
      <p>
        Backend says: {status === 'loading' && <em>loading…</em>}
        {status === 'ok' && <strong>{message}</strong>}
        {status === 'error' && (
          <span className="error">could not reach the backend. Is Flask running?</span>
        )}
      </p>
      <div>
        <label htmlFor="answer">Enter your answer: </label>
        <input
          id="answer"
          type="text"
          value={answer}
          onChange={handleAnswerChange}
          placeholder="Type your answer here"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </main>
  )
}

export default App
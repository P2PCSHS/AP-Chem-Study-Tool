import { useEffect, useState } from 'react'
import { getHello } from './api'

type Status = 'loading' | 'ok' | 'error'
type QuestionTopic = 'topic1' | 'topic2' | 'topic3' //These are the question types

function App() {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('loading')
  const [answer, setAnswer] = useState('') // State for the answer
  const [questionTopic, setQuestionTopic] = useState<QuestionTopic>('topic1') // State for question topic

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

  const handleQuestionTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTopic = e.target.value as QuestionTopic
    setQuestionTopic(selectedTopic)
    setAnswer('') // Reset the answer when the topic changes
  }

  const handleSubmit = () => {
    console.log('Answer submitted:', answer)
    console.log('Question topic:', questionTopic)
    // Add logic to validate or send the answer to the backend
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
        <label htmlFor="questionTopic">Select Question Topic: </label>
        <select id="questionTopic" value={questionTopic} onChange={handleQuestionTopicChange}>
          {/* Here is how you add to the dropdown */}
          <option value="topic1">Topic1</option>
          <option value="topic2">Topic2</option>
          <option value="topic3">Topic3</option>
        </select>
      </div>
      <div>
        <label htmlFor="answer">Enter your answer: </label>
        <input
          id="answer"
          type="text"
          value={answer}
          onChange={handleAnswerChange}
          placeholder="Type your answer here"
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </main>
  )
}

export default App
import { useEffect, useState } from 'react'

type Status = 'loading' | 'ok' | 'error'
type QuestionTopic = 'stoichiometry' | 'balancing' | 'molarity'

function App() {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('loading')
  const [questionTopic, setQuestionTopic] = useState<QuestionTopic>('stoichiometry')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState<string | null>(null)

  // Fetch the backend's hello message on load
  useEffect(() => {
    fetch('/api/hello')
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message)
        setStatus('ok')
      })
      .catch(() => setStatus('error'))
  }, [])

  // Fetch the question when the topic changes
  useEffect(() => {
    fetch(`/api/question/${questionTopic}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setQuestion('Error fetching question.')
        } else {
          setQuestion(data.question)
        }
      })
      .catch(() => setQuestion('Error fetching question.'))
  }, [questionTopic])

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value)
  }

  const handleQuestionTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuestionTopic(e.target.value as QuestionTopic)
    setAnswer('') // Reset the answer when the topic changes
    setResult(null) // Clear the result when the topic changes
  }

  const handleSubmit = () => {
    fetch('/api/check-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: questionTopic, answer }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === 'correct') {
          setResult('Correct!')
        } else if (data.result === 'incorrect') {
          setResult(`Incorrect. The correct answer is: ${data.correct_answer}`)
        } else {
          setResult('Error checking answer.')
        }
      })
      .catch(() => setResult('Error checking answer.'))
  }

  return (
    <main>
      <h1>AP Chem Study Tool</h1>
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
          <option value="stoichiometry">Stoichiometry</option>
          <option value="balancing">Balancing</option>
          <option value="molarity">Molarity</option>
        </select>
      </div>
      <div>
        <p><strong>Question:</strong> {question}</p>
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
      {result && <p><strong>Result:</strong> {result}</p>}
    </main>
  )
}

export default App
import { useState } from 'react'
import { calculateExpression } from '../utils/api'

export default function NaturalLanguageInput({ onSubmit }) {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (input.trim()) {
      setLoading(true)
      try {
        const result = await calculateExpression(input)
        onSubmit(input, result.result)
      } catch (error) {
        onSubmit(input, null, error.message)
      } finally {
        setLoading(false)
      }
      setInput('')
    }
  }

  const examples = [
    'sqrt(16)',
    '2^10',
    'sin(45)',
    '(100 + 50) * 2',
    'log(100)',
    '15 % of 200'
  ]

  const handleExample = async (example) => {
    setLoading(true)
    try {
      const result = await calculateExpression(example)
      onSubmit(example, result.result)
    } catch (error) {
      onSubmit(example, null, error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="natural-input">
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter expression (e.g., '2 + 2' or 'sqrt(16)')"
          className="input-field"
          disabled={loading}
          autoFocus
        />
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </form>

      <div className="examples">
        <h4>Try these expressions:</h4>
        <div className="example-buttons">
          {examples.map((ex, idx) => (
            <button
              key={idx}
              className="example-btn"
              onClick={() => handleExample(ex)}
              disabled={loading}
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

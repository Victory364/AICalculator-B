import { useState } from 'react'
import { aiSolve, solveSteps } from '../utils/api'
import './AIChat.css'

export default function AIChat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSteps, setShowSteps] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { type: 'user', content: input }
    setMessages([...messages, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await aiSolve(input)
      
      const answer = response.answer ?? response.result ?? response.finalResult ?? 'No answer'
      const botMessage = {
        type: 'assistant',
        content: answer,
        explanation: response.explanation,
        expression: response.expression,
        parsed: response.parsed,
        method: response.method
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage = {
        type: 'error',
        content: `Error: ${error.message}`
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleGetSteps = async (expression) => {
    setLoading(true)
    try {
      const response = await solveSteps(expression)
      
      const stepsMessage = {
        type: 'steps',
        expression: expression,
        steps: response.steps,
        finalResult: response.finalResult || response.result
      }

      setMessages(prev => [...prev, stepsMessage])
      setShowSteps(true)
    } catch (error) {
      const errorMessage = {
        type: 'error',
        content: `Error getting steps: ${error.message}`
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ai-chat">
      <div className="chat-header">
        <h2>AI Math Assistant</h2>
        <p className="chat-subtitle">Ask me anything about math!</p>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="emoji">🤖</div>
            <p>Ask me math questions or describe problems!</p>
            <p className="hint">e.g., "What's the square root of 144?" or "Calculate 25% of 500"</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`message message-${msg.type}`}>
              {msg.type === 'user' && (
                <div className="message-content">
                  <span>{msg.content}</span>
                </div>
              )}

              {msg.type === 'assistant' && (
                <div className="message-content">
                  <div className="result">{msg.content}</div>
                  {msg.explanation && (
                    <div className="explanation">{msg.explanation}</div>
                  )}
                  {msg.expression && (
                    <div className="expression">
                      <span className="label">Expression:</span> {msg.expression}
                    </div>
                  )}
                  {msg.parsed && msg.parsed !== msg.expression && (
                    <div className="parsed">
                      <span className="label">Parsed as:</span> {msg.parsed}
                    </div>
                  )}
                  <button 
                    className="steps-btn"
                    onClick={() => handleGetSteps(msg.expression || msg.parsed)}
                  >
                    Show Steps
                  </button>
                </div>
              )}

              {msg.type === 'steps' && (
                <div className="message-content steps">
                  <div className="steps-title">Step-by-Step Solution:</div>
                  {msg.steps.map((step, stepIdx) => (
                    <div key={stepIdx} className="step">
                      <span className="step-num">Step {step.step}:</span>
                      <span className="step-operation">{step.operation}</span>
                      {step.calculation && (
                        <div className="step-calc">{step.calculation}</div>
                      )}
                      {step.result !== null && (
                        <div className="step-result">= {step.result}</div>
                      )}
                    </div>
                  ))}
                  {msg.finalResult && (
                    <div className="final-result">
                      Final Answer: <strong>{msg.finalResult}</strong>
                    </div>
                  )}
                </div>
              )}

              {msg.type === 'error' && (
                <div className="message-content error">
                  <span>{msg.content}</span>
                </div>
              )}
            </div>
          ))
        )}

        {loading && (
          <div className="message message-assistant">
            <div className="loading">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me a math question..."
          className="input-field"
          disabled={loading}
        />
        <button type="submit" className="send-btn" disabled={loading}>
          {loading ? 'Processing...' : 'Send'}
        </button>
      </form>
    </div>
  )
}

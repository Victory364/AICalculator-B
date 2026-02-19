import { useState } from 'react'
import Display from './Display'
import TraditionalKeypad from './TraditionalKeypad'
import NaturalLanguageInput from './NaturalLanguageInput'
import './Calculator.css'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [inputMode, setInputMode] = useState('traditional') // 'traditional' or 'natural'
  const [history, setHistory] = useState([])

  const handleNumberClick = (num) => {
    if (display === '0' && num !== '.') {
      setDisplay(String(num))
    } else if (num === '.' && display.includes('.')) {
      return
    } else {
      setDisplay(display + num)
    }
  }

  const handleOperation = (op) => {
    const currentValue = parseFloat(display)
    
    if (previousValue === null) {
      setPreviousValue(currentValue)
    } else if (operation) {
      const result = calculateResult(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }
    
    setOperation(op)
    setDisplay('0')
  }

  const calculateResult = (prev, current, op) => {
    switch (op) {
      case '+': return prev + current
      case '-': return prev - current
      case '*': return prev * current
      case '/': return prev / current
      case '^': return Math.pow(prev, current)
      case '%': return prev % current
      default: return current
    }
  }

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display)
      const result = calculateResult(previousValue, currentValue, operation)
      const historyItem = `${previousValue} ${operation} ${currentValue} = ${result}`
      
      setDisplay(String(result))
      setHistory([...history, historyItem])
      setPreviousValue(null)
      setOperation(null)
    }
  }

  const handleScientificFunction = (func) => {
    const value = parseFloat(display)
    let result

    switch (func) {
      case 'sin': result = Math.sin(value * Math.PI / 180); break
      case 'cos': result = Math.cos(value * Math.PI / 180); break
      case 'tan': result = Math.tan(value * Math.PI / 180); break
      case 'sqrt': result = Math.sqrt(value); break
      case 'log': result = Math.log10(value); break
      case 'ln': result = Math.log(value); break
      case 'exp': result = Math.exp(value); break
      case 'factorial': result = factorial(value); break
      default: result = value
    }

    setDisplay(String(result.toFixed(10)))
    const historyItem = `${func}(${value}) = ${result.toFixed(10)}`
    setHistory([...history, historyItem])
  }

  const factorial = (n) => {
    if (n < 0) return NaN
    if (n === 0 || n === 1) return 1
    let result = 1
    for (let i = 2; i <= n; i++) result *= i
    return result
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
  }

  const handleNaturalLanguageInput = (expression, result, error) => {
    if (error) {
      setDisplay('Error')
      return
    }
    
    setDisplay(String(result.toFixed(10)))
    const historyItem = `${expression} = ${result.toFixed(10)}`
    setHistory([...history, historyItem])
  }

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  return (
    <div className="calculator">
      <div className="calculator-header">
        <h1>AI Scientific Calculator</h1>
      </div>

      <Display value={display} />

      <div className="mode-toggle">
        <button 
          className={inputMode === 'traditional' ? 'active' : ''} 
          onClick={() => setInputMode('traditional')}
        >
          Traditional
        </button>
        <button 
          className={inputMode === 'natural' ? 'active' : ''} 
          onClick={() => setInputMode('natural')}
        >
          Natural Language
        </button>
      </div>

      {inputMode === 'traditional' ? (
        <TraditionalKeypad
          onNumberClick={handleNumberClick}
          onOperation={handleOperation}
          onEquals={handleEquals}
          onScientific={handleScientificFunction}
          onClear={handleClear}
          onBackspace={handleBackspace}
        />
      ) : (
        <NaturalLanguageInput onSubmit={handleNaturalLanguageInput} />
      )}

      {history.length > 0 && (
        <div className="history">
          <h3>History</h3>
          <div className="history-list">
            {history.map((item, idx) => (
              <div key={idx} className="history-item">{item}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

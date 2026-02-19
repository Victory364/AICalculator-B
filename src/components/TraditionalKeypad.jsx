export default function TraditionalKeypad({ 
  onNumberClick, 
  onOperation, 
  onEquals, 
  onScientific,
  onClear,
  onBackspace 
}) {
  const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
  const operations = ['+', '-', '*', '/', '^', '%']
  const scientific = [
    { name: 'sin', label: 'sin' },
    { name: 'cos', label: 'cos' },
    { name: 'tan', label: 'tan' },
    { name: 'sqrt', label: '√' },
    { name: 'log', label: 'log' },
    { name: 'ln', label: 'ln' },
    { name: 'exp', label: 'eˣ' },
    { name: 'factorial', label: 'x!' }
  ]

  return (
    <div className="keypad">
      <div className="scientific-buttons">
        {scientific.map(sci => (
          <button
            key={sci.name}
            className="sci-btn"
            onClick={() => onScientific(sci.name)}
          >
            {sci.label}
          </button>
        ))}
      </div>

      <div className="button-grid">
        <button className="btn btn-clear" onClick={onClear}>C</button>
        <button className="btn btn-backspace" onClick={onBackspace}>⌫</button>
        <button className="btn btn-operation" onClick={() => onOperation('/')}>÷</button>
        <button className="btn btn-operation" onClick={() => onOperation('*')}>×</button>

        {numbers.map((num, idx) => (
          <button
            key={num}
            className={`btn ${(idx + 1) % 4 === 0 ? '' : ''}`}
            onClick={() => onNumberClick(num)}
          >
            {num}
          </button>
        ))}

        <button className="btn" onClick={() => onNumberClick('.')}>.</button>
        <button className="btn btn-operation" onClick={() => onOperation('^')}>^</button>

        {operations.slice(0, 4).map(op => (
          <button
            key={op}
            className="btn btn-operation"
            onClick={() => onOperation(op)}
          >
            {op === '/' ? '÷' : op === '*' ? '×' : op}
          </button>
        ))}

        <button className="btn btn-equals" onClick={onEquals}>=</button>
      </div>
    </div>
  )
}

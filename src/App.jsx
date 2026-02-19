import { useState } from 'react'
import Calculator from './components/Calculator'
import AIChat from './components/AIChat'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('calculator')

  return (
    <div className="app-container">
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'calculator' ? 'active' : ''}`}
          onClick={() => setActiveTab('calculator')}
        >
          Calculator
        </button>
        <button 
          className={`tab-btn ${activeTab === 'ai-chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('ai-chat')}
        >
          AI Assistant
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'calculator' && <Calculator />}
        {activeTab === 'ai-chat' && <AIChat />}
      </div>
    </div>
  )
}

export default App

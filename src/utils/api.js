// Remove trailing slash automatically to avoid //api problems
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'https://backend-cal-e3dk.onrender.com'
).replace(/\/$/, '')
console.log('API_BASE_URL:', API_BASE_URL)

export async function calculateExpression(expression) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ expression }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Calculate error:', error)
    throw error
  }
}

export async function aiSolve(question) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai-solve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('AI solve error:', error)
    throw error
  }
}

export async function solveSteps(expression) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/solve-steps`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ expression }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Solve steps error:', error)
    throw error
  }
}

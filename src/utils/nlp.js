export function parseNaturalLanguage(input) {
  // Simple natural language parsing
  // Converts phrases like "15% of 200" to "200 * 0.15"
  
  let expression = input.toLowerCase().trim()
  
  // Handle percentage
  expression = expression.replace(/(\d+(?:\.\d+)?)\s*%\s*of\s*(\d+(?:\.\d+)?)/g, '($2 * $1 / 100)')
  
  // Handle "squared" and "cubed"
  expression = expression.replace(/(\d+(?:\.\d+)?)\s*squared/g, '($1 ^ 2)')
  expression = expression.replace(/(\d+(?:\.\d+)?)\s*cubed/g, '($1 ^ 3)')
  
  // Handle word operations
  expression = expression.replace(/\bplus\b/g, '+')
  expression = expression.replace(/\bminus\b/g, '-')
  expression = expression.replace(/\btimes\b/g, '*')
  expression = expression.replace(/\bdivided by\b/g, '/')
  expression = expression.replace(/\bto the power of\b/g, '^')
  expression = expression.replace(/\b sqrt of\b/g, 'sqrt(')
  
  return expression
}

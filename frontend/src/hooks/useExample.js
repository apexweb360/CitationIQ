// hooks/useExample.js — State + data-fetching logic
import { useState, useEffect } from 'react'
import { fetchExample } from '../services/exampleService'

export function useExample() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchExample()
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}

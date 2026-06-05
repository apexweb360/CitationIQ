// pages/ExamplePage.jsx — Thin page, delegates to hooks and components
import { useExample } from '../hooks/useExample'

export default function ExamplePage() {
  const { data, loading, error } = useExample()
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  return <div>{data?.message}</div>
}

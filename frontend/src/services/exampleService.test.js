// exampleService.test.js — Frontend unit test stub
// Run: npm test

import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('exampleService', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('throws a meaningful error on API failure', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 })
    const { fetchExample } = await import('./exampleService')
    await expect(fetchExample()).rejects.toThrow('API error: 500')
  })
})

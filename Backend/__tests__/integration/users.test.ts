import request from 'supertest'
import faker from 'faker'
import app from '../../src/app'

describe('Users', () => {
  it('should return a list of GitHub users', async () => {
    const response = await request(app).get('/api/users')

    expect(response.status).toBe(200)
  })

  it('should return a list of GitHub users using since param to pagination', async () => {
    const response = await request(app).get(
      `/api/users?since=${faker.random.number()}`
    )

    expect(response.status).toBe(200)
  })

  it('should return the link for the next page.', async () => {
    const response = await request(app).get('/api/users')

    expect(response.header).toHaveProperty('x-next-page')
  })
})

describe('Users Details', () => {
  it('should return the details of a GitHub user.', async () => {
    const login = 'leandher'

    const response = await request(app).get(`/api/users/${login}/details`)

    expect(response.status).toBe(200)
  })

  it('should not return the details of a invalid GitHub user.', async () => {
    const login = faker.internet.userName('leandher')

    const response = await request(app).get(`/api/users/${login}/details`)

    expect(response.status).toBe(404)
  })
})

describe('Users Repos', () => {
  it('should return a list with all user repositories', async () => {
    const login = 'leandher'

    const response = await request(app).get(`/api/users/${login}/repos`)

    expect(response.status).toBe(200)
  })

  it('should not return a list with all user repositories of a invalid user', async () => {
    const login = faker.internet.userName('leandher')

    const response = await request(app).get(`/api/users/${login}/repos`)

    expect(response.status).toBe(404)
  })
})

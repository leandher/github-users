import { Request, Response } from 'express'

import api from '../config/api'
import { parse } from '../utils/url'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const { since } = req.query
      const response = await api.get(`/users?since=${since}`)
      const {
        data,
        headers: { link },
        status
      } = response

      if (status !== 200) return res.status(status).send(data)

      const users = data

      const parsed = parse(link)

      const nextPage = parsed.next?.since

      res.header('X-Next-Page', nextPage)

      return res.json(users)
    } catch (error) {
      return res.status(500).send(error)
    }
  }

  public async details (req: Request, res: Response): Promise<Response> {
    try {
      const { username } = req.params
      const response = await api.get(`/users/${username}`)
      const { status, data } = response

      if (status !== 200) return res.send(data).status(status)
      const details = data

      return res.json(details)
    } catch (error) {
      return res.send(error).status(500)
    }
  }

  public async repos (req: Request, res: Response): Promise<Response> {
    try {
      const { username } = req.params
      const response = await api.get(`/users/${username}/repos`)
      const { status, data } = response
      if (status !== 200) return res.status(status).send(data)
      const repos = response.data

      return res.json(repos)
    } catch (error) {
      return res.send(error).status(500)
    }
  }
}

export default new UserController()

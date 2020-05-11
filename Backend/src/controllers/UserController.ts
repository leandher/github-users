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
        headers: { link }
      } = response

      const users = data

      const parsed = parse(link)

      const nextPage = parsed.next?.since

      res.header('X-Next-Page', nextPage)

      return res.json(users)
    } catch (error) {
      return res.status(error?.response?.status || 400).json(error)
    }
  }

  public async details (req: Request, res: Response): Promise<Response> {
    try {
      const { username } = req.params
      const response = await api.get(`/users/${username}`)
      const { data } = response
      const details = data

      return res.json(details)
    } catch (error) {
      return res.status(error?.response?.status || 400).json(error)
    }
  }

  public async repos (req: Request, res: Response): Promise<Response> {
    try {
      const { username } = req.params
      const response = await api.get(`/users/${username}/repos`)
      const { data } = response

      const repos = data

      return res.json(repos)
    } catch (error) {
      return res.status(error?.response?.status || 400).json(error)
    }
  }
}

export default new UserController()

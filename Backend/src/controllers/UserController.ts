import { Request, Response } from 'express'

import api from '../config/api'
import { parse } from '../utils/url'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    const { since } = req.query
    const response = await api.get(`/users?since=${since}`)
    const users = response.data
    const { link } = response.headers

    const parsed = parse(link)

    const nextPage = parsed.next?.since

    res.setHeader('X-Next-Page', nextPage)

    return res.json(users)
  }

  public async details (req: Request, res: Response): Promise<Response> {
    const { username } = req.params
    const response = await api.get(`/users/${username}`)
    const user = response.data

    return res.json(user)
  }

  public async repos (req: Request, res: Response): Promise<Response> {
    const { username } = req.params
    const response = await api.get(`/users/${username}/repos`)
    const user = response.data

    return res.json(user)
  }
}

export default new UserController()

import { Router } from 'express'
import UserController from './controllers/UserController'

const routes = Router()
routes.get('/api/users', UserController.index)
routes.get('/api/users/:username/details', UserController.details)
routes.get('/api/users/:username/repos', UserController.repos)

routes.get('/', (req, res) => res.send('Server built with Typescript + Node'))

export default routes

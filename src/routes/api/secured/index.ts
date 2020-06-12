import { Router } from 'express'
import users from './users'
import customers from './customers'
import associations from './associations'
import tickets from './tickets'

const api = Router()

api.use('/tickets', tickets)
api.use('/users', users)
api.use('/customers',customers)
api.use('/associations',associations)

export default api

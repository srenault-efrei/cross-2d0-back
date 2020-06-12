import { Router, Request, Response } from 'express'
import { error, success } from '../../core/helpers/response'
import { BAD_REQUEST, CREATED, OK } from '../../core/constants/api'
import Category from '@/core/models/Category'

const api = Router()



api.get('/', async (req: Request, res: Response) => {
  try {
    const cats = await Category.find()
    res.status(CREATED.status).json(success(cats))
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const cat = await Category.findOne(id)
    res.status(OK.status).json(success(cat))
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

export default api
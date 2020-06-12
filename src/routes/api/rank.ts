import { Router, Request, Response } from 'express'
import { error, success } from '../../core/helpers/response'
import { BAD_REQUEST, CREATED, OK } from '../../core/constants/api'
import Rank from '@/core/models/Rank'

const api = Router()



api.get('/', async (req: Request, res: Response) => {
  try {
    const ranks = await Rank.find()
    res.status(CREATED.status).json(success(ranks))
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const rank = await Rank.findOne(id)
    res.status(OK.status).json(success(rank))
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

export default api
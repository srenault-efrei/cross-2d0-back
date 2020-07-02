import { Router, Request, Response } from 'express'
import { error, success } from '../../../core/helpers/response'
import { BAD_REQUEST, CREATED, OK } from '../../../core/constants/api'
import Message from '@/core/models/Message'

const api = Router()



api.get('/', async (req: Request, res: Response) => {
  try {
    const mess = await Message.find({relations:['recipient','sender']})
    res.status(CREATED.status).json(success(mess))
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const mess = await Message.findOne(id,{relations:['recipient','sender']})
    res.status(OK.status).json(success(mess))
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

export default api
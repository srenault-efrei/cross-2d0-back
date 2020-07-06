import { Router, Request, Response } from 'express'
import { isEmpty } from 'lodash'
import { error, success } from '../../../core/helpers/response'
import { BAD_REQUEST, CREATED, OK } from '../../../core/constants/api'
import User from '@/core/models/User'
import { getRepository } from "typeorm";
import Message from '@/core/models/Message'


const api = Router()

api.post('/:id/messages/', async (req: Request, res: Response) => {
    const fields = ['content','recipient']
    const { id } = req.params
    try {
      const missings = fields.filter((field: string) => !req.body[field])
  
      if (!isEmpty(missings)) {
        const isPlural = missings.length > 1
        throw new Error(`Field${isPlural ? 's' : ''} [ ${missings.join(', ')} ] ${isPlural ? 'are' : 'is'} missing`)
      }
      const user : User | undefined = await User.findOne(id)
  
      if(user){
        const {content,recipient} = req.body
        const message= new Message()
        message.content= content
        message.recipient = recipient
        message.sender = user
        await message.save()
        res.status(CREATED.status).json(success(message))
      }
      else{
        throw new Error('User incorrect')
  
      }  
    } catch (err) {
      res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    }
  })
  
  api.get('/:id/messages/:recipient', async (req: Request, res: Response) => {
    const { id,recipient } = req.params
    try {
      const user : User | undefined = await User.findOne(id)
  
      if(user){
        const messages = await getRepository(Message)
        .createQueryBuilder("message")
        .leftJoinAndSelect("message.recipient", "recipient")
        .leftJoinAndSelect("message.sender", "sender")
        .where("message.recipient = :recipient", { recipient })
        .andWhere("message.sender = :user", {  user:user.id })
        .orWhere("message.recipient = :user", {  user:user.id })
        .andWhere("message.sender = :recipient", {  recipient })
        .getMany()
        res.status(CREATED.status).json(success(messages))
      }
      else{
        throw new Error('User incorrect')
  
      }  
    } catch (err) {
      res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    }
  })

  api.get('/:id/messages/', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const user : User | undefined = await User.findOne(id)
  
      if(user){
        const messages = await getRepository(Message)
        .createQueryBuilder("message")
        .leftJoinAndSelect("message.recipient", "recipient")
        .leftJoinAndSelect("message.sender", "sender")
        .where("message.sender = :user", { user:user.id })
        .orWhere("message.recipient = :user", { user:user.id })
        .getMany()
        res.status(CREATED.status).json(success(messages))
      }
      else{
        throw new Error('User incorrect')
  
      }  
    } catch (err) {
      res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    }
  })


  

export default api

import { Router, Request, Response } from 'express'
import { isEmpty } from 'lodash'
import { error, success } from '../../../core/helpers/response'
import { BAD_REQUEST, CREATED, OK } from '../../../core/constants/api'
import jwt from 'jsonwebtoken'
import { getRepository } from "typeorm";
import Ticket from '@/core/models/Ticket'
import Category from '@/core/models/Category'
import Customer from '@/core/models/Customer'
import Rank from '@/core/models/Rank'


const api = Router()

api.post('/', async (req: Request, res: Response) => {
  const fields = ['title','type','category','description', 'imagesFiles']

  try {
    const missings = fields.filter((field: string) => !req.body[field])

    if (!isEmpty(missings)) {
      const isPlural = missings.length > 1
      throw new Error(`Field${isPlural ? 's' : ''} [ ${missings.join(', ')} ] ${isPlural ? 'are' : 'is'} missing`)
    }

    const { title,type, description,category,imagesFiles } = req.body
    const ticket= new Ticket()
    ticket.title = title
    ticket.type = type
    ticket.description = description
   
    // Permet de définir le rank du customer en fonction du nombre de tickets créés
    const customer: Customer | undefined = await Customer.findOne(ticket.user?.id)
    if(customer && customer.tickets){
      let rankId: number = customer.calculRank(customer.tickets.length)   
      customer.rank = await Rank.findOne(rankId)
      await customer.save()
    }

    const cat : Category | undefined = await Category.findOne(category)
    if (cat){
      ticket.category=cat 
    }
    ticket.imagesFiles = imagesFiles
    await ticket.save()

    res.status(CREATED.status).json(success(ticket))
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.put('/:id', async (req: Request, res: Response) => {

  const fields = ['title','type','category','state','description', 'imagesFiles','localisation']
  try {
    const { id } = req.params
    const missings = fields.filter((field: string) => !req.body[field])

    if (!isEmpty(missings)) {
      const isPlural = missings.length > 1
      throw new Error(`Field${isPlural ? 's' : ''} [ ${missings.join(', ')} ] ${isPlural ? 'are' : 'is'} missing`)
    }
    const { title,type, description,state,category,imagesFiles,localisation } = req.body
    const ticket = await Ticket.findOne(id)
    if (ticket){
      ticket.title = title
      ticket.type = type
      ticket.state=state
      ticket.description= description
      ticket.localisation= localisation
      ticket.imagesFiles= imagesFiles
      const cat : Category | undefined = await Category.findOne(category)
      if (cat){
        ticket.category=cat 
      }
      await ticket.save()
      res.status(OK.status).json(success(ticket))
    }
    else {
      res.status(BAD_REQUEST.status).json( {'err':'ticket inexistant'})
    }
  
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.get('/', async (req: Request, res: Response) => {
  try {

    const tickets = await getRepository(Ticket)
    .createQueryBuilder("ticket")
    .leftJoinAndSelect("ticket.user", "user")
    .leftJoinAndSelect("ticket.category", "category")
    .getMany();
    res.status(CREATED.status).json(success(tickets))

  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const ticket = await Ticket.findOne(id,{ relations: ["user","category"] })
    res.status(OK.status).json(success(ticket))
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

export default api

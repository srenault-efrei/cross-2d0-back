import { Router, Request, Response } from 'express'
import { isEmpty } from 'lodash'
import bcrypt from 'bcryptjs'
import { error, success } from '../../../core/helpers/response'
import { BAD_REQUEST, CREATED, OK } from '../../../core/constants/api'
import jwt from 'jsonwebtoken'
import Customer from '@/core/models/Customer'
import Rank from '@/core/models/Rank'
import User from '@/core/models/User'
import Ticket from '@/core/models/Ticket'
import uploadFile from '@/core/services/amazonS3'
import { getRepository } from "typeorm";
import Category from '@/core/models/Category'
import { TranscribeService } from 'aws-sdk'


const api = Router()

api.post('/', async (req: Request, res: Response) => {
  const fields = ['firstname', 'lastname', 'gender', 'email', 'password', 'passwordConfirmation']

  try {
    const missings = fields.filter((field: string) => !req.body[field])

    if (!isEmpty(missings)) {
      const isPlural = missings.length > 1
      throw new Error(`Field${isPlural ? 's' : ''} [ ${missings.join(', ')} ] ${isPlural ? 'are' : 'is'} missing`)
    }

    const { firstname, lastname, email, gender, password, passwordConfirmation } = req.body

    if (password !== passwordConfirmation) {
      throw new Error("Password doesn't match")
    }

    const customer = new Customer()
    let rank = await Rank.findOne(1)

    customer.firstname = firstname,
      customer.lastname = lastname,
      customer.email = email,
      customer.gender = gender
    customer.password = password
    customer.rank = rank

    await customer.save()

    const payload = { id: customer.id, firstname }
    const token = jwt.sign(payload, process.env.JWT_ENCRYPTION as string)

    res.status(CREATED.status).json(success(customer, { token }))
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.post('/:id/tickets', async (req: Request, res: Response) => {
  const fields = ['title','type','category','description', 'imagesFiles']
  const { idUser } = req.params

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
    const customer: Customer | undefined = await Customer.findOne(idUser)
    if(customer && customer.tickets){
      customer.tickets.push(ticket)
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

api.put('/:id/', async (req: Request, res: Response) => {

  const fields = ['firstname', 'lastname', 'email', 'gender', 'geolocalisation',]
  try {
    const { idUser } = req.params
    const missings = fields.filter((field: string) => !req.body[field])

    if (!isEmpty(missings)) {
      const isPlural = missings.length > 1
      throw new Error(`Field${isPlural ? 's' : ''} [ ${missings.join(', ')} ] ${isPlural ? 'are' : 'is'} missing`)
    }
    const { firstname, lastname, email, rank, gender, geolocalisation, latitude, longitiude } = req.body
    const customer = await Customer.findOne(idUser)

    if (customer) {
      if (req.body.password) {
        customer.password = bcrypt.hashSync(req.body.password, User.SALT_ROUND)
      }
      if (req.body.note) {
        customer.note = req.body.note
      }
      if (req.body.filename && req.body.key) {
        uploadFile(req.body.filename, req.body.key)
        customer.avatarFile = `https://trocifyfile.s3.eu-west-3.amazonaws.com/${req.body.key}`
      }
      if(customer.tickets){
        let rankId: number = customer.calculRank(customer.tickets.length)   
        customer.rank = await Rank.findOne(rankId)
      }
      customer.firstname = firstname
      customer.lastname = lastname
      customer.gender = gender
      customer.email = email
      customer.longitude = longitiude
      customer.latitude = latitude
      customer.geolocalisation = geolocalisation as boolean
      await customer.save()
      res.status(OK.status).json(success(customer))
    }
    else {
      res.status(BAD_REQUEST.status).json({ 'err': 'customer inexistant' })
    }

  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})



api.get('/', async (req: Request, res: Response) => {
  try {
    const customers = await getRepository(Customer)
      .createQueryBuilder("customer")
      .leftJoinAndSelect("customer.rank", "rank")
      .leftJoinAndSelect("customer.tickets", "tickets")
      .orderBy("customer.totalTickets", "DESC")
      .getMany()
    res.status(CREATED.status).json(success(customers))

  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))

  }
})


// api.get('/', async (req: Request, res: Response) => {
//   try {
//     const customers = await Customer.find({ relations: ["rank","tickets"] })
//     res.status(CREATED.status).json(success(customers))
//   } catch (err) {
//     res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
//   }
// })

api.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const customer = await getRepository(Customer)
      .createQueryBuilder("customer")
      .leftJoinAndSelect("customer.rank", "rank")
      .leftJoinAndSelect("customer.tickets", "tickets")
      .orderBy("customer.totalTickets", "DESC")
      .where("customer.id = :id", { id })
      .getMany()
    res.status(CREATED.status).json(success(customer))

  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))

  }
})

export default api

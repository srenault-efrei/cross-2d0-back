import { Router, Request, Response } from 'express'
import { isEmpty } from 'lodash'
import { error, success } from '../../core/helpers/response'
import { BAD_REQUEST, CREATED, OK } from '../../core/constants/api'
import jwt from 'jsonwebtoken'
import { Gender, Prisma, PrismaClient } from '@prisma/client'
import passport from 'passport'
import bcrypt from 'bcryptjs'

const prisma: PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
> = new PrismaClient()

const api = Router()

api.post('/signup', async (req: Request, res: Response) => {
  const fields = ['firstname', 'lastname', 'birthdate', 'gender', 'email', 'password', 'passwordConfirmation']

  try {
    const missings = fields.filter((field: string) => !req.body[field])

    if (!isEmpty(missings)) {
      const isPlural = missings.length > 1
      throw new Error(`Field${isPlural ? 's' : ''} [ ${missings.join(', ')} ] ${isPlural ? 'are' : 'is'} missing`)
    }
    const { firstname, lastname, email, gender, password, passwordConfirmation, birthdate } = req.body
    if (password !== passwordConfirmation) {
      throw new Error("Password doesn't match")
    }

    if (gender !== Gender.MALE && gender !== Gender.FEMALE) {
      throw new Error('gender is not correct')
    }
    const encryptedPassword = bcrypt.hashSync(password, 8)

    const user = await prisma.user.create({
      data: {
        email,
        encryptedPassword,
        lastname,
        firstname,
        birthdate,
        gender,
      },
    })

    const payload = { id: user.id, firstname }
    const token = jwt.sign(payload, process.env.JWT_ENCRYPTION as string)

    res.status(CREATED.status).json(success(user, { token }))
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.post('/signin', async (req: Request, res: Response) => {
  const authenticate = passport.authenticate('local', { session: false }, (errorMessage, user) => {
    if (errorMessage) {
      res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, new Error(errorMessage)))
      return
    }

    const payload = { id: user.id, firstname: user.firstname }
    const token = jwt.sign(payload, process.env.JWT_ENCRYPTION as string)

    res.status(OK.status).json(success(user, { token }))
  })

  authenticate(req, res)
})

export default api

import { Router, Request, Response } from 'express'
import { isEmpty } from 'lodash'
import { error, success } from '@/core/helpers/response'
import { BAD_REQUEST, CREATED } from '@/core/constants/api'
import { Prisma, PrismaClient } from '@prisma/client'

const api = Router()

const prisma: PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
> = new PrismaClient()

api.post('/:id/task/create', async (req: Request, res: Response) => {
  const fields = ['content']

  try {
    const id = parseInt(req.params.id)
    const missings = fields.filter((field: string) => !req.body[field])

    if (!isEmpty(missings)) {
      const isPlural = missings.length > 1
      throw new Error(`Field${isPlural ? 's' : ''} [ ${missings.join(', ')} ] ${isPlural ? 'are' : 'is'} missing`)
    }
    const { content } = req.body

    const user = await prisma.user.update({
      where: { id },
      data: { tasks: { create: { content } } },
    })

    res.status(CREATED.status).json({ message: `Task is created for the user ${user.id}` })
  } catch (err) {
    console.log(err)
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.get('/:id/tasks', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        tasks: true,
      },
    })

    res.status(CREATED.status).json(success(user))
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.put('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: { isComplete: true },
    })

    res.status(CREATED.status).json(success(task))
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.delete('/delete/tasks/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)

    const task = await prisma.task.delete({
      where: {
        id,
      },
    })

    res.status(CREATED.status).json(success(task))
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

export default api

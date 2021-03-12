import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import dotenv from 'dotenv'
import { Prisma, PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma: PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
> = new PrismaClient()

dotenv.config()

/**
 * Local strategy
 */

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, next) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
          next(`Sorry email ${email} dosen't exist`, null)
          return
        }
        if (!bcrypt.compareSync(password, user.encryptedPassword)) {
          next(`Sorry password is incorrect`, null)
          return
        }

        next(null, user)
      } catch (err) {
        next(err.message)
      }
    }
  )
)

/**
 * JSON Web Token strategy
 */

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ENCRYPTION as string,
    },
    async (jwtPayload, next) => {
      try {
        const { id } = jwtPayload

        const user = await prisma.user.findUnique({ where: { id } })

        if (!user) {
          next(`User ${id} doesn't exist`)
          return
        }

        next(null, user)
      } catch (err) {
        next(err.message)
      }
    }
  )
)

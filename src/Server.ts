import express, { Express } from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'

import { mlog } from '@/core/libs/utils'

import '@/core/middlewares/passport'

import api from '@/routes/api'

export default class Server {
  private _host: string
  private _port: number
  private _app: Express | null = null

  public constructor(host: string, port: number) {
    this._host = host
    this._port = port
  }

  public async run(): Promise<void> {
    this._app = express()

    // this._app.use(passport.initialize())
    this._app.use(bodyParser.json())
    this._app.use(bodyParser.urlencoded({ extended: false }))

    this._app.use('/api', api)

    this._app?.listen(this._port, () => {
      mlog(`✨ Server is listening on ${this._host}:${this._port}`)
    })
  }
}

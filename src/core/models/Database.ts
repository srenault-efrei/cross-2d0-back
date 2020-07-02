import dotenv from 'dotenv'
import { createConnection, Connection } from 'typeorm'

import User from './User'
import Rank from './Rank'
import Customer from './Customer'
import Association from './Association'
import Message from './Message'
import Ticket from './Ticket'
import Category from './Category'
import { addRanks } from '@/core/fixtures/rank'
import { addCategories } from '../fixtures/category'
import { addCustomers } from '../fixtures/customer'
import { addAssociations } from '../fixtures/association'
import { addTickets } from '../fixtures/tickets'
import { addMessages } from '../fixtures/messages'




export default class Database {
  private static _instance: Database | null = null
  private _connection: Connection | null = null

  private constructor() { }

  public static getInstance(): Database {
    if (!Database._instance) {
      Database._instance = new Database()
    }

    return Database._instance
  }

  public addFixtures(): void {

    addRanks()
    addCategories()

    setTimeout(async function () {
      addTickets()
    }, 1000);

    setTimeout(async function () {
      addCustomers()
      addAssociations()
    }, 2000);

    setTimeout(async function () {
      addMessages()
    }, 3000);

  }

  public async authenticate(): Promise<Connection | never> {
    dotenv.config()

    const founded = (process.env.DATABASE_URL as string).match(/^(postgres):\/\/(.*):(.*)@(.*):(\d+)\/(.*)$/)
    if (!founded) {
      throw new Error('Please check your DATABASE_URL value')
    }

    const [, , username, password, host, port, database] = founded


    this._connection = await createConnection({
      type: 'postgres',
      host,
      port: parseInt(port),
      username,
      password,
      database,
      entities: [User, Rank, Customer, Association, Message, Ticket, Category],
      dropSchema: true,
      synchronize: true,
      logging: false,
    })

    this.addFixtures()
    return this._connection
  }
}

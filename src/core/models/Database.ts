import dotenv from 'dotenv'
import { createConnection, Connection } from 'typeorm'

import User from './User'
import Rank from './Rank'
import Customer from './Customer'
import Association from './Association'
import Message from './Message'
import Ticket, { TicketType, TicketState } from './Ticket'
import Category from './Category'
import { addRanks } from '@/core/fixtures/rank'
import { addCategories } from '../fixtures/category'
import { addUsers } from '../fixtures/user'



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

    // add fixtures
    addRanks()
    addCategories()

    // add a new ticket for testing

   setTimeout(async function () {
      const t = new Ticket()
      t.title = 'Test'
      t.state = TicketState.FIRST_STATE
      t.type = TicketType.SECONND_TYPE
      t.category =  await Category.findOne(1)
      t.latitude = 48.77632508218089
      t.longitude = 2.335073365204421
      t.description = 'test ticket'
      t.imagesFiles =[ '../src/img/photo1.png', '..src/img/photo2.png']
      t.save()

    }, 3000);

    setTimeout(async function (){
      addUsers()
    },4000);
 


    return this._connection
  }
}

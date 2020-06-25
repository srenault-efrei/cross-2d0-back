import {Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  TableInheritance,
  BeforeInsert,
  OneToMany,
  AfterUpdate,
} from 'typeorm'

import bcrypt from 'bcryptjs'
import Message from './Message'
import Ticket from './Ticket'

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export default class User extends BaseEntity {

  public static SALT_ROUND = 8

  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ nullable: false, unique: true })
  email!: string

  @Column({ nullable: false })
  password!: string

  @Column({ type: "float", nullable: true })
  latitude!: number

  @Column({ type: "float", nullable: true })
  longitude!: number

  @Column({ nullable: true })
  avatarFile!: string

  @Column({ nullable: false, default: false })
  geolocalisation!: boolean

  @CreateDateColumn()
  createdAt!: string

  @UpdateDateColumn()
  updatedAt!: string

  @OneToMany( type => Message, message => message.sender )
  senderMessages!: Message[]

  @OneToMany( type => Message, message => message.recipient )
  recipientMessages!: Message[]

  @OneToMany( type => Ticket, ticket => ticket.user)
  tickets!: Ticket[] | undefined

  /**
   * Hooks
   */
  @BeforeInsert()
  public hashPassword(): void | never {
    if (!this.password) {
      throw new Error('Password is not defined')
    }

    this.password = bcrypt.hashSync(this.password, User.SALT_ROUND)
  }

  /**
   * Methods
   */
  public checkPassword(uncryptedPassword: string): boolean {
    return bcrypt.compareSync(uncryptedPassword, this.password)
  }

  public toJSON(): User {
    const json: User = Object.assign({}, this)
    delete json.password
    return json
  }
}

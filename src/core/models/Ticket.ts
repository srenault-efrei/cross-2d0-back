import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn

} from 'typeorm'

import Category from './Category'
import User from './User'


export enum TicketType {
    FIRST_TYPE = 'barter',
    SECONND_TYPE = 'donation',
}

export enum TicketState {
    FIRST_STATE = 'open',
    SECOND_STATE = 'waiting',
    THIRD_STATE = 'close'
}

@Entity()
export default class Ticket extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: false })
    title!: string

    @Column({ nullable: false })
    description!: string

    @Column({ type: "simple-array", nullable: false })
    imagesFiles!: string[]

    @Column({ type: "text", nullable: false })
    type!: TicketType

    
    @Column({ type: "text", nullable: false })
    localisation!: string

    @Column({ type: "text", nullable: false, default: TicketState.FIRST_STATE })
    state!: TicketState

    @CreateDateColumn()
    createdAt!: string

    @UpdateDateColumn()
    updatedAt!: string

    @ManyToOne(type => Category, category => category.tickets)
    category!: Category | undefined

    @ManyToOne( type => User, user => user.tickets)
    user!: User | undefined

    public toJSON(): Ticket {
        const json: Ticket = Object.assign({}, this)
        return json
      }

}
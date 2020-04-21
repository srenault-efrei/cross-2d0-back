import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BaseEntity,    
} from 'typeorm'

import Category from './Category'


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

    @Column({ type: "float", nullable: false })
    longitude!: number

    @Column({ type: "float", nullable: false })
    latitude!: number

    @Column({ nullable: false })
    imageFile!: string

    @Column({ type: "text", nullable: false })
    type!: TicketType

    @Column({ type: "text", nullable: false })
    state!: TicketState 

    @ManyToOne( type => Category, category => category.tickets )
    category!: Category | undefined

}
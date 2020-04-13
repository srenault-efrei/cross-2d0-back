import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany
} from 'typeorm'

import Ticket from './Ticket'

export enum title{
    FIRST_TITLE = 'Real estate',
    SECOND_TITLE = 'Dress'
}

@Entity()
export default class Category extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: false })
    title!: string

    @OneToMany( type => Ticket, ticket => ticket.category )
    tickets!: Ticket[]
}
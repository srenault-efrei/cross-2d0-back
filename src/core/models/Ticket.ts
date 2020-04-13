import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BaseEntity,    
} from 'typeorm'

import Category from './Category'


export enum type {
    FIRST_TYPE = 'barter',
    SECONND_TYPE = 'donation',
}

export enum state {
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

    @Column({ nullable: true })
    description!: string

    @Column({ nullable: false })
    mapPoint!: string

    @Column({ nullable: false })
    imageFile!: string

    @Column({ nullable: false })
    type!: string

    @Column({ nullable: false })
    state!: string

    @ManyToOne( type => Category, category => category.tickets )
    category!: Category | undefined

}
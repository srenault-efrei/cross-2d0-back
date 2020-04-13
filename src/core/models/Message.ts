import {
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    BaseEntity
} from 'typeorm'

import User from './User'

@Entity()
export default class Message extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne( type => User, user => user.senderMessages )
    sender!: User | undefined

    @ManyToOne( type => User, user => user.recipientMessages )
    recipient!: User | undefined

    @UpdateDateColumn()
    updatedAt!: string
}
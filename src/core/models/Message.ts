import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    Column,
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

    @Column({ nullable: false })
    content!: string

    @CreateDateColumn()
    createdAt!: string

    
    public toJSON(): Message {
        const json: Message = Object.assign({}, this)
        return json
      }
}
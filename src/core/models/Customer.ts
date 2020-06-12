import{
    Column,
    ChildEntity,
    ManyToOne,
} from 'typeorm'

import User from './User'
import Rank from './Rank'

export enum CustomerGender {
    Man = 'homme',
    Woman = 'femme',
}

@ChildEntity()
export default class Customer extends User{

  
    @Column({ nullable: false })
        firstname!: string
        
    @Column({ nullable: false })
        lastname!: string  
        
    @Column({type: "text", nullable: false })
        gender!: CustomerGender   

    @Column({ nullable: true })
        note!: number    
    
    @ManyToOne( type => Rank, rank => rank.customers)
        rank!: Rank | undefined

    
    public toJSON(): Customer {
        const json: Customer = Object.assign({}, this)
        delete json.password
        return json
    }
    }

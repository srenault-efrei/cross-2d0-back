import{
    Column,
    ChildEntity,
    ManyToOne,
} from 'typeorm'

import User from './User'
import Rank from './Rank'

@ChildEntity()
export default class Customer extends User{

  
    @Column({ nullable: false })
        firstname!: string
        
    @Column({ nullable: false })
        lastname!: string  
        
    @Column({ nullable: false })
        gender!: string   

    @Column({ nullable: true })
        note!: number    
    
    @ManyToOne( type => Rank, rank => rank.customers )    
        rank!: Rank | undefined
    }

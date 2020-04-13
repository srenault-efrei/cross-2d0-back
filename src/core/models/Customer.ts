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
        firstName!: string
        
    @Column({ nullable: false })
        lastName!: string  
        
    @Column({ nullable: false })
        gender!: string   

    @Column({ nullable: false })
        note!: number    
    
    @ManyToOne( type => Rank, rank => rank.customers )    
        rank!: Rank | undefined
    }

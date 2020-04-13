import{
    Entity,    
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    BaseEntity,
} from 'typeorm'

import Customer from './Customer'

@Entity()
export default class Rank extends BaseEntity{

    @PrimaryGeneratedColumn()
        id!: number

    @Column({ nullable: false })
        title!: string
        
    @Column({ nullable: false })
        pointStart!: number  
        
    @Column({ nullable: false })
        pointEnd!: number 
        
    @OneToMany( type => Customer, customer => customer.rank ) 
        customers!: Customer[];
    }


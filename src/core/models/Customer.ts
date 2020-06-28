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
    
    @Column({nullable: false })
    totalTickets!: number  
    
    @Column({ nullable: true })
        note!: number    
    
    @ManyToOne( type => Rank, rank => rank.customers)
        rank!: Rank | undefined

        public calculRank(totalTickets: number): number{

            let rankId: number = 0 
            
            if(totalTickets <= 5){
                rankId = 1
            }else if (totalTickets > 5 && totalTickets <= 10){
                rankId = 2
            }else if (totalTickets > 10 && totalTickets <= 30){
                rankId = 3
            }else if ( totalTickets > 30 && totalTickets <= 60){
                rankId = 4
            }else if ( totalTickets > 60 && totalTickets <= 100 ){
                rankId = 5
            }else if ( totalTickets > 100 && totalTickets <= 150 ){
                rankId = 6
            }else if ( totalTickets > 150 && totalTickets <= 200 ){
                rankId = 7
            }else if ( totalTickets > 200 && totalTickets <= 300 ){
                rankId = 8
            }else if ( totalTickets > 300 && totalTickets <= 1000 ){
                rankId = 9
        }
            return rankId
        }

    public toJSON(): Customer {
        const json: Customer = Object.assign({}, this)
        delete json.password
        return json
    }
}
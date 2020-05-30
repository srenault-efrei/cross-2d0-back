import User from "../models/User"
import Ticket from "../models/Ticket"
import Customer from "../models/Customer"
import Rank from "../models/Rank"

const customers = [
    {
        id: "1f38ec56-7757-42d7-8f13-cca1df2f780c",
        firstname: "Steven",
        lastname: "Renault",
        gender: "homme",
        email: "user1@gmail.com",
        password: '123456',
        tickets: [1, 2]

    },

]

export async function addUsers(): Promise<never | void> {

    const tickets: Array<Ticket> = []
    for (const user of customers) {
        const u = new Customer()
        if (u.id !== user.id) {
            u.id = user.id
            u.firstname = user.firstname
            u.lastname = user.lastname
            u.gender = user.gender
            u.password = user.password
            u.email = user.email
            u.rank = await Rank.findOne(1)
            for (const ticket of user.tickets) {
                let t: Ticket | undefined = await Ticket.findOne(ticket)
                if (t) {
                    tickets.push(t)
                }
            }
            u.tickets = tickets
        }
        await u.save()
    }
}
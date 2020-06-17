import Ticket from "../models/Ticket"
import Customer, { CustomerGender } from "../models/Customer"
import Rank from "../models/Rank"

const customers = [
    {
        id: "1f38ec56-7757-42d7-8f13-cca1df2f780c",
        firstname: "Steven",
        lastname: "Renault",
        gender: CustomerGender.Man,
        email: "steven_trocify@yopmail.com",
        password: '123456',
        tickets: [3,7]
    },
    {
        id: "2f38ec56-7757-42d7-8f13-cca1df2f780c",
        firstname: "Josias",
        lastname: "Assasmoi",
        gender: CustomerGender.Man,
        email: "josias_trocify@yopmail.com",
        password: '123456',
        tickets: [4]

    },
    {
        id: "3f38ec56-7757-42d7-8f13-cca1df2f780c",
        firstname: "Fabian",
        lastname: "Facinou",
        gender: CustomerGender.Woman,
        email: "fabian_trocify@yopmail.com",
        password: '123456',
        tickets: [2,5]
    },
    {
        id: "4f38ec56-7757-42d7-8f13-cca1df2f780c",
        firstname: "Maxime",
        lastname: "Galissaire",
        gender: CustomerGender.Woman,
        email: "maxime_trocify@yopmail.com",
        password: '123456',
        tickets: [1,6]
    },

]

export async function addCustomers(): Promise<never | void> {

    for (const user of customers) {
        const tickets: Array<Ticket> = []
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
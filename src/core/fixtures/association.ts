import Ticket from "../models/Ticket"
import Association from "../models/Association"

const associations = [
    {
        id: "5f38ec56-7757-42d7-8f13-cca1df2f780c",
        name: "Les Restos du cœur",
        email: "resto-du-coeur@yopmail.com",
        description :'Fondés par Coluche en 1985, les Restos du Cœur est une association loi de 1901',
        filePath: 'certification1.png',
        password: '123456',
        tickets: [1]

    },

    {
        id: "6f38ec56-7757-42d7-8f13-cca1df2f780c",
        name: "Ludopital",
        email: "ludopital@yopmail.com",
        password: '123456',
        description :'Depuis 1987, Ludopital améliore le séjour des enfants hospitalisés dans les hôpitaux',
        filePath: 'certification2.png',
        tickets: [2]

    },

]

export async function addAssociations(): Promise<never | void> {

   
    for (const asso of associations) {
        const tickets: Array<Ticket> = []
        const a = new Association()
        if (a.id !== asso.id) {
            a.id = asso.id
            a.name = asso.name
            a.password = asso.password
            a.email = asso.email
            a.description = asso.description
            a.filePath = asso.filePath
            for (const ticket of asso.tickets) {
                let t: Ticket | undefined = await Ticket.findOne(ticket)
                if (t) {
                    tickets.push(t)
                }
            }
            a.tickets = tickets
        }
        await a.save()
    }
}
import Ticket, { TicketType, TicketState } from "../models/Ticket"
import Category from "../models/Category"

const tickets = [
    {
        id: 1,
        title: 'Repas',
        type: TicketType.SECONND_TYPE,
        category: 1,
        description: "Distribution de repas",
        imagesFiles: ['../src/img/photo1.png', '..src/img/photo2.png']
    },

    {
        id: 2,
        title: 'Jouet playmobil',
        type: TicketType.SECONND_TYPE,
        category: 3,
        description: "Donne jouet playmobil ",
        imagesFiles: ['../src/img/photo3.png', '..src/img/photo4.png']
    },

    {
        id: 3,
        title: 'Yeezy 350',
        type: TicketType.FIRST_TYPE,
        category: 2,
        description: "Echange Yeezy 350 contre balanciaga",
        imagesFiles: ['../src/img/photo5.png', '..src/img/photo6.png']
    },


    {
        id: 4,
        title: 'Levis',
        type: TicketType.FIRST_TYPE,
        category: 2,
        description: "Pantalon Levis jamais porté taille 40",
        imagesFiles: ['../src/img/photo7.png', '..src/img/photo8.png']
    },


    {
        id: 5,
        title: 'Gateau',
        type: TicketType.FIRST_TYPE,
        category: 1,
        description: "Gateau ananas",
        imagesFiles: ['../src/img/photo9.png', '..src/img/photo10.png']
    },

    {
        id: 6,
        title: 'Doudone',
        type: TicketType.FIRST_TYPE,
        category: 3,
        description: "Doudoune nike avec fourrure taille L ",
        imagesFiles: ['../src/img/photo11.png', '..src/img/photo12.png']
    },

    {
        id: 7,
        title: 'Ordinateur Apple',
        type: TicketType.FIRST_TYPE,
        category: 4,
        description: "Echange MAC contre un iphone 11",
        imagesFiles: ['../src/img/photo11.png', '..src/img/photo12.png']
    },

]

export async function addTickets(): Promise<never | void> {

    for (const ticket of tickets) {
        const t = new Ticket()

        if (t.id != ticket.id) {
            t.id = ticket.id
            t.title = ticket.title
            t.type = ticket.type
            t.description = ticket.description
            t.imagesFiles = ticket.imagesFiles
            t.category = await Category.findOne(ticket.category)
        }

        await t.save()
    }
}

import Ticket, { TicketType, TicketState } from "../models/Ticket"
import Category from "../models/Category"

const tickets = [
    {
        id: 1,
        title: 'Repas',
        type: TicketType.SECONND_TYPE,
        category: 1,
        description: "Distribution de repas",
        imagesFiles: [
            "https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_960_720.jpg",
            "https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg"
        ],
        localisation: 'Paris'
    },

    {
        id: 2,
        title: 'Jouet playmobil',
        type: TicketType.SECONND_TYPE,
        category: 3,
        description: "Donne jouet playmobil ",
        imagesFiles: [
            "https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_960_720.jpg",
            "https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg"
        ],
        localisation: 'Marseille'

    },

    {
        id: 3,
        title: 'Yeezy 350',
        type: TicketType.FIRST_TYPE,
        category: 2,
        description: "Echange Yeezy 350 contre balanciaga",
        imagesFiles: [
            "https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_960_720.jpg",
            "https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg"
        ],
        localisation: 'Bordeaux'

    },


    {
        id: 4,
        title: 'Levis',
        type: TicketType.FIRST_TYPE,
        category: 2,
        description: "Pantalon Levis jamais porté taille 40",
        imagesFiles: [
            "https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_960_720.jpg",
            "https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg"
        ],
        localisation: 'Toulouse'
    },


    {
        id: 5,
        title: 'Gateau',
        type: TicketType.FIRST_TYPE,
        category: 1,
        description: "Gateau ananas",
        imagesFiles: [
            "https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_960_720.jpg",
            "https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg"
        ],
        localisation: 'Nantes'
    },

    {
        id: 6,
        title: 'Doudone',
        type: TicketType.FIRST_TYPE,
        category: 3,
        description: "Doudoune nike avec fourrure taille L ",
        imagesFiles: [
            "https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_960_720.jpg",
            "https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg"
        ],

        localisation: 'Rennes'
    },

    {
        id: 7,
        title: 'Ordinateur Apple',
        type: TicketType.FIRST_TYPE,
        category: 4,
        description: "Echange MAC contre un iphone 11",
        imagesFiles: [
            "https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_960_720.jpg",
            "https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg"
        ],
        localisation: 'Reims'
    },

]

export async function addTickets(): Promise<never | void> {

    for (const ticket of tickets) {
        const t = new Ticket()

        if (t.id != ticket.id) {
            t.id = ticket.id
            t.title = ticket.title
            t.type = ticket.type
            t.localisation = ticket.localisation
            t.description = ticket.description
            t.imagesFiles = ticket.imagesFiles
            t.category = await Category.findOne(ticket.category)
        }

        await t.save()
    }
}

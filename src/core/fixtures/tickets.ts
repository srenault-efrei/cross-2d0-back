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
            "https://recette.supertoinette.com/152193/b/riz-au-poulet-et-petits-pois.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSG-w4DRjWO1gdneSQc69gFS-Ip06Y1oObyLw&usqp=CAU",
            "https://www.croquonslavie.fr/sites/default/files/recette-riz-salade-cantonais.jpg"
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
            "https://images-na.ssl-images-amazon.com/images/I/81k4BautCzL._AC_SX522_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/91J5s1FodhL._AC_SX355_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/71d%2BLmXey-L._AC_SX355_.jpg"
        ],
        localisation: 'Paris'

    },

    {
        id: 3,
        title: 'Yeezy 350',
        type: TicketType.FIRST_TYPE,
        category: 2,
        description: "Echange Yeezy 350 contre balanciaga",
        imagesFiles: [
            "https://www.picclickimg.com/d/l400/pict/392700772699_/Adidas-Yeezy-500-Salt-UK-10-US-105.jpg",
            "https://www.kicksdaily.ru/UA-Salt-Yeezy-500/a842_32_nn27z0.jpg",
            "https://www.picclickimg.com/d/l400/pict/223273764783_/Adidas-Yeezy-500-Salt-US-Mens-Size-12.jpg"

        ],
        localisation: 'Paris'

    },

    {
        id: 4,
        title: 'Levis',
        type: TicketType.FIRST_TYPE,
        category: 2,
        description: "Pantalon Levis jamais porté taille 40",
        imagesFiles: [
            "https://www.3suisses.fr/media/produits/3su/levis/img/264913862-zoom_prd_3s_500x500.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSnozHEAtY7TDFFN8qgRmWxQv9VpUopnBAOI9Hmkq0zZnsDsctrEbHnVskLLwjdr6sKYVWbQdM&usqp=CAc",
            "https://www.bobbavice.fr/image/cache/data/category_14/levis_504_regular_straight_fit_jeans_homme_31eikkezv-500x500.jpg"
        ],
        localisation: 'Paris'
    },


    {
        id: 5,
        title: 'Gâteau',
        type: TicketType.FIRST_TYPE,
        category: 1,
        description: "Gateau ananas",
        imagesFiles: [
            "https://pastryfreak.fr/wp-content/uploads/2020/01/recette-gateau-yaourt-1.jpg",
            "https://static.750g.com/images/622-auto/f0904381ba4904da3e38225a4ca38dfd/gateau-au-chocolat.jpg",
            "https://aufilduthym.fr/wp-content/uploads/2016/10/gateau-pommes-ancienne.jpg"
        ],
        localisation: 'Paris'
    },

    {
        id: 6,
        title: 'Doudoune',
        type: TicketType.FIRST_TYPE,
        category: 2,
        description: "Doudoune nike avec fourrure taille L ",
        imagesFiles: [
            "https://www.footkorner.com/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/f/o/footkorner-nike-blouson-doudoune-noir-928833-010.jpeg",
            "https://www.cdiscount.com/pdt2/0/5/2/1/700x700/mp08477052/rw/nike-av15-doudoune-a-capuche-noir-861782-010-d.jpg",
            "https://www.cdiscount.com/pdt2/6/9/9/1/700x700/mp13683699/rw/veste-a-capuche-nike-sportswear-windrunner-down-fi.jpg"
        ],

        localisation: 'Paris'
    },

    {
        id: 7,
        title: 'Ordinateur Apple',
        type: TicketType.FIRST_TYPE,
        category: 4,
        description: "Echange MAC contre un iphone 11",
        imagesFiles: [
            "https://dyw7ncnq1en5l.cloudfront.net/optim/produits/71/16560/apple-macbook-air-13-pouces-2013_1371645843__450_400.jpg",
            "https://images.frandroid.com/wp-content/uploads/2020/02/macbook-pro-13-pocues-via-acheter-sur-google.jpg",
            "https://www.cdiscount.com/pdt2/0/9/6/1/700x700/app3701073099096/rw/pc-portables-reconditionnee-apple-macbook-air-6-2.jpg"
        ],
        localisation: 'Paris'
    },


    {
        id: 8,
        title: 'Clavier Gamer',
        type: TicketType.SECONND_TYPE,
        category: 4,
        description: "Clavier Gamer haut en couleur bon état",
        imagesFiles: [
            "https://rog.asus.com/media/1478636275255.jpg",
            "https://asset.msi.com/global/picture/image/feature/multimeda/mouse/DS4200/ds4200_overview_.png",
            "http://cdn.mos.cms.futurecdn.net/wt83z5SRX6uh2HoporkNJ4.jpg"
        ],
        localisation: 'Paris'
    },

    {
        id: 9,
        title: 'Maison pour enfant',
        type: TicketType.FIRST_TYPE,
        category: 3,
        description: "Maison pour enfant",
        imagesFiles: [
            "https://www.cdiscount.com/pdt2/5/0/0/1/300x300/smo810500/rw/maison-de-jardin-neo-juralodge-en-plastique-anti-u.jpg",
            "https://www.cdiscount.com/pdt2/5/0/0/1/300x300/smo810500/rw/maison-de-jardin-neo-juralodge-en-plastique-anti-u.jpg",
            "https://www.jeu-labyrinthe.com/wp-content/uploads/2019/08/maison-jardin.jpg"
        ],
        localisation: 'Paris'
    },

    {
        id: 10,
        title: 'Chaussure de football',
        type: TicketType.SECONND_TYPE,
        category: 2,
        description: "Chaussure de football nike jamais utilisé",
        imagesFiles: [
            "https://www.site-annonce.fr/sh-img/chaussure-football-nike-mercurial-superfly-ea-sports.jpg",
            "https://www.footpack.fr/wp-content/uploads/2016/05/chaussure-football-nike-mercurial-superfly-5-vapor-1024x732.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT0LDqXcvDJTd5ON63FPuKrlUdoGBAKhx4tBg&usqp=CAU"
        ],
        localisation: 'Paris'
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

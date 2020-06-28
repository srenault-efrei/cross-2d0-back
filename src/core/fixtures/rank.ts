import Rank from "../models/Rank";

const ranks = [

    {
        id: 1,
        title: 'Kiwi',
        pointStart: 0,
        pointEnd: 5,
    },
    {
        id: 2,
        title: 'Letchi',
        pointStart: 5,
        pointEnd: 10,
    },
    {
        id: 3,
        title: 'Figue',
        pointStart: 10,
        pointEnd: 30,
    },
    {
        id: 4,
        title: 'Banane',
        pointStart: 30,
        pointEnd: 60,
    },
    {
        id: 5,
        title: 'Ananas',
        pointStart: 60,
        pointEnd: 100,
    },
    {
        id: 6,
        title: 'Papaye',
        pointStart: 100,
        pointEnd: 150,
    },
    {
        id: 7,
        title: 'Grenade',
        pointStart: 150,
        pointEnd: 200,
    },
    {
        id: 8,
        title: 'Mangue',
        pointStart: 200,
        pointEnd: 300,
    },
    {
        id: 9,
        title: 'Fruit du dragon',
        pointStart: 300,
        pointEnd: 1000,
    },
]

export async function addRanks(): Promise< never | void > {

    for (const rank of ranks) {

        const r = new Rank()

        if (r.id != rank.id) {
            r.id = rank.id
            r.title = rank.title
            r.pointStart = rank.pointStart
            r.pointEnd = rank.pointEnd
        }
       await  r.save()
    }
}
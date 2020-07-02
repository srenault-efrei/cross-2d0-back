import Message from "../models/Message"
import User from "../models/User"

const message = 'Ceci est un message de test'


export async function addMessages() : Promise< never|void > {

    const users : User[] | undefined = await User.find()
    
    for(let u in users){
        const i =  Number(u)
        const message = new Message()
        message.content= 'Test de la part de ' + users[i].email +' :) !'
        message.sender= users[i]
        if(users.length -1 == i){
            message.recipient=users[0]
        }
        else{
            message.recipient = users[i+1]
        }
        await message.save()
    }
        

    
}
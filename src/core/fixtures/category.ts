import Category from "../models/Category"

const categories = [
    {
        id: 1,
        title: 'Real estate'
    },

    {
        id: 2,
        title: 'Dress'
    }
]

export function addCategories() : void {

    for (const  category of categories) {
        const c = new Category()
  
        if (c.id != category.id) {
            c.id = category.id
            c.title = category.title
        }
        
        c.save()
    }
}
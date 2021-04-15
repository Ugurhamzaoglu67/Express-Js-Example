

const categories = [
    {id:1, name:'Telefonlar',description:'Akıllı Telefonlar'},
    {id:2, name:'Bilgisayarlar',description:'Bilgisayar Ürünleri'},
    {id:3, name:'Beyaz Eşya',description:'Beyaz Eşya setleri'},
]


module.exports = class Categories {

    constructor(name,description) {
        this.id = (categories.length + 1)
        this.name = name
        this.description = description
    }


    saveCategory() {
        categories.push(this) //Kendisini liste üzerine eklemiş olduk.
    }



    //Sınıf üzerinden Çağırılır bu
    static getAll() {
        return categories
    }


    //Bana dışardan id getir
    static getById(id) {
        return categories.find(i => i.id ===id) // Burdaki i ->Her bir elemanın id'si.
    }

    //Bana dışardan category gönder
    static update(category) {
        const index = categories.findIndex( i => i.id === id)

        categories[index].name = category.name
        categories[index].description = category.description
    }

    static deleteById(id) {
        const index = categories.findIndex(i => i.id === id)

        categories.splice(index,1)

    }



}
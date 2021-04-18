const connection = require('../utility/database')

module.exports = class Categories {

    constructor(name,description) {
        this.id = (categories.length + 1)
        this.name = name
        this.description = description
    }

    //____________________________ (1) DB ye Kayıt YAPMA_________________
    saveCategory() {
      return  connection.execute('INSERT INTO  categories (name,description) VALUES (?,?)',
            [this.name, this.description]
            )
    }

    //____________________________ (2) Tüm categories Tablosunu Getirme _________________
    static getAll() {
        return connection.execute('SELECT * FROM categories')
    }

    //____________________________ (3) id 'ye Göre Getirme ________________________________
    static getById(id) {
        return connection.execute('SELECT * FROM categories WHERE id=?',[id])
    }

    //____________________________ (4) Ürün Güncelleme ________________________________
    static update(category) {
        return connection.execute('UPDATE categories SET categories.name=?, categories.description=?',
            [category.name, category.description])
    }


    //____________________________ (5) id'ye Göre Ürün Silme________________________________
    static deleteById(id) {
       return connection.execute('DELETE FROM categories WHERE id=?',
           [id])

    }



}
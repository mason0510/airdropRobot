const Category = require('../model/category')
const config = require('../config')

async function getCategorysByPage(page=0) {
    let categorys = await Category.find().limit(config.PageCount).skip(config.PageCount*page).sort("-created").select("-__v")
    return categorys
}

async function addCategory(category) {
    category.created = Date.now()
    await Category.create(category)
}

async function deleteCategory(id) {
    let res = await Category.deleteOne({_id: id})
    if(!res || res.n===0){
        throw Error("删除分类失败")
    }
}

async function updateCategory(id, update) {
    let res = await Category.updateOne({_id: id}, update)
    if(!res || res.n===0){
        throw Error("更新分类失败")
    }
}
module.exports = {
    getCategorysByPage, addCategory, deleteCategory, updateCategory
}
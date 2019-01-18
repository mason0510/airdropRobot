let router = require('express').Router()
let categoryService = require('../service/categoryService');

router.get("/", async (req,res, next)=>{
    let page = req.query.page || 0
    let categorys = await categoryService.getCategorysByPage(page)
    res.success(categorys)
});



router.post("/", async (req,res, next)=>{
    await categoryService.addCategory(req.body)
    res.success()
})

router.delete("/:id", async (req,res, next)=>{
    await categoryService.deleteCategory(req.params.id)
    res.success()
})

router.put("/:id", async (req,res, next)=>{
    await categoryService.updateCategory(req.params.id, req.body)
    res.success()
});


module.exports = router
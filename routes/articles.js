const express = require('express');
const { findByIdAndDelete } = require('./../models/article');
const ArticleModel = require('./../models/article');
const router = express.Router();
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

router.get('/',(req,res)=>{
    res.send('We are in the article route');
})
router.get('/new',(req,res)=>{
    res.render('articles/new',{article:new ArticleModel()});
})
router.get('/:slug',async(req,res)=>{
    const article =  await ArticleModel.findOne({slug:req.params.slug});
    if(article == null)res.redirect('/')
    else res.render('articles/show',{article:article});
})
router.post('/',async (req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const markdown = req.body.markdown;
    let article = new ArticleModel({title,description,markdown});
    
    try{
       article = await article.save();
       res.redirect(`/articles/${article.slug}`)
    }
    catch(e)
    {
        res.render('articles/new',{article:article});
    }
})

router.delete('/:id',async (req,res)=>{
    await ArticleModel.findByIdAndDelete(req.params.id);
    res.redirect('/');
})
module.exports = router;
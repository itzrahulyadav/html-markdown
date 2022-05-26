const express = require('express');
const mongoose = require('mongoose');
const ArticleModel = require('./models/article')
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/blog');

app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use('/articles',articleRouter);
app.use(methodOverride('_method'));

app.get('/',async(req,res)=>{
    const articles = await ArticleModel.find().sort({createdAt:'desc'});
    res.render("articles/index",{articles});
})

app.listen(3000,()=>{
    console.log("listening to the port at 3000");
})

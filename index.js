const express = require('express')
require('dotenv').config();
const { auth } = require('express-openid-connect');
const app = express()
var cors = require('cors')

// const mongoose = require('mongoose');
const port = 4000;

const path = require("path");

// const hbs = require("hbs");
const ejs = require('ejs');
var fs = require('fs');
const  mongoose  = require('mongoose');

const Register = require("./models/register");
const Category = require("./models/category");
const { json } = require('express/lib/response');
const mongoString = process.env.DATABASE_URL;
app.use(cors()) 
const multer  = require('multer');
const async = require('hbs/lib/async');


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


const templatePath = path.join(__dirname,'./templates/views')
const partialsPath = path.join(__dirname,'./templates/partials')
const aboutPath = path.join(__dirname,'./templates/views')

app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use(express.static("uploads"))
app.use("/uploads/", express.static("uploads/"))

app.set("view engine" , "ejs")
app.set('views',templatePath)


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: 'http://localhost:4000',
  clientID: 'mO9six1l8E986K6gZZqxkA2nlRKnsT4t',
  issuerBaseURL: 'https://dev-uullwc9e.us.auth0.com'
};

app.use(auth(config));


  app.get('/', (req, res) => {
    console.log('=====>',req.oidc.isAuthenticated())
    res.render("index", {isAuthenticated: req.oidc.isAuthenticated(),user: req.oidc.user});
    // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + "."+file.mimetype.split("/")[1])
  }
})

const upload = multer({ storage: storage })
app.post('/addlist', upload.single('uploaded_file'), async (req, res) => {

    try{
       const moviename = req.body.moviename;
       const category = req.body.category;
       
         const addlist = new Register({
           moviename: req.body.moviename,
           category:req.body.category,
          description: req.body.description,
          status: req.body.status,
          rating: req.body.rating,
          uploaded_file: req.file.filename
         })
         const list = await addlist.save();
         const catagory = await Category.findOneAndUpdate({category:req.body.category},{$push:{register:list._id}})

         const data = await Category.find();
         console.log("=================", data)
         let select = JSON.stringify(data)

         res.status(201).render("addlist", {select, isAuthenticated: req.oidc.isAuthenticated(),user: req.oidc.user});
       console.log("cata from node",catagory)
    } catch(error){
      res.status(400).send(error)
    }
});
app.get('/addnewcategory', async (req,res) =>{
  try{
    const data = await Category.find();
    res.render("addnewcategory",{myData:JSON.stringify(data),
      isAuthenticated: req.oidc.isAuthenticated(),
      user: req.oidc.user})
   
    console.log(data);
}
catch(error){
    res.status(400).json({message:error.message})
}
});

app.get('/addlist', async (req,res) =>{
  try{
    const data = await Category.find();
    console.log("=================", data)
    let select = JSON.stringify(data)
    res.render("addlist",{select,
      isAuthenticated: req.oidc.isAuthenticated(),
      user: req.oidc.user})
   
    console.log(data);
}
catch(error){
    res.status(400).json({message:error.message})
}
});

app.post('/addnewcategory', async (req, res) => {
  try{
      const addnewCategory = new Category({
        category : req.body.category
      })
      const categ = await addnewCategory.save();
      res.status(201).render("index", {isAuthenticated: req.oidc.isAuthenticated(),user: req.oidc.user});
    
 } catch(error){
   res.status(400).send(error)
 }
  
});

app.get('/list', async (req, res) => {
  try{
    const data = await Register.find({});
    res.render("list",{myData:JSON.stringify(data),
      isAuthenticated: req.oidc.isAuthenticated(),
      user: req.oidc.user})
   
    console.log(data);
  }
  catch(error){
      res.status(400).json({message:error.message})
  }
})

app.get('/delete', async (req, res) => {
  try{
    const data = await Register.find({});
    res.render("delete",{myData:JSON.stringify(data),
      isAuthenticated: req.oidc.isAuthenticated(),
      user: req.oidc.user})
   
    console.log(data);
  }
  catch(error){
      res.status(400).json({message:error.message})
  }
})
app.get('/reactlist', async (req, res) => {
  try{
      const data = await Register.find()
      res.json(data);
      
  }
  catch(error){
      res.status(400).json({message:error.message})
  }
})

app.get('/all', async (req,res) =>{
  try{
    const data = await Register.find();
    res.render("category",{myData:JSON.stringify(data),
      isAuthenticated: req.oidc.isAuthenticated(),
      user: req.oidc.user})
   
    console.log(data);
}
catch(error){
    res.status(400).json({message:error.message})
}
})

app.get('/movies', async (req,res) =>{
  try{
    const data = await Register.find({category:"Movie"});
    res.render("movies",{myData:JSON.stringify(data),
      isAuthenticated: req.oidc.isAuthenticated(),
      user: req.oidc.user})
   
    console.log(data);
}
catch(error){
    res.status(400).json({message:error.message})
}
})

app.get('/series', async (req,res) =>{
  try{
    const data = await Register.find({category:"Series"});
    res.render("category",{myData:JSON.stringify(data),
      isAuthenticated: req.oidc.isAuthenticated(),
      user: req.oidc.user})
   
    console.log(data);
}
catch(error){
    res.status(400).json({message:error.message})
}
})
app.get('/anime', async (req,res) =>{
  try{
    const data = await Register.find({category:"Anime"});
    res.render("anime",{myData:JSON.stringify(data),
      isAuthenticated: req.oidc.isAuthenticated(),
      user: req.oidc.user})
   
    console.log(data);
}
catch(error){
    res.status(400).json({message:error.message})
}
})



app.get('/addlist',(req,res) =>{
  res.render('addlist',{isAuthenticated: req.oidc.isAuthenticated(),user: req.oidc.user})
});

app.get('/category', async(req,res) =>{
  try{
    const data = await Category.find();
    res.render("category",{myData:JSON.stringify(data),
      isAuthenticated: req.oidc.isAuthenticated(),
      user: req.oidc.user})
   
    console.log(data);
}
catch(error){
    res.status(400).json({message:error.message})
}
});



app.get('/users', async (req,res) => {   
  try {   
     
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
      const page = req.query.page ? parseInt(req.query.page) : 0;
      const data = await Register.find({}).limit(pageSize).skip(pageSize * page);
      res.render("list",{myData:JSON.stringify(data),
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user})
     
      console.log(data);
  } catch (error) {
      res.status(400).json({message: error.message})
      }
  

});
app.get('/pagi', async (req,res) => {   
  try {   
     
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
      const page = req.query.page ? parseInt(req.query.page) : 0;
      const data = await Register.find({}).limit(pageSize).skip(pageSize * page);
      res.json(data)
  } catch (error) {
      res.status(400).json({message: error.message})
      }
})

app.get('/series_page', async (req,res) => {   
  try {   
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
      const page = req.query.page ? parseInt(req.query.page) : 0;
      const data = await Register.find({}).limit(pageSize).skip(pageSize * page);
      res.json(data)
  } catch (error) {
      res.status(400).json({message: error.message})
      }
});
app.get('/anime_page', async (req,res) => {   
  try {   
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
      const page = req.query.page ? parseInt(req.query.page) : 0;
      const data = await Register.find({category:"Anime"}).limit(pageSize).skip(pageSize * page);
      res.json(data)
  } catch (error) {
      res.status(400).json({message: error.message})
      }
});

app.get("/search/:key", async (req,res) => {

    
    let data = await Register.find(
      {
        "$or":[
          {"moviename":{$regex:req.params.key}},
          {"category":{$regex:req.params.key}},
          // {"rating":{regex:req.params.key}},
        ]
      })
      res.json(data)
   
})

app.get('/cata', async (req,res) => {   
  try {   
    const type = req.query.type;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
      const page = req.query.page ? parseInt(req.query.page) : 0;
    console.log("kkkk",type)
      const data = await Register.find({category:type}).limit(pageSize).skip(pageSize * page);
      // const data = await Category.findOne({category:type}).populate('register')
      const count = await Register.countDocuments({category:type})
      
      console.log("xxxxxxxxxxxxxdata",data)
      console.log("coooooouuuunnnnttt",count)
      res.json({"data":data,"count":count})
  } catch (error) {
      res.status(400).json({message: error.message})
      }
});

app.get('/categ', async (req,res) => {   
  try {   
      const data = await Category.find();
      res.json(data)
  } catch (error) {
      res.status(400).json({message: error.message})
      }
});


app.get('*',(req,res) =>{
  res.render('notfound',{isAuthenticated: req.oidc.isAuthenticated(),user: req.oidc.user})
})
 

app.get('/delete/:id', async (req,res) => {   
  // try {   
    const id = req.params.id;
    console.log('00000000000000000000000000')
    console.log(id)
    console.log("id::::",id)
    await Register.findOneAndDelete({_id: id});
    res.render('list')
     
    })
 
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})


const data_location= '../dataBase'

/* Connecting to the DataBase */
mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/homeFlix',{ useUnifiedTopology: true, useNewUrlParser: true })

var series_scm = new mongoose.Schema({name:String,img:String,episodes:Array,location:String
                                 ,genre:String,seasons:String})
var movies_scm = new mongoose.Schema({name:String,img:String,location:String,genre:String})

var series_mod = mongoose.model('series',series_scm)
var movies_mod = mongoose.model('movies',movies_scm)

/* Loading the webServer */
express = require("express")
app = express()

app.use(express.static('public'))
app.use(express.static(data_location))
app.set('view engine','ejs')

/* Handling requests */

app.post('/q',function(req,res){
    var query = req.query
    console.log(query)
    console.log('[+]recieved query:'+query)
    if(query.type == 'series'){
        delete query.type
        series_mod.find(query,function(err,doc){
            if(err){
                console.log(err)
            }else{
                res.send(doc)
            }
        })
    }else if(query.type=='movies'){
        delete query.type
        movies_mod.find(query,function(err,doc){
            if(err){
                console.log(err)
            }else{
                res.send(doc)
            }
        })
    }
})

app.post('/get_series',function(req,res){
    series_mod.find(function(err,doc){
        if(err){
            console.log(err)
        }else{
            res.send(doc)
        }
    })});

app.post('/get_movies',function(req,res){
    movies_mod.find(function(err,doc){
        if(err){
            console.log(err)
        }else{
            res.send(doc)
        }
    })});


app.get('/',function(req,res){
  res.render('index')
})

app.listen(80)
console.log('Server is Up')

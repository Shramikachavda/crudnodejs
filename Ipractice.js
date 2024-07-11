// npm  (node package manager)    //step 1 npn init
//  npm i express / npm install / npm install package_name # update dependancy in future if we run this
//nvm (node version manager )
//type of req:get ,post,put,delete  // localhost:portno/apiname?id = no(query)
//get = only url is given, give all data ,we can only use browser here
//post = body needed
//put= body ,query , for updating
//delete = query
//nodemod download for not restarting  port again and again when we save the file it will set the port
// "start":"nodemon Ipractice.js" in josn file in script  (nodemod package)
// for stating the node you have to write " npm start " everytime when you want to use
//   1. npm i dotenv  2.make .env file write PORT=port no 3. reqire('dotenv).config() 
// 4 . app.listen(process.env.PORT,()=>{ console.log('port started on '+process.env.PORT) }) 


//  3/7/2024 day 5
/*const express = require('express')

let app=express()

app.get('/hello' , (req , res)=>{
    res.send("hello word")
}) 
app.get('/hello1' , (req , res)=>{
    res.send("<h1> hello word using html tag </h1>")
})
app.get('/redirect' , (req , res)=>{         
    res.redirect('/check')       
}) 
app.get('/check' , (req , res)=>{
    res.send("<h1> redirect </h1>")

app.post('/createProd' , (req , res)={

})     
})
app.listen(8000,()=>{
    console.log('port started on 8000')
}) */

//  4/7/2024 day 6 ( create product and get all product)
 const express = require('express')
require('dotenv').config()
let app=express()

app.use(express.json())
let arr =[]
let id = 0
let isDelete
let mincost = 500
let maxcost = 1000


app.post('/createProd' , (req , res)=>{
    console.log(req.body)
}) 

app.post('/createProduct' , (req , res)=>{
    try{
        let obj = req.body
    id++
        obj.id = id
        obj.isDelete = false
        if(obj.name  && obj.cost && obj.category ){
           arr.find((value)=>{
               if (value.name == obj.name) {
                res.send({isSuccessfull : false , msg :" product is already exist"})
               } 
           })
            arr.push(obj)
            res.status(201).send({isSuccessfull : true  , Product:obj})
        }
        else{
            res.send({isSuccessfull : false , msg :"not a valid detail"})
        }   
    }
    catch(e){
        res.status(500).send({isSuccessfull: false , msg : +e})
    }
    
 
})  
app.get('/getalldata' ,(req , res)=>{
    try{
        res.status(200).send({Product : arr})
    }
    catch(e){
        res.status(500).send({isSuccessfull : false , msg : +e})
    }

       
   
})
app.get('/getall' ,(req , res)=>{
    try{
        let ans = arr.filter((val)=>{
            return val.isDelete == false
             })
         if(ans){
             res.status(200).send({products: ans})
         }
    }
  catch(e){
    res.status(500).send({isSuccessfull : false , msg : +e})
}
   
})

app.put('/updatedata' , (req,res)=>{
    try{
        let id = req.query.id
        let idx = arr.findIndex((value)=>{
        
         value.id ==id}
        )
       if(idx>=0){
        let obj =arr[idx]
        obj= {
            ...obj,
            ...req.body
        }
        arr[idx]=obj
        res.status(200).send({isSuccessfull:true , updateval:obj})
       }
       else{
        res.status(404).send({isSuccessfull : false , msg : " value not found"})
       }
    }
   
   catch(e){
    res.status(500).send({isSuccessfull : false , msg : +e})
}
  
})
 


app.delete('/delete' , (req , res)=>{
    try{
        let id = req.query.id
        let idx =arr.findIndex((val)=>{
           return val.id == id
        })
        
        if(idx >= 0) {
            let obj = arr[idx]
            arr.splice(idx , 1)
            res.send({isSuccessfull :true , updateval:obj})
        }
        else{
            res.send({isSuccessfull : false , msg : "data not delete"})
        }
    }
    catch(e){
        res.status(500).send({isSuccessfull : false , msg : +e})
    }

})

app.delete('/softdelete' , (req , res)=>{
    try{
        let id = req.query.id
        let idx = arr.find((val)=>(
            val.id == id
        ))
        if(idx &&  idx.isDelete == false){
           idx.isDelete=true
            res.send({isSuccessfull:true , deletedProduct :arr })
        }else{
            res.send({isSuccessfull :false , msg : " value not found"})
        }
    }

catch(e){
    res.status(500).send({isSuccessfull : false , msg : +e})
}
})

app.get('/range' , (req , res)=>{
    try{
        let a = arr.filter((val)=>{
            return val.cost > mincost && val.cost < maxcost
            })
            if(a){
             res.status(200).send({products: a})
         }
    }catch(e){
        res.status(500).send({isSuccessfull : false , msg : +e})
    }

})

app.get('/asort' , (req , res)=>{
    try{
        let asc = arr.sort((a , b)=>{
          return a.cost-b.cost
        })
        console.log("Asc",asc)
        res.status(200).send({Product : asc})
    }
    catch(e){
        res.status(500).send({isSuccessfull : false , msg : +e})
    }
})

app.get('/dsort' , (req , res)=>{
    try{
        let des = arr.sort((a , b)=>{
        return b.cost-a.cost
        })
        res.status(200).send({Product : des})
    }
    catch(e){
        res.status(500).send({isSuccessfull : false , msg : +e})
    }
})


app.listen(process.env.PORT,()=>{
    console.log('port started on '+process.env.PORT)
}) 


//   5/7/2024 day 7   ( update product )
//   8/7/2024 day 8 (delete product  , hard & soft delete)
//   9/7/2024 day 9 (2xx sucess ( 200 sucess , 201 created) ,
       //   4xx error (403 forbidden ,404 (not found)), 5xx server error ( 501 internal server))
//   10/7/24 day 10   (range and sort api)



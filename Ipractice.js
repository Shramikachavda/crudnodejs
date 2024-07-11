const express = require('express')
require('dotenv').config()
let app=express()

app.use(express.json())
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
})
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





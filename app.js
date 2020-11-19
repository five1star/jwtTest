const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;


app.get('/api',(req,res)=>{
  res.json({message:'Welcome to JWT'})
})


app.post('/api/posts',verifyToken,(req,res)=>{
  jwt.verify(req.token, 'jwtsecret', (err, authData)=>{ 
    if(err){
      res.sendStatus(403);
    } else {
        res.json({
          message:"welcome to JWT POST",
          authData
        })
    }
  })
})

app.post('/api/login',(req,res)=>{
  const user= {
    id:1,
    name:'hb oh'
  }

  jwt.sign({user},'jwtsecret', {expiresIn: '30s'},(err,token)=>{
    res.json({token})
})
})


function verifyToken(req,res,next){
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }

}


app.listen(PORT, ()=>console.log(`you listen ${PORT} port now`))
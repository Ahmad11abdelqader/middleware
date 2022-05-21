const express = require('express');
const app = express();
const morgan = require('morgan');


app.use(morgan('tiny'))

app.use((req,res,next) => {
    req.requestTime = Date.now();
    // req.method = 'GET';
console.log(req.method, req.path);
next();
})

app.use('/dogs', (req, res, next) => {
console.log("I LOVE DOGS!!")
next();
})

const verifyPassword = (req,res,next) => {
    
    const {password} = req.query;
    if (password === 'mazaraty'){
        next();
    }

    res.send('SORY YOU NEED THE PASSWORD')
}

// app.use((req, res, next)=> {
//    console.log("THIS IS MY FIRST MIDDLEWARE!!!")
//     return next();
//     console.log("this is my first migleware")
// })
// app.use((req, res, next)=> {
//     console.log("THIS IS MY FIRST MIDDLEWARE!!!")
//     return next();
//  })

//  app.use((req, res, next)=> {
//     console.log("THIS IS MY FIRST MIDDLEWARE!!!")
//     return next();
//  })

app.get('/', (req,res) => {
    console.log(`RQUEST DATE:  ${req.requestTime}`)
    res.send('HOME PAGE! ')
});

app.get('/dogs', (req,res) => {
    console.log(`RQUEST DATE:  ${req.requestTime}`)
    res.send('WOOF WOOF!')
});

app.get('/secret', verifyPassword, (req,res) => {
    res.send("MY SECRET JAJAJAJAJAJAJAJAJAJAJ")
})

app.use((req,res) => {
   res.status(404).send('NOT FOUND!')
})

app.listen(3000, () => {
    console.log('App is running localhost 3000!')
});
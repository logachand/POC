const file=require('fs')



const reqHandler=(req,res)=>{
const url=req.url
const method=req.method
if(url === '/' ){
    res.write(`<h1>hello</h1>
    <form action='/message' method="post">
    <label>Name : </label>
    <input type="text" name="message">
    <button>Button</button></form>
    `
    )
    return res.end()
}
if(url === '/message' && method === 'POST'){
    // res.write(`<form action="/age" method="post">
    // <label>Age : </label>
    // <input type="text" name="age">
    // <button>Submit UR age </button><form>
    // `)
    const body=[]

    req.on('data',(chunk)=>{
        console.log(chunk);
        body.push(chunk)
    })
    req.on('end',()=>{
        const parse=Buffer.concat(body).toString();
        console.log(parse );
        const message=parse.split('=')[1]
        const my_mesaage=message.replace(/\+/g,'')
        file.writeFileSync('message.txt',my_mesaage)

    })
    res.statusCode=302;
    res.setHeader('Location','/')
    return res.end();
}
res.setHeader('Content-Type','text/html')
res.write(`<h2>New type</h2>`)
res.end()
}


module.exports={

    handler:reqHandler,
    sometext:"Hey thereee"
}
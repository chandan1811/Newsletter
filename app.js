const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
const https=require("https");
const { Http2ServerRequest } = require("http2");
const { post } = require("request");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var firstName=req.body.fname;
    var lastName=req.body.lname;
    var email=req.body.email;
    // console.log(firstName,lastName,email);
    const data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName,

            }
        }
    ]
    };
    const jsondata=JSON.stringify(data);
    const url="";
    const options={
        method:"POST",
        auth:""
    }

    const request=https.request(url,options,function(response){
        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });
    request.write(jsondata);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(req,res){
    console.log("Server started at port 3000");
});
const { response } = require("express");
const express =require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app= express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 
app.get("/",(req,res)=>{
    
    res.sendFile(__dirname+"/index.html");

    // res.send("Server is running");
})

app.post("/",(req,res)=>{
 console.log(req.body.cityName);
const query=req.body.cityName;
const apikey="5f139850b1894bfdfd1f2e02929bf12a";
const units=req.body.unittype;
 const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units+"";

    https.get(url,(response)=>{
        // console.log(response);
        response.on("data",(data)=>{
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            const desc=weatherdata.weather[0].description;
            const img=weatherdata.weather[0].icon;
            const imgurl="http://openweathermap.org/img/wn/"+img+"@2x.png";
            res.write("<h1>The temp in "+query+" " + temp +" </h1>");
            res.write("<p>weather type in "+query+" " + desc +"</h1>");
            res.write("<img src="+imgurl+"></img>");
            res.send();
        })
    });

})



app.listen(3000,()=>{
    console.log("Running");
})
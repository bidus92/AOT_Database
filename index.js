import express from "express"; 
import ejs from "ejs"; 
import axios from "axios"; 
import bodyParser from "body-parser";


const app = express(); 
const port = 3000; 
const theBody = bodyParser.urlencoded({extended: true}); 
app.use(theBody); 


app.use(express.static("public")); 



app.get("/",async (req, res)=>
{
    res.render("index.ejs",
    {
       
    }); 
});

//TODO: Utilize Axios to get API information for the website 
app.get("/characters", async (req, res)=>
{
    const response = await axios.get("https://api.attackontitanapi.com/characters/?page=1");
    const result = response.data.results;
    //console.log(result);
    res.render("characters.ejs",
    {
       characterList: result
    }); 
});

app.get("/episodes", (req, res)=>
{
    //const response = await axios.get("https://api.attackontitanapi.com/characters/?page=1");
    //const result = response.data.results;
    //const theName = result[2].name
    //console.log(result[2].name);
    res.render("episodes.ejs",
    {
       
    }); 
});

app.get("/locations", (req, res)=>
{
    //const response = await axios.get("https://api.attackontitanapi.com/characters/?page=1");
    //const result = response.data.results;
    //const theName = result[2].name
    //console.log(result[2].name);
    res.render("locations.ejs");
});

app.get("/organizations", (req, res)=>
{
    //const response = await axios.get("https://api.attackontitanapi.com/characters/?page=1");
    //const result = response.data.results;
    //const theName = result[2].name
    //console.log(result[2].name);
    res.render("organizations.ejs",
    {
       
    }); 
});

app.get("/titans", (req, res)=>
{
    //const response = await axios.get("https://api.attackontitanapi.com/characters/?page=1");
    //const result = response.data.results;
    //const theName = result[2].name
    //console.log(result[2].name);
    res.render("titans.ejs",
    {
       
    }); 
});


app.listen(port, (err)=>
{
    if(err)
    {
        console.log(err); 
    }
    else
    {
        console.log(`Server is active! Listening at port ${port}`);
    }
})

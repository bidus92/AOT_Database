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
    const response = await axios.get(`https://api.attackontitanapi.com/characters/?page=1`);
    const result = response.data.results;
    res.render("characters.ejs",
    {
       characterList: result
    }); 
});

app.post("/characters", async (req, res)=>
{
    var page = req.body["page"];
    const response = await axios.get(`https://api.attackontitanapi.com/characters/?page=${page}`);
    const result = response.data.results;
    res.render("characters.ejs",
    {
       characterList: result
    }); 
})
app.get("/episodes", async (req, res)=>
{
    const response = await axios.get("https://api.attackontitanapi.com/episodes/?page=1");
    const result = response.data.results;
    res.render("episodes.ejs",
    {
       episodeList: result
    }); 
});

app.post("/episodes", async (req, res)=>
{
    var page = req.body["page"];
    const response = await axios.get(`https://api.attackontitanapi.com/episodes/?page=${page}`);
    const result = response.data.results;
    res.render("episodes.ejs", 
    {
        episodeList: result
    });
});

app.get("/locations", async (req, res)=>
{
    const response = await axios.get("https://api.attackontitanapi.com/locations/?page=1");
    const result = response.data.results;
    res.render("locations.ejs",
    {
        locationList: result
    });
});

app.post("/locations", async (req, res)=>
{
    var page = req.body["page"];
    const response = await axios.get(`https://api.attackontitanapi.com/locations/?page=${page}`);
    const result = response.data.results;
    res.render("locations.ejs", 
    {
        locationList: result
    });
});

app.get("/organizations", async (req, res)=>
{
    const response = await axios.get("https://api.attackontitanapi.com/organizations");
    const result = response.data.results;
    res.render("organizations.ejs",
    {
       organizationList: result
    }); 
});

app.get("/titans", async (req, res)=>
{
    const response = await axios.get("https://api.attackontitanapi.com/titans/");
    const result = response.data.results;
    res.render("titans.ejs",
    {
       titanList: result
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

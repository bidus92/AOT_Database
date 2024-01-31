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
});




app.post("/character-database", async (req, res)=>
{
    var id = req.body["id"];
    var response = await axios.get(`https://api.attackontitanapi.com/characters/${id}`);
    const result = response.data;
    res.render("data.ejs",
    {
       data: result
    })
});

app.get("/episodes", async (req, res)=>
{
    const response = await axios.get("https://api.attackontitanapi.com/episodes/?page=1");
    const result = response.data.results;
    res.render("episodes.ejs",
    {
       episodeList: result
    }); 
});

//episode main page to get list of all available episodes
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

//post to access individual episodes
app.post("/episode-database", async (req, res)=>
{
    var id = req.body["id"];
    const response = await axios.get(`https://api.attackontitanapi.com/episodes/${id}`);
    const result = response.data;
    res.render("data.ejs",
    {
       data: result
    })
});

//locations page listing all available locations
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

//GET to link location database with character database where inheritors are referenced
app.get("/location-database", async (req, res)=>
{
    var id;
    if(req.body["id"])
    {
        const response = await axios.get(`https://api.attackontitanapi.com/characters/${id}`);
        id = req.body["id"];
    }
    else
    {
        id = req.body["epID"]
        const response = await axios.get(`https://api.attackontitanapi.com/episodes/${id}`);
    }
    
    const result = response.data;
    console.log(id); 

    res.render("data.ejs",
    {
       data: result
    });
   
});

//The location database.  
app.post("/location-database", async (req, res)=>
{
    var id = req.body["id"];
    const response = await axios.get(`https://api.attackontitanapi.com/locations/${id}`);
    const result = response.data;
    var notable_inhabitants = [];
    var names = [];
    console.log(response.data.notable_inhabitants); 
    for(let x = 0; x < response.data.notable_inhabitants.length; x++)
    {
        //Checks to see if there are numbers in the notable inhabitants, indicating a url to get information from the api from
        if(/\d/.test(response.data.notable_inhabitants[x]))
        {
            notable_inhabitants.push(await axios.get(`${response.data.notable_inhabitants[x]}`))
            names.push(notable_inhabitants[x].data.name);
        }
        //otherwise post string as is
        else
        {
            notable_inhabitants.push(response.data.notable_inhabitants[x]);
            names.push(notable_inhabitants[x]);
        }
        
    }
    res.render("data.ejs",
    {
       data: result,
       notable_inhabitants: names
    })
});

//organizations main page listing them
app.get("/organizations", async (req, res)=>
{
    const response = await axios.get("https://api.attackontitanapi.com/organizations");
    const result = response.data.results;
    res.render("organizations.ejs",
    {
       organizationList: result
    }); 
});

//POST to send information from organizations page to get appropriate information for individual organizations
app.post("/organization-database", async (req, res)=>
{
    var id = req.body["id"];
    const response = await axios.get(`https://api.attackontitanapi.com/organizations/${id}`);
    const result = response.data;
    res.render("data.ejs",
    {
       data: result
    })
});

//GET for list of titans
app.get("/titans", async (req, res)=>
{
    const response = await axios.get("https://api.attackontitanapi.com/titans/");
    const result = response.data.results;
    res.render("titans.ejs",
    {
       titanList: result
    }); 
});


//GET for titan-database to obtain information for character database where inheritors are referenced
app.get("/titan-database", async (req, res)=>
{
    var id = req.body["id"];
    const response = await axios.get(`https://api.attackontitanapi.com/characters/${id}`);
    const result = response.data;
    console.log(id); 
    res.render("data.ejs",
    {
       data: result
    })
   
});

//the titan database that loads all information needed 
app.post("/titan-database", async (req, res)=>
{
    var id = req.body["id"];
    const response = await axios.get(`https://api.attackontitanapi.com/titans/${id}`);
    const result = response.data;
    const current_inheritor = await axios.get(`${response.data.current_inheritor}`);

    var former_inheritors = [];
    var names = [];
    for(let x = 0; x < response.data.former_inheritors.length; x++)
    {
        former_inheritors.push(await axios.get(`${response.data.former_inheritors[x]}`))
        names.push(former_inheritors[x].data.name);
    }

    res.render("data.ejs",
    {
       data: result,
       current_inheritor: current_inheritor.data.name,
       former_inheritors: names
    })
});



app.listen(port, (res, err)=>
{
    if(err)
    {
        console.log(err); 
        console.log(res.sendStatus(404)); 
    }
    else
    {
        console.log(`Server is active! Listening at port ${port}`);
    }
})

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
    const response = await axios.get("https://api.attackontitanapi.com/characters/?page=1");
    const result = response.data.results;
    const theName = result[2].name
    console.log(result[2].name);
    res.render("index.ejs",
    {
       characters: theName
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

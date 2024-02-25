import express from "express"; 
import ejs from "ejs"; 
import bodyParser from "body-parser";
import characterRoutes from "./routes/characters.js"; 
import episodeRoutes from "./routes/episodes.js"; 
import locationRoutes from "./routes/locations.js"; 
import organizationRoutes from "./routes/organizations.js"; 
import titanRoutes from "./routes/titans.js";
import indexController from "./controllers/index.js"

const app = express(); 
const port = 3000; 
const theBody = bodyParser.urlencoded({extended: true}); 
app.use(theBody); 


app.set("view engine", "ejs"); 

app.use(express.static("public")); 

app.get("/", indexController.getIndex);

app.use(characterRoutes); 
app.use(episodeRoutes); 
app.use(locationRoutes); 
app.use(organizationRoutes); 
app.use(titanRoutes); 


//defaults to this path if page not found
app.use(indexController.pageNotFound);




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

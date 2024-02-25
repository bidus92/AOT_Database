import axios from "axios"; 

export default
{
    getLocations: async function getLocations(req, res, next)
    {
        const response = await axios.get("https://api.attackontitanapi.com/locations/?page=1");
        const result = response.data.results;
        res.render("locations.ejs",
        {
            locationList: result
        });
    },

    postLocation: async function postLocation(req, res, next)
    {
        var page = req.body["page"];
        const response = await axios.get(`https://api.attackontitanapi.com/locations/?page=${page}`);
        const result = response.data.results;
        res.render("locations.ejs", 
        {
            locationList: result
        });
    },

    getLocationDatabase: async function getLocationDatabase(req, res, next)
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

        res.render("data.ejs",
        {
            data: result
        });
    },

    postLocationDatabase: async function postLocationDatabase(req, res, next)
    {
        var id = req.body["id"];
        const response = await axios.get(`https://api.attackontitanapi.com/locations/${id}`);
        const result = response.data;
        var notable_inhabitants = [];
        var names = [];
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
        });
    }
};
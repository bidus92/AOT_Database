import axios from "axios"; 

export default
{
    getOrganizations: async function getOrganizations(req, res, next)
    {
        const response = await axios.get("https://api.attackontitanapi.com/organizations");
        const result = response.data.results;
        res.render("organizations.ejs",
        {
           organizationList: result
        }); 
    },

    getOrganizationDatabase: async function getOrganizationDatabase(req, res, next)
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

    postOrganizationDatabase: async function postOrganizationDatabase(req, res, next)
    {
        var id = req.body["id"];
        const response = await axios.get(`https://api.attackontitanapi.com/organizations/${id}`);
        const result = response.data;
        var notable_members = [];
        var names = [];
        for(let x = 0; x < response.data.notable_members.length; x++)
        {
            //Checks to see if there are numbers in the notable inhabitants, indicating a url to get information from the api from
            if(/\d/.test(response.data.notable_members[x]))
            {
                notable_members.push(await axios.get(`${response.data.notable_members[x]}`))
                names.push(notable_members[x].data.name);
            }
            //otherwise post string as is
            else
            {
                notable_members.push(response.data.notable_members[x]);
                names.push(notable_members[x]);
            }
            
        }
        res.render("data.ejs",
        {
           data: result,
           notable_members: names
        });
    }
};
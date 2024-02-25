import axios from "axios"; 


export default
{
    getTitans: async function getTitans(req, res, next)
    {
        const response = await axios.get("https://api.attackontitanapi.com/titans/");
        const result = response.data.results;
        res.render("titans.ejs",
        {
           titanList: result
        }); 
    },

    getTitanDatabase: async function getTitanDatabase(req, res, next)
    {
        var id = req.body["id"];
        const response = await axios.get(`https://api.attackontitanapi.com/characters/${id}`);
        const result = response.data;
        res.render("data.ejs",
        {
        data: result
        });
    },

    postTitanDatabase: async function postTitanDatabase(req, res, next)
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
        });
    }
};
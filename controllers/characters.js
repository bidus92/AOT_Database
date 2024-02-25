import axios from "axios"; 


export default
{
    getCharacters: async function getCharacters(req, res, next)
    {
        const response = await axios.get(`https://api.attackontitanapi.com/characters/?page=1`);
        const result = response.data.results;
        res.render("characters.ejs",
        {
           characterList: result
        }); 
    },

    postCharacter: async function postCharacter(req, res, next)
    {
        var page = req.body["page"];
        const response = await axios.get(`https://api.attackontitanapi.com/characters/?page=${page}`);
        const result = response.data.results;
        res.render("characters.ejs",
        {
           characterList: result
        }); 
    },

    postCharacterDatabase: async function postCharacterDatabase(req, res, next)
    {
        var id = req.body["id"];
        var response = await axios.get(`https://api.attackontitanapi.com/characters/${id}`);
        const result = response.data;
        res.render("data.ejs",
        {
           data: result
        });
    }
};
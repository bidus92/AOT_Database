import axios from "axios"; 

export default
{
    getEpisodes: async function getEpisodes(req, res, next)
    {
        const response = await axios.get("https://api.attackontitanapi.com/episodes/?page=1");
        const result = response.data.results;
        res.render("episodes.ejs",
        {
           episodeList: result
        }); 
    },

    postEpisode: async function postEpisode(req, res, next)
    {
        var page = req.body["page"];
        const response = await axios.get(`https://api.attackontitanapi.com/episodes/?page=${page}`);
        const result = response.data.results;
        res.render("episodes.ejs", 
        {
            episodeList: result
        });
    },

    postEpisodeDatabase: async function postEpisodeDatabase(req, res, next)
    {
        var id = req.body["id"];
        const response = await axios.get(`https://api.attackontitanapi.com/episodes/${id}`);
        const result = response.data;
        res.render("data.ejs",
        {
           data: result
        });
    }
};
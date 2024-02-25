export default
{

    getIndex: function getIndex(req, res, next)
    {
        res.render("index.ejs",
        {
           
        }); 
    },

    pageNotFound: function getPageNotFound(req, res, next)
    {
        res.status(404).render("404.ejs", 
        {

        });
    }

}
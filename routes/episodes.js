import express from "express";
import episodeController from "../controllers/episodes.js"


const router = express.Router(); 


//TODO: Utilize Axios to get API information for the website 
router.get("/episodes", episodeController.getEpisodes); 

router.post("/episodes", episodeController.postEpisode); 


router.post("/episode-database", episodeController.postEpisodeDatabase); 


export default router; 
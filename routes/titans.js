import express from "express";
import titanController from "../controllers/titans.js"




const router = express.Router(); 


//TODO: Utilize Axios to get API information for the website 
router.get("/titans", titanController.getTitans); 

router.post("/titan-database", titanController.postTitanDatabase); 

router.get("/titan-database", titanController.getTitanDatabase);


export default router; 
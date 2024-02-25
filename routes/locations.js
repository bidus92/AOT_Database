import express from "express";
import locationsController from "../controllers/locations.js"



const router = express.Router(); 


//TODO: Utilize Axios to get API information for the website 
router.get("/locations", locationsController.getLocations); 

router.post("/locations", locationsController.postLocation); 

router.get("/location-database", locationsController.getLocationDatabase);

router.post("/location-database", locationsController.postLocationDatabase); 


export default router; 
import express from "express";
import organizationsController from "../controllers/organizations.js"



const router = express.Router(); 


//TODO: Utilize Axios to get API information for the website 
router.get("/organizations", organizationsController.getOrganizations); 

router.get("/organization-database", organizationsController.getOrganizationDatabase); 

router.post("/organization-database", organizationsController.postOrganizationDatabase); 


export default router; 
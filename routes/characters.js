import express from "express";
import characterController from "../controllers/characters.js"


const router = express.Router(); 


//TODO: Utilize Axios to get API information for the website 
router.get("/characters", characterController.getCharacters); 

router.post("/characters", characterController.postCharacter); 


router.post("/character-database", characterController.postCharacterDatabase); 


export default router; 
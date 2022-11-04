import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//POST
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

//GET
router.get("/find/:id", getHotel);
 
//GET ALL
router.get("/", getHotels);

//GET COUNT BY CITY
router.get("/countByCity", countByCity);

//GET COUNT BY TYPE
router.get("/countByType", countByType);

// GET HOTEL ROOMS
router.get("/room/:id", getHotelRooms);

export default router
import express from "express";
import { addData, getData, getUserOrder, saveFilteredData } from "../controllers/DataController.js";


const router = express.Router();


router.get('/data', getData);
router.post('/save', saveFilteredData);
router.post('/add', addData);
router.get('/orders/:username', getUserOrder);

export { router as DataRoute }
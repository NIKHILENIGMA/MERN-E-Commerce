import express from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { 
    createShipment,
    getShipmentById,
    updateShipmentDetails,
    deleteShipment 
} from "../controllers/shipment.controller.js"

const router = express.Router();

router
    .route("/add-shipping-address")
    .post( verifyJWT, createShipment)

router
    .route("/")
    .get( verifyJWT, getShipmentById)

router
    .route("/:id")
    .patch( verifyJWT, updateShipmentDetails)
    .delete( verifyJWT, deleteShipment)

export default router;
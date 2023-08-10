import { Router } from "express";
import {getBalance} from "../controllers";

const balanceRouter = Router()

balanceRouter.get("/:add/:token",getBalance);

export default balanceRouter;
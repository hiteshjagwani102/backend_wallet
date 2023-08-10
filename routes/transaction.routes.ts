import { Router } from "express";
import {sendTransaction} from "../controllers";

const transactionRouter = Router()

transactionRouter.post("/:token",sendTransaction);

export default transactionRouter;
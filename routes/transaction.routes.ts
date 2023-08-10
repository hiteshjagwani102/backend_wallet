import { Router } from "express";
import {sendTransaction, sendTransactionERC20} from "../controllers";

const transactionRouter = Router()

transactionRouter.post("/:token",sendTransaction);
transactionRouter.post("/erc20/gc",sendTransactionERC20)

export default transactionRouter;
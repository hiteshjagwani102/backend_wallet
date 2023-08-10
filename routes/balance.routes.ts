import { Router } from "express";
import {getBalance, getBalanceERC20} from "../controllers";

const balanceRouter = Router()

balanceRouter.get("/:add/:token",getBalance);
balanceRouter.get('/erc20',getBalanceERC20);

export default balanceRouter;
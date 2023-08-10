import { Router } from "express";
import balanceRouter from "./balance.routes";
import transactionRouter from "./transaction.routes";

const router = Router();

router.use('/balance', balanceRouter)
router.use('/transaction', transactionRouter)

export default router
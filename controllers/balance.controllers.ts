import { ethers } from "ethers";
import { Request, Response } from "express";
import contractAbi from '../configs/contractABI.json'


const getBalance = async (req: Request, res: Response) => {
    try {
        const address: string = req.params.add;
        const token: string = req.params.token;
        let provider: any
        if (token == 'eth') {
            provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_ETH_URL as string)
        }
        else if (token == 'polygon') provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_MAINNET_URL as string);


        if (provider) {
            const balance = await provider.getBalance(address);
            const ethValue = ethers.utils.formatEther(balance.toString());
            const bal = {
                balance:`${ethValue}`
            }
            res.send(bal);
        }
        else res.status(404).send("Token Not Found")


    } catch (err) {
        console.log(err);
    }
}

const getBalanceERC20 = async(req: Request, res:Response) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_ETH_URL as string)
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider)
        const contract = new ethers.Contract('0xB7de893A7Ce5E4E7842F23b0eA0351645e218D9B', contractAbi, wallet);
        try {
            const balance = await contract.balanceOf("0x77b49536bfD1d86BCA60459cD3784427BfC46fDf");
            const gcValue = (parseInt(balance.toString())*10**-18).toString()
            res.status(201).send({
                balance:gcValue
            });
        } catch (err: any) {
            res.status(400).send(err.reason);
        }
    }
    catch (err) {
        console.log(err);
    }
}

export {getBalance,getBalanceERC20};
import { ethers } from "ethers";
import { Request, Response } from "express";


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

export default getBalance;
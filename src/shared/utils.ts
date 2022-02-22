require('dotenv').config()
import axios from "axios"

export const pollEthPrice = async () => {
    let response
    new Promise(async (resolve, reject) => {
        try {
            response = await axios.get('https://rest-sandbox.coinapi.io/v1/assets/ETH', {
                headers: {
                    'X-CoinAPI-KEY': process.env.COINAPI_KEY,
                },
            });
        } catch (ex) {
            response = null;
            reject(ex);
        }
        if (response) {
            const json = response.data;
            resolve(json);
        }
    });
}

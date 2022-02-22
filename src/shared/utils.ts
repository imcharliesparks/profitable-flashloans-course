require('dotenv').config()
import axios from "axios"

export const pollEthPrice = async () => {
    let response
    new Promise(async (resolve, reject) => {
        try {
            response = await axios.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=ETH', {
                headers: {
                    'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_CAP_API_KEY,
                },
            });
        } catch (ex) {
            response = null;
            // error
            console.log(ex);
            reject(ex);
        }
        if (response) {
            // success
            const json = response.data;
            console.log(json.data.ETH.quote);
            resolve(json);
        }
    });
}
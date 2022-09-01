const axios = require('axios');

let response = null;
new Promise(async (resolve, reject) => {
    try {
        response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
            headers: {
                'X-CMC_PRO_API_KEY': '7ca0ae9d-453d-4070-8cb2-1966178d5f39',
            },
        });
    } catch (ex) {
        response = null;
        // error
        console.log(ex);
        reject(ex);
    } if (response) {
        // success
        const json = response.data;
        console.log(json);
        resolve(json);
    }
});
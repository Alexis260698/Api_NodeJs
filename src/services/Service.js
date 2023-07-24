const fetch = require("node-fetch");
const axios = require('axios');


function googleApi(body, option) {
    const GOOGLE_ENDPOINT = process.env.GOOGLE_ENDPOINT || 'https://vision.googleapis.com/v1/images:annotate';
    const API_KEY = process.env.API_KEY;


    const request = assembleRequest(body);


    const params = new URLSearchParams();
    params.append('key', API_KEY);


    const options = {
        method: 'POST',
        url: GOOGLE_ENDPOINT,
        params: params,
        headers: {
            'content-type': 'application/json',
            'Accept': '/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
        },
        data: request,
    };

    
    return axios.request(options)
        .then(function (response) {
            return getResponse(gettingData(response.data), option);           
        })
        .catch(function (error) {
            console.error("Error al consultar la Api:" + error);
        })

}

function assembleRequest(base64) {
    return JSON.stringify(request = {
        "requests": [{
            "image": { "content": base64 },
            "features": [{ "maxResults": 50, "type": "FACE_DETECTION" },
            { "maxResults": 50, "type": "LABEL_DETECTION" }]
        }]
    });
}


function getResponse(data, option){
    let respuesta ='';

    const info = JSON.parse(data);
    Object.entries(info).forEach(([key, value]) => {
        if (key == option) {
            respuesta = value.sort((x, y) => x.score > y.score).slice(1,4);
        }
    })

return respuesta;
}

function gettingData(data) {
    let response ='';

    const jsonParsed = JSON.parse(JSON.stringify(data));
    Object.entries(jsonParsed).forEach(([key, value]) => {
        if (key == 'responses') {
            Object.entries(value).forEach(([key, value]) => {
                response =(JSON.stringify(value));
            });

        }
    })
    
    return response;
}



module.exports = {
    googleApi
}
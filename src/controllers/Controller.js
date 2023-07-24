const service = require("../services/Service");
const INTERNAL_SERVER_ERROR_CODE =500;

const getAll = async (req, res) => {
    const {base_64} = req.body;
    
    
    const data = await service.googleApi(base_64, req.params.option);
    console.log("Respuesta: " + data)
    
    data!=null || data!=undefined ? res.send({data: data}) : 
    res.status(INTERNAL_SERVER_ERROR_CODE).send({status: "INTERNAL SERVER ERROR", data: data});
};


module.exports = {
    getAll
    
};


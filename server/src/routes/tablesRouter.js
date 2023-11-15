tablesRouter = require("express").Router();

const {getEmpresaHandler,createEmpresaHandler, updateEmpresaHandler, deleteEmpresaHandler,   
        getCuentasHandler, createCuentasHandler, updateCuentasHandler, deleteCuentasHandler,
        getMedioHandler, createMedioHandler, updateMedioHandler, deleteMedioHandler, getTranByIdHandler,
        getTransportHandler, createTransportHandler, updateTransportHandler, deleteTransportHandler
      } = require("../handlers/tablesHandler")

//Empresa
tablesRouter.get("/getempresa", getEmpresaHandler);
tablesRouter.post("/postempresa",createEmpresaHandler);
tablesRouter.delete("/deleteempresa/:id", deleteEmpresaHandler);
tablesRouter.put("/putempresa/:id", updateEmpresaHandler);

//Cuentas
tablesRouter.get("/getcuentas", getCuentasHandler);
tablesRouter.post("/postcuentas",createCuentasHandler);
tablesRouter.delete("/deletecuentas/:id", deleteCuentasHandler);
tablesRouter.put("/putcuentas/:id", updateCuentasHandler);

//Medio Pago

tablesRouter.get("/getmediopago", getMedioHandler);
tablesRouter.post("/postmediopago",createMedioHandler);
tablesRouter.delete("/deletemediopago/:id", deleteMedioHandler);
tablesRouter.put("/putmediopago/:id", updateMedioHandler);

//Transportadora
tablesRouter.get("/logistica/:id", getTranByIdHandler);
tablesRouter.get("/getlogistica", getTransportHandler);
tablesRouter.post("/postlogistica",createTransportHandler);
tablesRouter.delete("/deletelogistica/:id", deleteTransportHandler);
tablesRouter.put("/putlogistica/:id", updateTransportHandler);


module.exports = tablesRouter;
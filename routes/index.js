const {CreateUser, GetbyId, UpdatebyId ,DeletebyId,getAllData,DeleteAllData}=require('../controller/autthController')
const express=require('express')
const router=express.Router()

router.post("/",CreateUser)
router.get("/get/:id",GetbyId)
router.put("/:id",UpdatebyId)
router.delete("/del/:id",DeletebyId)
router.get("/getAll",getAllData)
router.delete("/deleteAll",DeleteAllData)


module.exports =router
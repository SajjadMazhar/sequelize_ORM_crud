const test = require('../models/user')
const bcrypt = require("bcrypt")
const Joi = require('joi')
const CreateUser = async (req, res) => {
    const Schema = Joi.object({
        Name: Joi.string()
            .min(5)
            .max(30)
            .required(),
        Email: Joi.string()
            .email()
            .min(5)
            .max(50)
            .required(),
        password: Joi.string()
            .min(8)
            .max(16)
            .required()
    });
    let validateSchema = Schema.validate(req.body)
    let userpayload;
    let data;
    if (validateSchema.error) {
        return res.status(400).json({
            massage: validateSchema.error.massage || "Bad Request",
            code: 400
        })
    } else {
        userpayload = validateSchema.value;
        data = {
            Name: userpayload.Name,
            Email: userpayload.Email,
            password: bcrypt.hashSync(userpayload.password, 10)
        }
    }
    try {
        const exits = await test.findOne({ where: { Email: userpayload.Email } })
        console.log(exits);
        if (exits) {
            return res.status(200).send({
                massage: "user already exits",
                status: 422,
                data: exits

            })
        } else {
            const result = await test.create(data)
            return res.status(201).send({
                massage: "user added successfully",
                status: 201,
                data: result
            })

        }
    } catch {
        return res.status(500).json({
            massage: 'internal server Error',
            status: 500
        })
    }

}
///////////////////////////////////////////////////////////////////////////////////////////
GetbyId = async (req, res) => {
    try {
        const exits = await test.findOne({ where: { id: req.params.id } })
        if (exits) {
            return res.status(200).send({
                status: 200,
                data: exits
            })
        } else {
            return res.status(400).json({
                massage: 'Data  not found ' || "Bad Request",
                status: 400
            })
        }
    }
    catch {
        return res.status(500).json({
            massage: 'internal server Error',
            status: 500
        })
    }
}
///////////////////////////////////////////////////////////////////////////////////
UpdatebyId = async (req, res) => {
    const Schema = Joi.object({
        Name: Joi.string()
            .min(5)
            .max(30)
            .optional(),
        Email: Joi.string()
            .email()
            .min(5)
            .max(50)
            .optional(),
        password: Joi.string()
            .min(8)
            .max(16)
            .optional()
    });
    let validateSchema = Schema.validate(req.body)
    // console.log(validateSchema);
    let userpayload;
    if (validateSchema.error) {
        return res.status(400).json({
            massage: validateSchema.error.massage || "Bad Request",
            code: 400
        })
    } else {
        userpayload = validateSchema.value
        userpayload["updatedAt"]=Date.now()
        // console.log(userpayload)

    }
    try {
        const result = await test.update(userpayload, {
            where: { id: req.params.id }
        })
        return res.status(200).send({
            massage: "user data update",
            status: 200,
            data: result
        })

    } catch {
        return res.status(400).json({
            massage: 'Bad request',
            status: 500
        })
    }
}


////////////////////////////////////////////////////////////////////////////////////


DeletebyId=async (req,res)=>{
    try {
        const exits = await test.destroy({ where: { id: req.params.id } })
        if (exits) {
            return res.status(200).send({
                massage:"user data delete",
                status: 200,
            })
        } else {
            return res.status(400).json({
                massage: 'Data  not found ' || "Bad Request",
                status: 400
            })
        }
    }
    catch {
        return res.status(500).json({
            massage: 'internal server Error',
            status: 500
        })
    }

}
//////////////////////////////////////////////////////////////////////

getAllData=async (req,res)=>{
    const exits = await test.findAll()
        console.log(exits)
    try {
        const exits = await test.findAll()
        console.log(exits)
        if (exits) {
            return res.status(200).send({
                massage:"find all Data",
                status: 200,
                deta:exits
            })
        } else {
            return res.status(400).json({
                massage: 'Data not found ' || "Bad Request",
                status: 400
            })
        }
    }
    catch {
        return res.status(500).json({
            massage: 'internal server Error',
            status: 500
        })
    }
}

DeleteAllData=async (req,res)=>{
    try {
        const exits = await test.destroy({truncate:true})

            return res.status(200).send({
                massage:" delete Alldata" ,
                status: 200,

    })}
    catch {
        return res.status(400).json({
            massage: 'data not found',
            status: 400
        })
    }

}


module.exports = { CreateUser, GetbyId, UpdatebyId ,DeletebyId,getAllData ,DeleteAllData}
const { Admin } = require("../Model/admin")
const bcrypt = require('bcryptjs')
const register = async (req, res) => {
    try {
        const { email, password } = req.body
        const hash = await bcrypt.hash(password, 10)
        req.body.password = hash
        const find = new Admin(req.body)
        const result = await find.save()

        if (result) {
            res.send({
                'message': 'Registered Successfull wait for approval'
            })
        }

    } catch (error) {
        res.send({
            'message': error.message
        })

    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const find = await Admin.find({ email: email })
        if (find) {
            const result=await bcrypt.compare(password,find[0].password)

            if(result){
                res.send({
                    'message':'Login Successful',
                    'user':find[0]
                })
            }else{
                res.status(401).send({
                    'message':'Password Wrong'
                })
            }
       }

    } catch (error) {
        res.send({
            'message':error.message
        })
    }
}

module.exports = {
    register,login
}
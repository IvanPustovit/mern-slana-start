const {Router}=require('express')
const { userRegister, userLogin } = require('../Controllers/UserControler')
const {userValidation } = require('../middleware/validatedUser')


const router = Router()


router.post('/register',userValidation, userRegister)
router.post('/login', userValidation, userLogin)

module.exports = router
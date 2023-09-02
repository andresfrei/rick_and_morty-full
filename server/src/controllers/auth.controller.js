const {
  loginService,
  registerService,
  authUserService,
  resendValidation,
  validateUserService
} = require('../services/auth.service')

// Controlador para login | Recibe passport por body
const loginController = async (req, res) => {
  try {
    const { body } = req
    const result = await loginService(body)
    res.status(200).json(result)
  } catch (error) {
    return res.status(401).json({ message: error.message })
  }
}

// Controlador para hacer logout
const loguotController = (req, res) => {

}

// Controlador para iniciar session con token
const authController = async (req, res) => {
  try {
    const { idUser } = req.session

    // Le paso como popcion que busque en cache
    const result = await authUserService(idUser, { cache: true })

    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Controlador para registrar usuario
// Recibe los datos por body
const registerController = async (req, res) => {
  const { body } = req
  try {
    // Llamo al servicio. Si completa da true, sino throe
    await registerService(body)
    const message = 'User created. Needs to be validated'
    return res.status(201).json({ message })
  } catch (error) {
    return res.status(401).json({ message: error.message })
  }
}

// Controlador para validar un usuario
//! Debe recibir el token por parametro REVISAR
const userValidationController = async (req, res) => {
  try {
    const { idUser } = req.session
    await validateUserService(idUser)
    res.status(200).json({ message: 'User validate' })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

// Volver a enviar mensaje de validacion
const sendEmailController = async (req, res) => {
  const { email } = req.params
  try {
    await resendValidation(email)
    res.status(201).json({ message: 'The notification was sent to email: ' + email })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

module.exports = {
  loginController,
  loguotController,
  registerController,
  authController,
  sendEmailController,
  userValidationController
}

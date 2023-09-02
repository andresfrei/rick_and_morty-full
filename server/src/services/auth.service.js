const { createToken } = require('../libs/handleToken')
const { sendNotificationUserValidate } = require('./notification.service')
const { findUser, createUser, findUserData } = require('./user.service')
const { findAllService } = require('./collection.service')

const Cache = require('../libs/classCache')

const cacheSessions = new Cache() // Cacheo de sessiones

const loginService = async ({ email, password }) => {
  // Busco por el email
  const user = await findUser({ email })

  // Validacion de usuario
  if (!user) throw new Error('USER_NOT_FOUND')
  if (user.status === 0) throw new Error('USER_REQUIRE_VALIDATE')
  if (!user.comparePassword(password)) throw new Error('PASSWORD_INVALID')

  // Creo un token con id idUsuario
  const token = createToken({ idUser: user.id })

  // Doy formato de salida
  const session = {
    id: user.id,
    name: user.name,
    email,
    status: user.status
  }

  // Guardo en cache la sesion
  cacheSessions.addItem(session.id, session)

  // Busco si tiene coleccion
  const collection = await findAllService(user.id)

  return { session, collection, token }
}
// Valido por idUsuario (token)
const authUserService = async (idUser, options) => {
  const { cache } = options
  let user

  // Busco si está en cache dependiendo la peticion
  if (cache) user = cacheSessions.findItem(idUser)

  // Si no esta en cache busco el usuario
  if (!user) {
    user = await findUserData({ id: idUser })
    if (!user) throw new Error('USER_NOT_FOUND')
    if (user.status === 0) throw new Error('USER_REQUIRE_VALIDATE')
  }

  // Busco la colleccion del ususario
  const collection = await findAllService(idUser)

  // Doy dormato de salida
  const { name, status, email } = user
  const session = { id: idUser, name, status, email }

  // Guardo en caché
  cacheSessions.addItem(idUser, session)

  return { session, collection }
}

const registerService = async (data) => {
  const { email } = data

  // Verifico si existe
  const user = await findUser({ email })
  if (user) throw new Error('USER_EXIST')

  // Creo el nuevo ususario
  const newUser = await createUser(data)

  // Envío noficiacion de validacion
  sendNotificationUserValidate(newUser)

  return newUser
}

const validateUserService = async (id) => {
  const user = await findUser({ id })

  // Valido usuario
  if (!user) throw new Error('USER_NOT_FOUND')
  if (user.status !== 0) throw new Error('INVALID TOKEN')

  // Actualizo usuario
  user.status = 1
  await user.save()

  return true
}

const resendValidation = async (email) => {
  const user = await findUser({ email })

  // Valido ususario
  if (!user) throw new Error('USER_NOT_FOUND')
  if (user.status !== 0) throw new Error('USER_ALREADY_VALIDATED')

  // Envío noficiacion de validacion
  sendNotificationUserValidate(user)

  return true
}

const validateSessionService = async (session) => {
  let user

  const { idUser } = session

  // Busco en la cache
  user = cacheSessions.findItem(idUser)
  if (user) return user

  // Busco en DB
  user = await findUserData({ id: idUser })
  if (!user) throw new Error('USER_NOT_FOUND')

  // Guardo en cache
  cacheSessions.addItem(user.id, user)

  return user
}

module.exports = {
  loginService,
  registerService,
  resendValidation,
  authUserService,
  validateUserService,
  validateSessionService
}

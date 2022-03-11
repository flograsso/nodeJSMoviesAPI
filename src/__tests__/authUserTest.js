const request = require('supertest')
const app = require('../app')

// Testeo el endpoint de autenticacion
describe('Envio credenciales esperando obtener token', () => {
  it('Obtengo token de autenticacioj', async () => {
    const res = await request(app)
      .post('/user/auth')
      .send({
        "email":"federico@federico.com", // Asegurarse previamente que este usuario y contraseña se encuentren en la base de datos
        "firstName":"Federico",
        "lastName":"Federico2",
        "password":"superStronger!"
      })
    expect(res.statusCode).toEqual(200) // Valido que me devuelva el HTTP code 200 
    expect(res.body).toHaveProperty("access-token"); // Valido que me retorne el access-token
    
  })
})

{

}
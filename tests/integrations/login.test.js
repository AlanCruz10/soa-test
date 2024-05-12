const request = require('supertest');
const app = require('../../app.js');

describe('Login test', () => {
    it('debería autenticar con credenciales válidas', (done) => {
        request(app)
            .post('/api/v1/login')
            .send({ username: 'user_i', password: 'pass_i' })
            .end((err, res) => {
                if (err) return done(err);
                if (res.status !== 200) {
                    return done(new Error(`Se esperaba estado 200 pero se recibió ${res.status}`));
                }
                if (!res.body || !res.body.message) {
                    return done(new Error("La respuesta no contiene la propiedad 'message'"));
                }
                done();
            });
    });
});
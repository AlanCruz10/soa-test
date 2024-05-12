const request = require('supertest');
const app = require('../../app.js');

describe('User test', () => {
    it('debería obtener usuario existente', (done) => {
        request(app)
            .get('/api/v1/users/user')
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

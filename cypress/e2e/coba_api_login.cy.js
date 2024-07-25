describe('API Testing', () => { // test scenario
    it('Should return status code 200', () => { // test case
      cy.request('http://google.com/') // url endpoint
        .then((response) => {
          expect(response.status).to.equal(200); // verifikasi status code
        });
    });
  });

describe('Login API Testing', () => { // test scenario
    // TEST CASE 1
    it('Success Login', () => { // test case
      cy.request({
        method: 'POST', // http request
        url: 'http://barru.pythonanywhere.com/login', // url 
        body: {
          email: "batch278@gmail.com",
          password: "batch27" 
        },
        })
        .then((response) => {
          expect(response.status).to.equal(200); // verifikasi status code
          expect(response.body.status).to.equal('SUCCESS_LOGIN'); // verifikasi response body dan didalam value dari status
          expect(response.body.message).to.equal('Anda Berhasil Login'); // verifikasi response body dan didalam value dari message
        });
    });

    // TEST CASE 2
    it('Failed login with invalid email', () => {
        cy.request({
          method: 'POST',
          url: 'http://barru.pythonanywhere.com/login',
          body: {
            email: "invalidemail@gmaixx.com",
            password: "password123"
          },
        }).then((response) => {
          expect(response.status).to.equal(420);
          expect(response.body.data).to.equal ("User's not found");
          expect(response.body.message).to.equal('Email atau Password Anda Salah');
          expect(response.body.status).to.equal('FAILED_LOGIN');
        });
      });

    // TEST CASE 3
    it('Failed login with empty password', () => {
      cy.request({
        method: 'POST',
        url: 'http://barru.pythonanywhere.com/login',
        body: {
          email: "batch278@gmail.com",
          password: ""
        },
      }).then((response) => {
        expect(response.status).to.equal(420);
        expect(response.body.data).to.equal('Cek Formulir Anda');
        expect(response.body.message).to.equal('Password tidak boleh kosong');
        expect(response.body.status).to.equal('FAILED_LOGIN');
      });
    });

    // TEST CASE 4
    it('Failed login with missing email Field', () => {
      cy.request({
        method: 'POST',
        url: 'http://barru.pythonanywhere.com/login',
        body: {
          password: "password123"
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(500);
        expect(response.body.message).to.equal('Internal Server Error');
      });
    });

    // TEST CASE 5
    it('Failed Login with incorrect Password', () => {
      cy.request({
        method: 'POST',
        url: 'http://barru.pythonanywhere.com/login',
        body: {
          email: "batch278@gmail.com",
          password: "incorrectpassword"
        },
      }).then((response) => {
        expect(response.status).to.equal(420);
        expect(response.body.data).to.equal ("User's not found");
        expect(response.body.message).to.equal('Email atau Password Anda Salah');
        expect(response.body.status).to.equal('FAILED_LOGIN');
      });
    });

    // TEST CASE 6
    it('Failed login with invalid HTTP Method', () => {
      cy.request({
        method: 'GET',
        url: 'http://barru.pythonanywhere.com/login',
        body: {
          email: "batch278@gmail.com",
          password: "batch27"
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(405);
        expect(response.body.message).to.equal('Method Not Allowed');
      });
    });

    // TEST CASE 7
    it('Failed login because password too short', () => {
      cy.request({
        method: 'POST',
        url: 'http://barru.pythonanywhere.com/login',
        body: {
          email: "batch278@gmail.com",
          password: "short"
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Password anda terlalu pendek');
      });
    });
});
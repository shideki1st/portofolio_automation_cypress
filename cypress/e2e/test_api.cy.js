describe('API Testing', () => { // test scenario
    it('Should return status code 200', () => { // test case
      cy.request('http://www.httpstat.us/200') // url endpoint
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
        }
        })
        .then((response) => {
          expect(response.status).to.equal(200); // verifikasi status code
          expect(response.body.status).to.equal('SUCCESS_LOGIN'); // verifikasi response body dan didalam value dari status
          expect(response.body.message).to.equal('Anda Berhasil Login'); // verifikasi response body dan didalam value dari message
        });
    });
    // TEST CASE 2
    it('Failed Login with empty email', () => { // test case
      cy.request({
        method: 'POST', // http request
        url: 'http://barru.pythonanywhere.com/login', // url 
        body: {
          email: "",
          password: "batch27" 
        }
        })
        .then((response) => {
          expect(response.status).to.equal(420); // verifikasi status code
          expect(response.body.status).to.equal('FAILED_LOGIN'); // verifikasi response body dan didalam value dari status
        });
    });
    // TEST CASE 3
    // TEST CASE 4
    // TEST CASE 5
});

describe('Register API Testing', () => { // test scenario
  // TEST CASE 1
  it('Success Regist New User', () => { // test case
    cy.request({
      method: 'POST', // http request
      url: 'http://barru.pythonanywhere.com/register', // url 
      body: {
        email: "bbbsuasdhuas@gmail.com",
        password: "batch29",
        name: "batch29" 
      }
      })
      .then((response) => {
        expect(response.status).to.equal(200); // verifikasi status code
        expect(response.body.status).to.equal('SUCCESS_REGISTER'); // verifikasi response body dan didalam value dari status
        expect(response.body.message).to.equal('created user!'); // verifikasi response body dan didalam value dari message
      });
  });
  // TEST CASE 2
  // TEST CASE 3
  // TEST CASE 4
  // TEST CASE 5
  // TEST CASE 6
});
describe('Register API Testing', () => { // test scenario

    function getRandomEmail() {
      const randomString = Math.random().toString(36).substring(2, 15);
      return `user_${randomString}@aja.com`;
    }
  
    // TEST CASE 1
    it('Success Register New User', () => { // test case
      cy.request({
        method: 'POST', // http request
        url: 'http://barru.pythonanywhere.com/register', // url 
        body: {
          email: getRandomEmail(),
          password: "rizky",
          name: "rizky" 
        }
      })
      .then((response) => {
        expect(response.status).to.equal(200); // verify status code
        expect(response.body.status).to.equal('SUCCESS_REGISTER'); // verify response body and value of status
        expect(response.body.message).to.equal('created user!'); // verify response body and value of message
      });
    });
  
    // TEST CASE 2
    it('Register with Existing Email', () => { // test case
      const existingEmail = getRandomEmail();
      cy.request({
        method: 'POST',
        url: 'http://barru.pythonanywhere.com/register',
        body: {
          email: existingEmail,
          password: "password",
          name: "user" 
        }
      }).then((response) => {
        cy.request({
          method: 'POST',
          url: 'http://barru.pythonanywhere.com/register',
          body: {
            email: existingEmail,
            password: "password",
            name: "user" 
          },
          failOnStatusCode: false
        })
        .then((response) => {
          expect(response.status).to.equal(420); // verify status code for conflict
          expect(response.body.error).to.equal(); // verify response body and value of error
        });
      });
    });
  
    // TEST CASE 3
    it('Register with Invalid Email Format', () => { // test case
      cy.request({
        method: 'POST',
        url: 'http://barru.pythonanywhere.com/register',
        body: {
          email: "invalidemail",
          password: "password",
          name: "user" 
        },
        failOnStatusCode: false
      })
      .then((response) => {
        expect(response.status).to.equal(420); // verify status code for bad request
        expect(response.body.message).to.equal('Cek kembali email anda'); // verify response body and value of error
      });
    });
  
    // TEST CASE 4
    it('Register with Missing Password', () => { // test case
      cy.request({
        method: 'POST',
        url: 'http://barru.pythonanywhere.com/register',
        body: {
          email: getRandomEmail(),
          name: "user" 
        },
        failOnStatusCode: false
      })
      .then((response) => {
        expect(response.status).to.equal(500); // verify status code for bad request
        expect(response.body.message).to.equal(); // verify response body and value of error
      });
    });
  
    // TEST CASE 5
    it('Register with Empty Name Field', () => { // test case
      cy.request({
        method: 'POST',
        url: 'http://barru.pythonanywhere.com/register',
        body: {
          email: getRandomEmail(),
          password: "password",
          name: "" 
        },
        failOnStatusCode: false
      })
      .then((response) => {
        expect(response.status).to.equal(420); // verify status code for bad request
        expect(response.body.message).to.equal('Gagal Registrasi'); // verify response body and value of error
      });
    });

      // TEST CASE 6
  it('Register with Weak Password', () => { // test case
    cy.request({
      method: 'POST',
      url: 'http://barru.pythonanywhere.com/register',
      body: {
        email: getRandomEmail(),
        password: "123",
        name: "user" 
      },
      failOnStatusCode: false
    })
    .then((response) => {
      expect(response.status).to.equal(420); // verify status code for bad request
      expect(response.body.message).to.equal('Password too weak'); // verify response body and value of error
    });
  });

  // TEST CASE 7
  it('Register with Missing Email Field', () => { // test case
    cy.request({
      method: 'POST',
      url: 'http://barru.pythonanywhere.com/register',
      body: {
        password: "password",
        name: "user" 
      },
      failOnStatusCode: false
    })
    .then((response) => {
      expect(response.status).to.equal(500); // verify status code for bad request
      expect(response.body.message).to.equal(); // verify response body and value of error
    });
  });

  // TEST CASE 8
  it('Register with Missing Name Field', () => { // test case
    cy.request({
      method: 'POST',
      url: 'http://barru.pythonanywhere.com/register',
      body: {
        email: getRandomEmail(),
        password: "password" 
      },
      failOnStatusCode: false
    })
    .then((response) => {
      expect(response.status).to.equal(500); // verify status code for bad request
      expect(response.body.message).to.equal(); // verify response body and value of error
    });
  });

});
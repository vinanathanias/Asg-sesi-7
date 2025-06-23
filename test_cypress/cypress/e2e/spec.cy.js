describe('API Testing for Products Endpoint', () => {
  // =======================================================================
  // TEST CASE 1: GET
  // =======================================================================
  it('GET', () => {
    cy.request('GET', `/public/v2/users`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  const bearer_token = '7f2eb074cb40a5eff6a487efb0dc57dd91138731fcfc754d3062288f64353313';
  let user_id = 0;

  // =======================================================================
  // TEST CASE 2: POST
  // =======================================================================
  it('POST', () => {

    const name = 'Vinaaaaa'
    const email = `vina.${Date.now()}@gmail.com`

    cy.request({
      method: 'POST',
      url: 'https://gorest.co.in/public/v2/users',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearer_token}`
      },
      body: {
        "name": name,
        "gender": "female",
        "email": email,
        "status": "active"
      }
    }).then((response) => {
      expect(response.status).to.eq(201);

      expect(response.body).to.not.be.null;

      expect(response.body.name).to.eq(name);
      expect(response.body.email).to.eq(email);
      expect(response.body.status).to.eq("active");
      user_id = response.body.id;
      cy.log(`New user created with ID: ${response.body.id}`);
    });
  });

  // =======================================================================
  // TEST CASE 3: PUT
  // =======================================================================
  it('PUT', () => {
    const updated_name = 'Vinathaniaaaaaa'
    const updated_email = 'aksdkdkadjkqdq@gmail.com'
    const updated_data = {
      "name": updated_name,
      "gender": "female",
      "email": updated_email,
      "status": "active"
    }

    cy.request({
      method: 'PUT',
      url: `https://gorest.co.in/public/v2/users/${user_id}`,
      headers: {
        'Authorization': `Bearer ${bearer_token}`
      },
      body: updated_data
    }).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body.name).to.eq(updated_data.name);
      expect(response.body.gender).to.eq(updated_data.gender);
      expect(response.body.email).to.eq(updated_data.email);
      expect(response.body.status).to.eq(updated_data.status);

      expect(response.body.id).to.eq(user_id);
    });
  });

  // =======================================================================
  // TEST CASE 4: DELETE
  // =======================================================================
  it('DELETE', () => {
    cy.request({
      method: 'DELETE',
      url: `https://gorest.co.in/public/v2/users/${user_id}`,
      headers: {
        'Authorization': `Bearer ${bearer_token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});

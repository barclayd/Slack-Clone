import axios from 'axios';

describe('User Resolvers', () => {
  it('tests the allUser query', async () => {
    const response = await axios.post('http://localhost:4000/graphql', {
      query: `
        query {
          allUsers {
            id
            email
            username
          }
        }
      `,
    });
    const {
      data: { data },
    } = response;
    expect(data).toMatchObject({
      allUsers: [],
    });
  });

  it('registers a new user', async () => {
    const response = await axios.post('http://localhost:4000/graphql', {
      query: `
        mutation {
          register(username: "test", email: "t@t.com", password: "testing") {
            ok
            errors {
              path
              message
            }
            user {
              username
              email
            }
          }
        }
      `,
    });
    const {
      data: { data },
    } = response;
    expect(data).toMatchObject({
      register: {
        ok: true,
        errors: null,
        user: {
          username: 'test',
          email: 't@t.com',
        },
      },
    });
  });

  it('successfully logs in a registered user', async () => {
    const response = await axios.post('http://localhost:4000/graphql', {
      query: `
        query {
          login(email:"t@t.com", password:"testing") {
            ok
          }
        }
      `,
    });
    const {
      data: { data },
    } = response;
    expect(data).toMatchObject({
      login: {
        ok: true,
      },
    });
  });

  it('allows a user to create a new team', async () => {
    const loginResponse = await axios.post('http://localhost:4000/graphql', {
      query: `
        query {
          login(email:"t@t.com", password:"testing") {
            ok
            token
            refreshToken
          }
        }
      `,
    });
    const {
      data: {
        data: {
          login: { token, refreshToken },
        },
      },
    } = loginResponse;
    const createTeamResponse = await axios.post(
      'http://localhost:4000/graphql',
      {
        query: `
        mutation {
          createTeam(name:"test") {
            ok
            team {
              name
              channels {
                name
              }
            }
          }
        }
      `,
      },
      {
        headers: {
          'x-token': token,
          'x-refresh-token': refreshToken,
        },
      },
    );
    const {
      data: { data },
    } = createTeamResponse;
    expect(data).toMatchObject({
      createTeam: {
        ok: true,
        team: {
          name: 'test',
          channels: [
            {
              name: 'general',
            },
          ],
        },
      },
    });
  });
});

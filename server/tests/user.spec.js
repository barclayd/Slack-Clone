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
});

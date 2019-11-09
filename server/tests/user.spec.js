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
    const { data } = response;
    expect(data).toMatchObject({
      data: {
        allUsers: [
          {
            id: 1,
            email: 't@t.com',
            username: 'test',
          },
          {
            id: 2,
            email: 't1@t.com',
            username: 'test2',
          },
          {
            id: 3,
            email: 't2@t.com',
            username: 'tester2',
          },
        ],
      },
    });
  });
});

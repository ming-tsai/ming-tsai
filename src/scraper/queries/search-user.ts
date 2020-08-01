export const searchUserQuery = `
query searchUser($login: String!) {
    user(login: $login) {
      avatarUrl(size: 60)
      name
      url
      login
    }
  } 
`;

export type SearchUsersQueryResponse = {
  user: {
    avatarUrl: string,
    name: string,
    url: string,
    login: string
  }
};
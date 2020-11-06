export const searchUserQuery = `
query searchUser($login: String!) {
  user(login: $login) {
    avatarUrl
    name
    url
    login
  }
  repository(name: $login, owner: $login) {
    forkCount
    stargazerCount
  }
}
`;

export type SearchUsersQueryResponse = {
  user: {
    avatarUrl: string,
    name: string,
    url: string,
    login: string,
  },
  repository: {
    stargazerCount: number
  }
};
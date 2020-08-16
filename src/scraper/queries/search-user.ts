export const searchUserQuery = `
query searchUser($login: String!) {
  user(login: $login) {
    avatarUrl
    name
    url
    login
    followers {
      totalCount
    }
  }
}
`;

export type SearchUsersQueryResponse = {
  user: {
    avatarUrl: string,
    name: string,
    url: string,
    login: string,
    followers: {
      totalCount: number,
    }
  }
};
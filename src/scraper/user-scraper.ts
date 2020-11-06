import { SearchUsersQueryResponse, searchUserQuery } from './queries/search-user';
import { debug } from 'console';
import { client } from './client';
import { users } from '../data/users';
import { User } from '../models/User';

const searchUsers = async (
    login: string,
    fn: (results: SearchUsersQueryResponse) => Promise<void>
): Promise<void> => {
    debug(`Searching users:`, { login })
    try {
        const results = await client.request<SearchUsersQueryResponse>(searchUserQuery, {
            login
        })
        await fn(results);
    } catch (error) {
        console.log(error);
    }
};

const toUser = (source: SearchUsersQueryResponse): User => {
    return {
        avatarUrl: source.user.avatarUrl,
        login: source.user.login,
        name: source.user.name,
        url: source.user.url,
        stargazerCount: source.repository.stargazerCount,
    };
}

export const scrapeUsers = async (): Promise<Array<User>> => {
    let result: Array<User> = [];
    try {
        for (const user of users) {
            await searchUsers(user, async (res) => {
                if (res?.user != null) {
                    const u = toUser(res);
                    result.push(u);
                }
            })
        }
        result.sort((a, b) => b.stargazerCount - a.stargazerCount);
    } catch (error) {
        console.log(error);
    }
    return result;
}
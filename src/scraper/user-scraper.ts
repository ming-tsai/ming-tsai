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
        totalfollowers: source.user.followers.totalCount,
    };
}

export const scrapeUsers = async (): Promise<void> => {
    try {
        for (const user of users) {
            await searchUsers(user, async (result) => {
                if (result?.user != null) {
                    const u = toUser(result);
                    Users.push(u);
                }
            })
        }
        Users.sort((a, b) => b.totalfollowers - a.totalfollowers);
    } catch (error) {
        console.log(error);
    }
}

export const Users = new Array<User>();

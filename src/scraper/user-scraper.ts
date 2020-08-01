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

    const results = await client.request<SearchUsersQueryResponse>(searchUserQuery, {
        login
    })

    await fn(results);
};

const toUser = (source: SearchUsersQueryResponse) : User => {
    return {
        avatarUrl: source.user.avatarUrl,
        login: source.user.login,
        name: source.user.name,
        url: source.user.url
    };
}

export const scrapeUsers = async (): Promise<void> => {
    try {
        for(const user of users)
        {
            await searchUsers(user, async(result) => {
                const u = toUser(result);
                Users.push(u);
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const Users = new Array<User>();
import { GraphQLClient } from 'graphql-request'

require('dotenv').config();

export const client = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    method: 'POST',
});
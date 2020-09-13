import { GraphQLClient } from 'graphql-request'
import { Headers } from 'cross-fetch';

global.Headers = global.Headers || Headers;

require('dotenv').config();

export const client = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    method: 'POST',
});
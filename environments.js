import { config } from 'dotenv';

config();

export const environment = {
    AMQP_URL: process.env.AMQP_URL,
    JSON_SECRET: process.env.JSON_SECRET,
    QUEUE: process.env.QUEUE,
    MONGO: process.env.MONGO
};
import { createClient } from 'redis';
import { CustomError } from '../models/custom-error.model';
import { NextFunction } from 'express';

const getRedisClient = (next : NextFunction) => {

let password = "", host = "", port = -1, client = null;
try {
    // console.log(process.env.REDIS_PASSWORD,process.env.REDIS_PORT,process.env.REDIS_URL)
    password = process.env.REDIS_PASSWORD;
    host = process.env.REDIS_URL;
    port = parseInt(process.env.REDIS_PORT);
    console.log(host, port)
    if(Number.isNaN(port)) throw new Error("Invalid PORT")
    client = createClient({
        password: password,
        socket: {
            host: host,
            port: port
        }
    })
    
    client.on('error', err => {
        console.log('Redis Client Error', err);
        throw new CustomError("Redis Client Error", 500, 'Database Error', err)
    })
    if(!client.isOpen)
        client.connect();
} catch (error) {
    next(error);
}
    return client;
}

export default getRedisClient;

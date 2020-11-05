import {Request,Response,Express} from 'express'

export interface Context{
    req:Request & {session:Express.Session},
    res:Response,
}
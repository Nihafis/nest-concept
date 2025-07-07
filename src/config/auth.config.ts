//  jwt:
//  secret

import { registerAs } from "@nestjs/config";



//  expiresIn
export interface AuthConfig {
    jwt: {
        secret: string,
        expiresIn: string;
    }
}


export const AuthConfig = registerAs('auth', (): AuthConfig => ({
    jwt: {
        secret: process.env.JWT_SECRET as string,
        expiresIn: process.env.JWT_EXPIRES_IN ?? '60m'
    }
}))
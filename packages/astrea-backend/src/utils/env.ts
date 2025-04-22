const getEnv = (key: string, defaultValue? : string):string => {
    const value = process.env[key] || defaultValue;
    if (value === undefined) {
        throw new Error(`Environment variable: ${key} is missing`);
    }
    return value;
}

export const MONGO_URI = getEnv('MONGO_URI');
export const PORT = getEnv('PORT');
export const JWT_SECRET = getEnv('JWT_SECRET');
export const JWT_REFRESH_SECRET = getEnv('JWT_REFRESH_SECRET');


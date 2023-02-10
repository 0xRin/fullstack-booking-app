import bcrypt from 'bcryptjs'

export const checkUserPassword = async (reqPassword: string, storedPassword: string) => {
    return await bcrypt.compare(reqPassword, storedPassword)
}
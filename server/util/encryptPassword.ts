import bcrypt from 'bcryptjs'

// encrypts given password
export const encryptPassword = async (password: string): Promise<String> => {

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    return encryptedPassword
}
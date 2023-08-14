import { object, string } from "zod";;

// ZOD requirements
export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required',
        }),
        password: string({
            required_error: 'Password is required',
        }),
    })
})
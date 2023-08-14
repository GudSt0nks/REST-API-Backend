import exp from "constants";
import { TypeOf, object, string } from "zod";

// ZOD requirements
export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required'
        }),
        password: string({
            required_error: 'Password is required'
        }).min(6, 'Password is too short - should be 6 characters minimum'),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required'
        }),
        email: string({
            required_error: 'Email is required'
        }).email('Not a valid email')
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords don\'t match',
        path: ['passwordConfirmation']
    })
})

export type createUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfiramion">;
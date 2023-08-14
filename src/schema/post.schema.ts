import { TypeOf, object, string } from "zod";

// ZOD requirements
export const createPostSchema = object({
    body: object({
        title: string({
            required_error: 'Title is required'
        }),
        Text: string({
            required_error: 'Text is required'
        }),
    })
})

export type createPostInput = TypeOf<typeof createPostSchema>;
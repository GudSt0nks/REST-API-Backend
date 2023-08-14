# Simple REST API App's Backend

Used technologies: TypeScript, Express, MongoDB(mongoose), JavaWebTokens 

***

# API

- POST   |{{endpoint}}/api/users     --- create new user
    {
        "email": -email- string,
        "password": -password- string,
        "passwordConfirmation": -password confirmation- string,
        "name": -name- string
    }

- POST   |{{endpoint}}/api/sessions  --- create new session (sign in)
    {
        "email": -email- string,
        "password": -password- string
    }

- GET    |{{endpoint}}/api/sessions  --- get users valid sessions

- DELETE |{{endpoint}}/api/sessions  --- delete current session (sign out)

- POST   |{{endpoint}}/api/posts     --- create new post
    {
        "title": -title- string,
        "text": -text- string
    }

- GET    |{{endpoint}}/api/posts     --- get posts
    {
        "target": -published user or "any"- string
    }
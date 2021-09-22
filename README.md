# TypedExpress

This project shows how to type Express.Request and Express.Response.

Basically the secret sauce is something like:

```
import Express from 'express';
import { Send, Query } from 'express-serve-static-core';


export interface TypedRequestBody<T> extends Express.Request {
    body: T
}

export interface TypedRequestQuery<T extends Query> extends Express.Request {
    query: T
}

export interface TypedRequest<T extends Query, U> extends Express.Request {
    body: U,
    query: T
}


export interface TypedResponse<ResBody> extends Express.Response {
    json: Send<ResBody, this>;
}

```

Start with one of:

```text
nodemon
F5 in VSCode
node.exe -r ts-node/register/transpile-only ./src/index.ts
node.exe -r ts-node/register ./src/index.ts
```

Check the source code for routes (try `/ping`).

## Enjoy :)

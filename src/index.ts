import Express from 'express';
import http from 'http';
import { Send, Query } from 'express-serve-static-core';


let app: Express.Application | undefined = undefined;
const PORT = 3001;

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



// *************************************************
// Setup Express
// *************************************************

app = Express();
app.use(Express.urlencoded({ extended: true }));

// *************************************************
// Routes
// *************************************************

app.get('/', function (_req: Express.Request, res: Express.Response) {
    res.status(200).json({
        "Foo": "Bar",
        "Time": new Date().toISOString()
    });
});


app.get('/article/:id', function (req: TypedRequestQuery<{ id: string }>, res: Express.Response) {

    const id = req.query.id;
    res.status(200).json({ ID: id });

});

app.put('/article/:id', function (req: TypedRequest<{ id: string }, { name: string }>, res: Express.Response) {

    console.log(`Updating article ${req.query.id}`);
    console.log(`setting name to ${req.body.name}`);
    res.status(200).json({ Success: true });

});

app.get('/ping', function (_req: Express.Request, res: TypedResponse<{ Pong: string }>) {

    res.status(200).json({ "Pong": new Date().toISOString() });

});


// *************************************************
// Add 404 handler
// *************************************************

app.use(function (_req: Express.Request, res: Express.Response) {
    res.status(404).send("Not found");
});

// *************************************************
// Start server
// *************************************************

http.createServer(app).listen(PORT, () => console.log(`Webserver running at http://localhost:${PORT}/`));



import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import ArticlesController from "articles/articles.controller";

class App {
    public app: express.Application;
    public port: number;
   
    constructor(controllers: ArticlesController[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(express.json({limit: '25mb'}));
        this.app.use(express.urlencoded({limit: '25mb'}));
        this.app.use(bodyParser.json());
		this.app.use(cors());
    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/api/", controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Article API listening on the port ${this.port}`);
        });
    }
}

export default App;

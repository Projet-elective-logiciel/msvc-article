import * as express from "express";
import Articles from "./articles.interface";
import articleModel from "./articles.model";

class ArticlesController {
    public path = "/article";
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getArticles);
        this.router.get(`${this.path}/:_id`, this.getArticle);
        this.router.post(this.path, this.createArticle);
        this.router.put(`${this.path}/:_id`, this.updateArticle);
        this.router.delete(`${this.path}/:_id`, this.deleteArticle);
    }

    private getArticles(req: express.Request, res: express.Response) {
       
        articleModel.find().then((articles) => {
            res.status(200).json(articles);
        });
       
    }
    private getArticle(req: express.Request, res: express.Response) {
        const _id = req.params._id;
        
        articleModel.find({_id: _id }).then((articles) => {
            res.status(200).json(articles);
        });
    
    }

    private createArticle(req: express.Request, res: express.Response) {
        const articleData: Articles = req.body;

        if (!articleData.description || !articleData.category || !articleData.price) {
            res.status(400).send("Missing article data");
            return;
        }
        console.log(articleData);
        const createdArticle = new articleModel(articleData);
        createdArticle.save().then((savedArticle) => {
            res.send(savedArticle);
        });
       
    }

    private updateArticle(req: express.Request, res: express.Response) {
        const articleData: Articles = req.body;
        const _id = req.params._id;

        articleModel
            .findOneAndUpdate({ _id: _id}, {$set:req.body}, { new: true })
            .then((article) => {
                console.log(`Updated article restaurant: ${article._id}`);
                res.status(200).send(`Updated article restaurant: ${article._id}`);
            }).catch((err) => {
                console.log(`Update failed ${err}`);
                res.status(400).send(`Update failed ${err}`);
            })
    }

    private deleteArticle(req: express.Request, res: express.Response) {
        const _id = req.params._id;
        articleModel
            .findOneAndDelete({ _id: _id})
            .then((article) => {
                console.log(`Deleted article restaurant: ${article._id}`);
                res.status(200).send(`Deleted article restaurant: ${article._id}`);
            }).catch((err) => {
                console.log(err);
                res.status(400).send(err);
            })
    }

}

export default ArticlesController;

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
        this.router.get(this.path, this.getArticle);
        this.router.post(this.path, this.createArticle);
        this.router.put(this.path, this.updateArticle);
        this.router.delete(this.path, this.deleteArticle);
    }

    private getArticle(req: express.Request, res: express.Response) {
        const _id = req.body._id;
        if (!_id) {
            articleModel.find().then((articles) => {
                res.status(200).json(articles);
            });
        }
        else {
            articleModel.find({_id: _id }).then((articles) => {
                res.status(200).json(articles);
            });
        }
    }

    private createArticle(req: express.Request, res: express.Response) {
        const articleData: Articles = req.body;
        const _id = req.body._id;

        articleModel
            .findOne({ _id: _id })
            .then((user) => {
                if (user) {
                    console.log(`Menu with this _id : ${_id} already exists`);
                    res.status(400).send(`Menu with this _id : ${_id} already exists`);
                } else {
                    console.log(articleData);
                    const createdArticle = new articleModel(articleData);
                    createdArticle.save().then((savedArticle) => {
                        res.send(savedArticle);
                    });
        }})
    }

    private updateArticle(req: express.Request, res: express.Response) {
        const articleData: Articles = req.body;
        const _id = req.body._id;

        articleModel
            .findOneAndUpdate({ _id: _id}, articleData)
            .then((article) => {
                console.log(`Updated menu restaurant: ${article._id}`);
                res.status(200).send(`Updated menu restaurant: ${article._id}`);
            }).catch((err) => {
                console.log(`Update failed ${err}`);
                res.status(400).send(`Update failed ${err}`);
            })
    }

    private deleteArticle(req: express.Request, res: express.Response) {
        const _id = req.body._id;
        articleModel
            .findOneAndDelete({ _id: _id})
            .then((user) => {
                console.log(`Deleted menu restaurant: ${user._id}`);
                res.status(200).send(`Deleted menu restaurant: ${user._id}`);
            }).catch((err) => {
                console.log(err);
                res.status(400).send(err);
            })
    }

}

export default ArticlesController;

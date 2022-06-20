import * as express from "express";
import Articles from "./articles.interface";
import articleModel from "./articles.model";

class ArticlesController {
    public path = "/menu";
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getMenu);
        this.router.post(this.path, this.createMenu);
        this.router.put(this.path, this.updateMenu);
        this.router.delete(this.path, this.deleteMenu);
    }

    private getMenu(req: express.Request, res: express.Response) {
        const name = req.body.name;
        if (!name) {
            articleModel.find().then((menus) => {
                res.status(200).json(menus);
            });
        }
        else {
            articleModel.find({name: name }).then((menus) => {
                res.status(200).json(menus);
            });
        }
    }

    private createMenu(req: express.Request, res: express.Response) {
        const menuData: Articles = req.body;
        const name = menuData.name;

        articleModel
            .findOne({ name: name })
            .then((user) => {
                if (user) {
                    console.log(`Menu with this name : ${name} already exists`);
                    res.status(400).send(`Menu with this name : ${name} already exists`);
                } else {
                    console.log(menuData);
                    const createdMenu = new articleModel(menuData);
                    createdMenu.save().then((savedRestaurant) => {
                        res.send(savedRestaurant);
                    });
        }})
    }

    private updateMenu(req: express.Request, res: express.Response) {
        const menuData: Articles = req.body;
        const name = menuData.name;

        articleModel
            .findOneAndUpdate({ name: name}, menuData)
            .then((user) => {
                console.log(`Updated menu restaurant: ${user.name}`);
                res.status(200).send(`Updated menu restaurant: ${user.name}`);
            }).catch((err) => {
                console.log(`Update failed ${err}`);
                res.status(400).send(`Update failed ${err}`);
            })
    }

    private deleteMenu(req: express.Request, res: express.Response) {
        const name = req.body.name;
        articleModel
            .findOneAndDelete({ name: name})
            .then((user) => {
                console.log(`Deleted menu restaurant: ${user.name}`);
                res.status(200).send(`Deleted menu restaurant: ${user.name}`);
            }).catch((err) => {
                console.log(err);
                res.status(400).send(err);
            })
    }

}

export default ArticlesController;

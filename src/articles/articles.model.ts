import * as mongoose from "mongoose";
import Menu from "./articles.interface";

const articleSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    price: Number,
});

const articleModel = mongoose.model<Menu & mongoose.Document>(
    "Menu",
    articleSchema
);

export default articleModel;
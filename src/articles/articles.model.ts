import * as mongoose from "mongoose";
import Article from "./articles.interface";

const articleSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    price: Number,
    image: String
});

const articleModel = mongoose.model<Article & mongoose.Document>(
    "Article",
    articleSchema
);

export default articleModel;
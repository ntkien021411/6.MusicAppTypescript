import mongoose from "mongoose";

const favoriteSongSchema = new mongoose.Schema({
    fullName:String,
    avatar:String,
    status:String,
    slug:String,
    deleted:{
        type:Boolean,
        default:false
    },
    deletedAt:Date
},{
    timestamps : true
});
const FavoriteSong = mongoose.model('FavoriteSong', favoriteSongSchema,"favorite-songs");


export default  FavoriteSong;

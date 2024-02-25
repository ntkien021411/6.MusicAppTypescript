import mongoose from "mongoose";
import slug from "mongoose-slug-updater"
mongoose.plugin(slug);
const songSchema = new mongoose.Schema({
    title:String,
    avatar:String,
    description:String,
    singerId:String,
    topicId:String,
    like : {
        type:Number,
        default : 0
    },
    listen : {
        type:Number,
        default : 0
    },
    lyric:String,
    audio:String,
    status:String,
    slug: {
        type: String,
        slug: "title", // san-pham-1 // dựa trên title có trong model
        unique: true,
      },
    deleted:{
        type:Boolean,
        default:false
    },
    deletedAt:Date
},{
    timestamps : true
});
const Song = mongoose.model('Song', songSchema,"songs");


export default  Song;

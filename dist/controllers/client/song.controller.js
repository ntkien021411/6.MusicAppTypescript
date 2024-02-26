"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slugTopic;
    const topic = yield topic_model_1.default.findOne({
        slug: slug,
        status: "active",
        deleted: false,
    });
    const songs = yield song_model_1.default.find({
        topicId: topic.id,
        status: "active",
        deleted: false,
    }).select("avatar title slug singerId like ");
    for (const song of songs) {
        const infoSinger = yield singer_model_1.default.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false,
        });
        song["infoSinger"] = infoSinger;
    }
    res.render("client/pages/songs/list", {
        title: topic.title,
        songs: songs,
    });
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slugSong;
        const song = yield song_model_1.default.findOne({
            slug: slug,
            status: "active",
            deleted: false,
        });
        const topic = yield topic_model_1.default.findOne({
            _id: song["topicId"],
            deleted: false,
        }).select("title");
        const singer = yield singer_model_1.default.findOne({
            _id: song["singerId"],
            deleted: false,
        }).select("fullName");
        const favoriteSong = yield favorite_song_model_1.default.findOne({
            songId: song.id,
        });
        song["isFavoriteSong"] = favoriteSong ? true : false;
        res.render("client/pages/songs/detail", {
            title: "Chi tiết bài hát",
            song: song,
            singer: singer,
            topic: topic,
        });
    }
    catch (error) {
        res.send("404");
    }
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const type = req.params.typeLike;
        const id = req.params.idSong;
        const song = yield song_model_1.default.findOne({
            _id: id,
            status: "active",
            deleted: false,
        });
        const newLike = type == "like" ? song.like + 1 : song.like - 1;
        yield song_model_1.default.updateOne({
            _id: id,
        }, {
            like: newLike,
        });
        res.json({
            code: 200,
            message: "Like thành công!",
            like: newLike,
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Call API Fail!",
        });
    }
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const type = req.params.typeFavorite;
        const id = req.params.idSong;
        switch (type) {
            case "favorite":
                const existFavoriteSong = yield favorite_song_model_1.default.findOne({
                    songId: id,
                });
                if (!existFavoriteSong) {
                    const record = new favorite_song_model_1.default({
                        userId: "",
                        songId: id,
                    });
                    yield record.save();
                }
                break;
            case "unfavorite":
                yield favorite_song_model_1.default.deleteOne({
                    songId: id,
                });
                break;
            default:
                res.json({
                    code: 400,
                    message: "Call API Fail!",
                });
                break;
        }
        res.json({
            code: 200,
            message: "Like thành công!",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Call API Fail!",
        });
    }
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.idSong;
        const song = yield song_model_1.default.findOne({
            _id: id,
        });
        const listen = song.listen + 1;
        yield song_model_1.default.updateOne({
            _id: song.id,
        }, {
            listen: listen,
        });
        const newSong = yield song_model_1.default.findOne({
            _id: song.id,
        });
        res.json({
            code: 200,
            message: "Thành công!",
            listen: newSong.listen,
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Call API Fail!",
        });
    }
});
exports.listen = listen;

import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";

//[GET] /admin/songs
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false,
  });

  res.render("admin/pages/songs/index", {
    title: "Quản lý bài hát",
    songs: songs,
  });
};

//[GET] /admin/songs/create
export const createPage = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
    status: "active",
  }).select("title");
  const singers = await Singer.find({
    deleted: false,
    status: "active",
  }).select("fullName");

  res.render("admin/pages/songs/create", {
    title: "Tạo mới bài hát",
    topics: topics,
    singers: singers,
  });
};

//[GET] /admin/songs/edit/:idSOng
export const editPage = async (req: Request, res: Response) => {
  const id: string = req.params.idSong;
  const song = await Song.findOne({
    _id: id,
    deleted: false,
  });
  const topics = await Topic.find({
    deleted: false,
    status: "active",
  }).select("title");
  const singers = await Singer.find({
    deleted: false,
    status: "active",
  }).select("fullName");

  res.render("admin/pages/songs/edit", {
    title: "Chỉnh sửa bài hát",
    song: song,
    topics: topics,
    singers: singers,
  });
};

//[POST] /admin/songs/create
export const create = async (req: Request, res: Response) => {
  let avatar: string = "";
  let audio: string = "";
  if (req.body.avatar) {
    avatar = req.body.avatar[0];
  }
  if (req.body.audio) {
    audio = req.body.audio[0];
  }

  const dataSong = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: req.body.status,
    avatar: avatar,
    audio: audio,
    lyric: req.body.lyrics,
  };
  const song = new Song(dataSong);
  await song.save();

  res.redirect(`${systemConfig.prefixAdmin}/songs`);
};

//[PATCH] /admin/songs/edit/:idSong
export const edit = async (req: Request, res: Response) => {
  const id: string = req.params.idSong;

  let avatar: string = "";
  let audio: string = "";

  const dataSong = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: req.body.status,
    lyric: req.body.lyrics,
  };
  if (req.body.avatar) {
    dataSong["avatar"] = req.body.avatar[0];
  }
  if (req.body.audio) {
    dataSong["audio"] = req.body.audio[0];
  }
  await Song.updateOne(
    {
      _id: id,
    },
    dataSong
  );

  res.redirect("back");
};

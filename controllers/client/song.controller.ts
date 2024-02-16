import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import { resolveSoa } from "dns";

//[GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  const slug: String = req.params.slugTopic;
  const topic = await Topic.findOne({
    slug: slug,
    status: "active",
    deleted: false,
  });

  const songs = await Song.find({
    topicId: topic.id,
    status: "active",
    deleted: false,
  }).select("avatar title slug singerId like ");

  for (const song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false,
    });
    song["infoSinger"] = infoSinger;
    // console.log(infoSinger);
  }
  //   console.log(songs);

  res.render("client/pages/songs/list", {
    title: topic.title,
    songs: songs,
  });
};

//[GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  try {
    const slug: String = req.params.slugSong;
  const song = await Song.findOne({
    slug: slug,
    status: "active",
    deleted: false,
  });
  
  const topic = await Topic.findOne({
    _id: song.topicId,
    deleted: false,
  }).select("title");
  const singer = await Singer.findOne({
    _id: song.singerId,
    deleted: false,
  }).select("fullName");
  // console.log(topic);
  // console.log(singer);
  // console.log(song.singerId);
  
  res.render("client/pages/songs/detail", {
    title: "Chi tiết bài hát",
    song: song,
    singer:singer,
    topic:topic,
  });
  } catch (error) {
    res.send("404");
  }
};

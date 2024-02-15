import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";

//[GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  const slug = req.params.slugTopic;
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
    songs :songs
  });
};

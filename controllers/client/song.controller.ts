import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";

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
      _id: song["topicId"],
      deleted: false,
    }).select("title");
    const singer = await Singer.findOne({
      _id: song["singerId"],
      deleted: false,
    }).select("fullName");
    // console.log(topic);
    // console.log(singer);
    // console.log(song.singerId);
    const favoriteSong = await FavoriteSong.findOne({
      songId: song.id,
    });
    song["isFavoriteSong"] = favoriteSong ? true : false;
    res.render("client/pages/songs/detail", {
      title: "Chi tiết bài hát",
      song: song,
      singer: singer,
      topic: topic,
    });
  } catch (error) {
    res.send("404");
  }
};

//[PATCH] /songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response) => {
  try {
    const type: String = req.params.typeLike;
    const id: String = req.params.idSong;

    const song = await Song.findOne({
      _id: id,
      status: "active",
      deleted: false,
    });
    const newLike: number = type == "like" ? song.like + 1 : song.like - 1;
    await Song.updateOne(
      {
        _id: id,
      },
      {
        like: newLike,
      }
    );
    res.json({
      code: 200,
      message: "Like thành công!",
      like: newLike,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Call API Fail!",
    });
  }
};
//[PATCH] /songs/favorite/:typeFavorite/:idSong
export const favorite = async (req: Request, res: Response) => {
  try {
    const type: String = req.params.typeFavorite;
    const id: String = req.params.idSong;

    switch (type) {
      case "favorite":
        const existFavoriteSong = await FavoriteSong.findOne({
          songId: id,
          // userId : idUser
        });
        if (!existFavoriteSong) {
          const record = new FavoriteSong({
            userId: "",
            songId: id,
          });
          await record.save();
        }
        break;
      case "unfavorite":
        await FavoriteSong.deleteOne({
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
  } catch (error) {
    res.json({
      code: 400,
      message: "Call API Fail!",
    });
  }
};

//[PATCH] /songs/listen/:idSong
export const listen = async (req: Request, res: Response) => {
  try {
    const id: String = req.params.idSong;
    const song = await Song.findOne({
      _id: id,
    });

    const listen: number = song.listen + 1;
    
    await Song.updateOne(
      {
        _id: song.id,
      },
      {
        listen: listen,
      }
    );
    
    const newSong = await Song.findOne({
      _id: song.id,
    });
    
    res.json({
      code: 200,
      message: "Thành công!",
      listen: newSong.listen,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Call API Fail!",
    });
  }
};

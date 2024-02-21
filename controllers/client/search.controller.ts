import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug";
//[GET] /search/:type
export const result = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`;
  const type: string = req.params.type;
  let newSongs = [];
  if (keyword) {
    const keywordRegex = new RegExp(keyword, "i");

    //Biến chuôi search thành slug để tìm kiếm theo slug
    const stringSlug = convertToSlug(`${keyword}`);
    const stringSlugRegex = new RegExp(stringSlug, "i");
    // console.log(stringSlugRegex);

    const songs = await Song.find({
      $or: [
        {
          title: keywordRegex,
        },
        {
          slug: stringSlugRegex,
        },
      ],
    });
    for (const song of songs) {
      const infoSinger = await Singer.findOne({
        _id: song.singerId,
      });
      newSongs.push({
        id : song.id,
        title : song.title,
        avatar : song.avatar,
        like : song.like,
        slug : song.slug,
        infoSinger : {
            fullName : infoSinger.fullName
        },
      });
    }
    // newSongs = songs;
  } 

  switch (type) {
    case "result":
      res.render("client/pages/search/result", {
        title: `Kết quả ${keyword}`,
        keyword: keyword,
        songs: newSongs,
      });
      break;
    case "suggest":
      res.json({
        code: 200,
        message: "Thành công!",
        songs: newSongs,
      });
      break;
    default:
      res.json({
        code: 400,
        message: "Thất bại!",
      });
      break;
  }
};

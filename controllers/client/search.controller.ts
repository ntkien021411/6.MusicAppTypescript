import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug";
//[GET] /search/result
export const result = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`;
  let newSong = [];
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
      song["infoSinger"] = infoSinger;
    }
    newSong = songs;
  }else{
    const songs = await Song.find({
       deleted:false
      });
      newSong = songs;
  }

  res.render("client/pages/search/result", {
    title: `Kết quả ${keyword}`,
    keyword: keyword,
    songs: newSong,
  });
};

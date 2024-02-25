import { Request, Response } from "express";
import Song from "../../models/song.model";

//[GET] /admin/songs
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false,
  });

  res.render("admin/pages/songs/index",{
    title : "Quản lý bài hát",
    songs: songs
  });
};



//[GET] /admin/songs/create
export const createPage = async (req: Request, res: Response) => {
    const songs = await Song.find({
      deleted: false,
    });
  
    res.render("admin/pages/songs/create",{
      title : "Tạo mới bài hát",
      songs: songs
    });
  };
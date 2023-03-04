const { PrismaClient } = require("@prisma/client");
var cloudinary = require("cloudinary").v2;
require("dotenv").config();

const prisma = new PrismaClient();
const songController = {};

songController.addSong = async (req, res) => {
  
  const { url, title, artist } = req.body;

  if (!url || !title || !artist) {
    return res.json({
      success: false,
      data: null,
      error: { msg: "Please enter all fields!!" },
    });
  }

  try {
    const newSong = await prisma.song.create({
      data: {
        url,
        title,
        artist,
      },
    });

    res.json({
      success: true,
      data: newSong,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      data: null,
      error: error.meta || { msg: "Error occurred check server log!" },
    });
  }
};

songController.getSongs = async (req, res) => {
  try {
    const songs = await prisma.song.findMany({
      where : {}
    })
    res.json({
      success: true,
      data: songs,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      data: null,
      error: error.meta || { msg: "Error occurred check server log!" },
    });
  }
};

songController.updateSongById = async (req, res) => {
  const id = req.params.id;
  const { url, title, artist } = req.body;
  
  if (!id || !url || !title || !artist) {
    return res.json({
      success: false,
      data: null,
      error: { msg: "Please enter all fields properly!!" },
    });
  }

  try {
    await prisma.song.updateMany({
      where: {
        id
      },
      data: {
        url: url,
        title,
        artist,
      },
    });

    const updatedSong = await prisma.song.findMany({
      where: { id }
    })

    res.json({
      success: true,
      data: updatedSong,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      data: null,
      error: error.meta || { msg: "Error occurred check server log!" },
    });
  }
};

songController.deleteSongById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.json({
      success: false,
      data: null,
      error: { msg: "Please enter all fields properly!!" },
    });
  }
  try {
    await prisma.song.deleteMany({
      where: {
        id
      }
    });

    res.json({
      success: true,
      data: {msg: "Done!!"},
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      data: null,
      error: error.meta || { msg: "Error occurred check server log!" },
    });
  }
};

module.exports = songController;

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const songController = {};

songController.addSong = async (req, res) => {
  const { img_url, title, artist } = req.body;

  if (!img_url || !title || !artist) {
    return res.json({
      success: false,
      data: null,
      error: { msg: "Please enter all fields!!" },
    });
  }
  try {
    const newSong = await prisma.song.create({
      data: {
        url: img_url,
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
  const { img_url, title, artist } = req.body;

  if (!id || !img_url || !title || !artist) {
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
        url: img_url,
        title,
        artist,
      },
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

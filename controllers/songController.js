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
        img_url,
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

songController.getSongs = async (req, res) => {};

songController.updateSongById = async (req, res) => {};

songController.deleteSongById = async (req, res) => {};

module.exports = songController;

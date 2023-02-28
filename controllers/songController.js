const { PrismaClient } = require("@prisma/client");
var cloudinary = require("cloudinary").v2;
require("dotenv").config();

const prisma = new PrismaClient();
const songController = {};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
  secure: true,
});

songController.addSong = async (req, res) => {
  const { Image } = req.files;
  const { title, artist } = req.body;

  if (!Image || !title || !artist) {
    return res.json({
      success: false,
      data: null,
      error: { msg: "Please enter all fields!!" },
    });
  }

  Image.mv(
    __dirname + "/uploads/" + Image.name
  );

  try {

    var new_url = await cloudinary.uploader
    .upload( __dirname + "/uploads/" + Image.name, {
      resource_type: "",
      overwrite: true,
      notification_url: "https://mysite.example.com/notify_endpoint",
    }).then(async (result) => {
        return result.url;
    })

    const newSong = await prisma.song.create({
      data: {
        url: new_url,
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

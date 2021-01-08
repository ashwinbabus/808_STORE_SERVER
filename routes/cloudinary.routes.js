const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

router.get("/folders/", async (req, res) => {
  console.log(req.query.path);
  try {
    const folders = await cloudinary.api.sub_folders(`${req.query.path}`);
    res.send(folders.folders);
  } catch (error) {
    res.send(error);
  }
});

router.get("/folders/postman", async (req, res) => {
  try {
    const folders = await cloudinary.api.sub_folders(`${req.body.path}`);
    res.send(folders.folders);
  } catch (error) {
    res.send(error);
  }
});


router.get("/images/", async (req, res) => {
  try {
    const images = await cloudinary.search
      .expression(`folder:"${req.query.path}"`)
      .execute();
    res.send(images.resources);
  } catch (error) {
    res.send(error);
  }
});

router.get("/images/postman", async (req, res) => {
  console.log(req.body.path);
  try {
    const images = await cloudinary.search
      .expression(`folder:${req.body.path}`)
      .execute();
    res.send(images.resources);
  } catch (error) {
    res.send(error);
  }
});



router.post("/folders/create_folder", async (req, res) => {
    try{
        const response = await cloudinary.api.create_folder(`${req.body.path}`);
        res.send(response);
    } catch (error){
        res.send(error)
    }
});

router.delete("/folders/delete_folder" ,async(req,res) => {
    try{
        const response = await cloudinary.api.delete_folder(`${req.body.path}`);
        res.send(response);
    } catch(error) {
        res.send(error)
    }
})

router.delete("/images/delete_images" ,async(req,res) => {
  try {
    const response = await cloudinary.api.delete_resources(req.body.resources);
    res.send(response);
  } catch (error) {
    console.error(error);
  }
})


router.post("/upload_preset" ,async(req,res) =>  {
  try {
    const response = await cloudinary.api.create_upload_preset({
      name : `${req.body.name}_preset`,
      unsigned : true,
      folder : req.body.path,
      type : "upload",
      access_mode : "public"
    })
    res.send(response);
  } catch (error) {
    res.send(error)
  }
})

module.exports = router;



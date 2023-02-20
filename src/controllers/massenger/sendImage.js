const Message = require("../../models/message");
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");
const sendImage = async (req, res) => {
  const senderId = req.user.user._id;
  const form = formidable();
  try {
    form.parse(req, (err, fields, files) => {
      const {imageName, senderName,  receiverId} = fields
    

      files.image.originalFilename = imageName;

      const newPath = path.join(
        __dirname,
        `/../../../images/${imageName}`
      );

      files.image.originalFilename = imageName

      fs.copyFile(files.image.filepath, newPath, async (error) => {
        if (error) {
          console.log(newPath);
        } else {
            const insertMessage = await Message.create({
                senderName,
                senderId,
                message: {
                  text: "",
                  image:  files.image.originalFilename ,
                },
                receiverId,
              });

              return res.status(200).send({ message:insertMessage });
        }
      });

    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = sendImage;

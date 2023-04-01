//Required modules
const Tesseract = require('tesseract.js');
const express=require("express")
const app=express();
const hbs = require("hbs");
const path = require("path");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../views")

//handlebars
app.use(express.static(static_path))
app.set("view engine", "hbs");

// Replace the URL below with the public URL of the captcha image
const captchaUrl = "c1.png";
var text=null;
// Load the image using Tesseract.js
Tesseract.recognize(captchaUrl)
   .then((result) => {
    text=(result.data.text);
   })
   .catch((error) => {
     console.error(error);
});

//routes
app.get("/", (req,res)=>{
  res.render("index",{
    text:text
  })
})

app.listen(port, ()=>{
  console.log(`Server is running at port ${port}`);
})

const express = require(express);
const router = express.Router();

router.get("/", (req,res) => {
 res.render('index',{name:"helo"})
});

router.get("/failed", (req, res)=> {
    req.falash("age", 34);
    res.send("flash makeing done")
});

router.get("/check", (req,res)=>{
    console.log(req.flash("age"))
    req.send("check on the server terminal")
})
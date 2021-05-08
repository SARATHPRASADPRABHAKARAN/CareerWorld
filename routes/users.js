
var express = require("express");
var router = express.Router();
const userHelper = require("../Helpers/userhelper");
const session = require("express-session");
const { Db } = require("mongodb");
const { RequestHeaderFieldsTooLarge } = require("http-errors");



router.get('/',function(req,res){
  console.log('sarath');
  res.render("Users/home",{no:true })

})

router.get("/login", (req, res) => {
  console.log('sarath')
 
    res.render("Users/login", { no: true});
  
});

//login manual

router.post("/login", (req, res) => {
  console.log("keri");
  userHelper.doLogin(req.body).then((response) => {
    if (response.status == 3) {
      res.send(response);
    } else if (response.status == 2) {
      console.log("pwd err");
      res.send(response);
    } else if (response.type == "employee") {
      req.session.temp = response; 
      res.send(response);
    } else if (response.type == "recruiter") {
      req.session.temp = response;
      res.send(response);
    } else if (response.type == "admin") {
      req.session.temp = response;

      res.send(response);
    }
  });
});










module.exports = router;
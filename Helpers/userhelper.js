var db = require("../conection/config");
var collection = require("../conection/collection");
const bcrypt = require("bcrypt");
var objectId = require("mongodb").ObjectID;



module.exports={
    doLogin: (userData) => {
        let response = {};
        return new Promise(async (resolve, reject) => {
          let password1 = await bcrypt.hash(userData.password, 10);
    
          let user = await db
            .get()
            .collection(USER_COLLECTION)
            .findOne({ email: userData.email });
          if (user) {
            let status = await bcrypt.compare(userData.password, user.password);
    
            if (status == true) {
              resolve(user);
            } else {
              response.status = 2;
              resolve(response);
            }
          } else {
            response.status = 3;
            resolve(response);
          }
        });
      },
    
}
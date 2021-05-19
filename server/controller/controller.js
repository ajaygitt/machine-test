var db = require("../model/connection");
var collection = require("../model/collections");
var bcrypt = require("bcrypt");
var moment = require("moment");
const {
  NOTES_COLLECTION,
  COMPANY_COLLECTION,
} = require("../model/collections");
const { ObjectID } = require("bson");

module.exports = {
  signup: (userData) => {
    console.log(userData);
    status = {};
    return new Promise(async (resolve, reject) => {
      let Username = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ Username: userData.User });
      if (Username) {
        status = "exist";
        resolve(status);
      } else {
        userData.Password = await bcrypt.hash(userData.Password, 10);

        status.insert = true;
        db.get()
          .collection(collection.USER_COLLECTION)
          .insertOne({ Username: userData.User, Password: userData.Password })
          .then(() => {
            status = "notExist";
            resolve(status);
          });
      }
    });
  },

  Login: (userData) => {
    console.log(userData);
    let status = {};
    return new Promise(async (resolve, reject) => {
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ Username: userData.User });

      if (user) {
        bcrypt.compare(userData.Password, user.Password).then((response) => {
          if (response) {
            status.user = user;
            console.log("ok user loged");
            resolve(status);
          } else {
            console.log("pwd err");
            status.passwordInvalid = true;
            resolve(status);
          }
        });
      } else {
        console.log("nouser");
        status.invalidUser = true;
        resolve(status);
      }
    });
  },

  addCompany: (userId, data) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.COMPANY_COLLECTION)
        .insertOne({
          userid: userId,
          companyName: data.companyName,
          address: data.address,
          state: data.state,
          city: data.city,
          email: data.email,
          zip: data.zip,
          phone: data.phone,
          website: data.website,
        })
        .then(() => {
          resolve();
        });
    });
  },

  getCompanies: (userId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(COMPANY_COLLECTION)
        .find({ userid: userId })
        .toArray()
        .then((result) => {
          resolve(result);
        });
    });
  },

  addAppointment: (data) => {
    return new Promise(async(resolve, reject) => {
      let timeExists =await db
        .get()
        .collection(collection.APPOINTMENT)
        .find({

$and:[
  {



          $or: [
            {
              $and: [
                {
                  startTime: {
                    $lte: data.startTime,
                  },
                },
                {
                  endTime: {
                    $gte: data.endTime,
                  },
                },
              ],
            },
            {
              $and: [
                {
                  startTime: {
                    $lte: data.endTime,
                  },
                },
                {
                  endTime: {
                    $gte: data.endTime,
                  },
                },
              ],
            },
            {
              $and: [
                {
                  startTime: {
                    $gte: data.startTime,
                  },
                },
                {
                  endTime: {
                    $lte: data.endTime,
                  },
                },
              ],
            },
          ],

        },
        {
          day:data.day
        }
      ]
      
        }).toArray();


        console.log("HEHEHE",timeExists);

if(timeExists.length>0)
{

  let obj={
    status:false
  }
  resolve(obj)
}
else

{
  db.get().collection(collection.APPOINTMENT).insertOne({day:data.day,startTime:data.startTime,endTime:data.endTime}).then(()=>{

    let obj={
      status:true
    }
    resolve(obj)
  })
}

    });
  },


  bulkDelete:(userid)=>{

    db.get().collection(COMPANY_COLLECTION).remove({userid:userid})
  }
};

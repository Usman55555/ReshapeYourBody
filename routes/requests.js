var express = require("express");
var router = express.Router();
const passport = require("passport");
const _ = require("lodash");
var nodemailer = require("nodemailer");

var { User } = require("../models/user");
var { Requests } = require("../models/requests");
const { project, email, password, address } = require("../config/config");
var {
  usercustomerauthenticate,
  adminauthenticate,
  authenticate
} = require("../middleware/authenticate");


const {
  requests_de_h1_1,
  requests_de_h3_1,
  requests_de_h3_2,
  requests_de_p_1,
  requests_de_p_2,
  requests_de_p_3,
  requests_de_h3_3,
  requests_de_p_4,
  requests_de_p_5,
  request_de_h3_4,

  requests_sp_h1_1,
  requests_sp_h3_1,
  requests_sp_h3_2,
  requests_sp_p_1,
  requests_sp_p_2,
  requests_sp_p_3,
  requests_sp_h3_3,
  requests_sp_p_4,
  requests_sp_p_5,
  request_sp_h3_4,


  requests_en_h1_1 ,
  requests_en_h3_1,
  requests_en_h3_2,
  requests_en_p_1,
  requests_en_p_2,
  requests_en_p_3,
  requests_en_h3_3,
  requests_en_p_4,
  requests_en_p_5,
  request_en_h3_4,
  
  // Update Request  (Emails will be sent upon updation of user's status...)
  request_de_h1_1,
  request_de_h3_1,
  request_de_h5_1,
 

  request_sp_h1_1,
  request_sp_h3_1,
  request_sp_h5_1,
  

  request_en_h1_1,
  request_en_h3_1,
  request_en_h5_1,
} = require("../config/requests_email");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password
  }
});

router.post("/newRequest", usercustomerauthenticate, async (req, res) => {
  //   console.log('user type'+req._id)
  var body = {
    madeBy: req.person,

    status: "Pending"
  };
  var newrequest = new Requests(body);
  console.log(newrequest);
  var lang = await User.findOne({ _id: body.madeBy });
  console.log("lang------------------------------",lang)
  check_duplicate = await (await Requests.find({ madeBy: body.madeBy })).length;
  if (check_duplicate >= 1) {
    res.status(200).send({
      "errmsg": "You have already requested."
    });
  } else {
    try {
      var doc1 = await newrequest.save();
      doc1= await doc1.populate('madeBy', [ 'email', 'firstname', 'lastname' ]);
    //  console.log(doc1,+"asddddddddddddddddddddd")
      var findadmin = await User.find({ usertype: "admin" });
      
      to = "";
      for (let i = 0; i < findadmin.length; i++) {
        to += "," + findadmin[i].email;
        // console.log(to)
      }

      to = to.slice(1);
      if (lang.languages[0] == "German")
    {
      var mailBody = `
      <div style="
          background-color:#fafafa;
          padding-left: 20px;">
          <h1>${requests_de_h1_1}</h1>
          <h3>${ requests_de_h3_1}</h3>
          <h3 >${doc1.madeBy.firstname} ${requests_de_h3_2}</h3><br>
           <p>${requests_de_p_1} ${doc1.madeBy.firstname}'${requests_de_p_2}.
           ${requests_de_p_3} </h5><br>

           <h3>${requests_de_h3_3}</h3>
           <p>${requests_de_p_4} ${doc1.madeBy.firstname} ${doc1.madeBy.lastname}</p>
           <p>${requests_de_p_5} ${doc1.madeBy.email}</p>
          <h3>${request_de_h3_4} </h3>
      </div>
      `;
    }
    else if (lang.languages[0] == "Spanish")
    {
      var mailBody = `
                <div style="
                    background-color:#fafafa;
                    padding-left: 20px;">
                    <h1>${requests_sp_h1_1}</h1>
                    <h3>${ requests_sp_h3_1}</h3>
                    <h3 >${doc1.madeBy.firstname} ${requests_sp_h3_2}</h3><br>
                     <p>${requests_sp_p_1} ${doc1.madeBy.firstname}'${requests_sp_p_2}.
                     ${requests_sp_p_3} </h5><br>
          
                     <h3>${requests_sp_h3_3}</h3>
                     <p>${requests_sp_p_4} ${doc1.madeBy.firstname} ${doc1.madeBy.lastname}</p>
                     <p>${requests_sp_p_5} ${doc1.madeBy.email}</p>
                    <h3>${request_sp_h3_4} </h3>
                </div>
                `;
    }
    else{
      var mailBody = `
      <div style="
          background-color:#fafafa;
          padding-left: 20px;">
          <h1>${requests_en_h1_1}</h1>
          <h3>${ requests_en_h3_1}</h3>
          <h3 >${doc1.madeBy.firstname} ${requests_en_h3_2}</h3><br>
           <p>${requests_en_p_1} ${doc1.madeBy.firstname}'${requests_en_p_2}.
           ${requests_en_p_3} </h5><br>

           <h3>${requests_en_h3_3}</h3>
           <p>${requests_en_p_4} ${doc1.madeBy.firstname} ${doc1.madeBy.lastname}</p>
           <p>${requests_en_p_5} ${doc1.madeBy.email}</p>
          <h3>${request_en_h3_4} </h3>
      </div>
      `;
    }
      
      const mailOptions = {
        from: `"${project}" <${email}>`, // sender address
        to: to, // list of receivers
        subject: "You've got a new request", // Subject line
        html: mailBody
      };
      transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.log(err);
        else console.log(info);
      });
      res.status(200).send(doc1);
    } catch {
      res.status(400).send({
        errmsg: "Unable to send request"
      });
    }
  }
});
router.get("/AllRequests", adminauthenticate, async (req, res) => {
  try {
    var all_requests = await Requests.find({}).populate('madeBy', [ 'email', 'firstname', 'lastname' ]);
    res.status(200).send(all_requests);
  } catch (e) {
    res.status(400).send({
      errmsg: "Unable to find any requests"
    });
  }
});
//admin view users

router.put("/updateRequestStatus", adminauthenticate, async (req, res) => {
  
  try {
   
    if (req.body.status=="accepted")
    {
      console.log(req.body.madeBy+"iddddddddddddd")
      var user_update = await User.findByIdAndUpdate(
        {_id:req.body.madeBy},
        {
          usertype: 'partner'
        },
        {
          new: true
        }
      )
      console.log("user_update_id")
     console.log(user_update)
    }
    // var s = await Requests.findOne({ status: req.body.status });
    // console.log("updated ----------------------------------",s)
    var update_status = await Requests.findByIdAndUpdate(
      req.body.reqId,
      {
        status: req.body.status
      },
      {
        new: false
      }
    ).populate('madeBy', [ 'email', 'firstname', 'lastname' ]);
    console.log(update_status.status, 'status.......................')
    var user = await User.findOne({ _id: update_status.madeBy });
    
    // console.log('languages---------- ',user.languages[0]);
    // console.log("user uuuuuuuuuuuuuu",user)
      // console.log(user.laguages[0],"language.......................")
    // console.log(update_status);
    if (update_status.status != req.body.status)
    {

      if (user.languages[0] == "German")
          {
            var mailBody = `
            <div style="
                background-color:#fafafa;
                padding-left: 20px;"><br />
                <h1${ request_de_h1_1} ${user.firstname} </h1>
                <h3>${request_de_h3_1} ${req.body.status}.</h3>
                <h5>${request_de_h5_1}</h5>
                <br />
              
            </div>
            `;
          }
    else if (user.languages[0] == "Spanish")
          {
            var mailBody = `
            <div style="
                background-color:#fafafa;
                padding-left: 20px;"><br />
                <h1${ request_sp_h1_1} ${user.firstname} </h1>
                <h3>${request_sp_h3_1} ${req.body.status}.</h3>
                <h5>${request_sp_h5_1}</h5>
                <br />
              
            </div>
            `;
          }
    else
          {
            var mailBody = `
            <div style="
                background-color:#fafafa;
                padding-left: 20px;"><br />
                <h1${ request_en_h1_1} ${user.firstname} </h1>
                <h3>${request_en_h3_1} ${req.body.status}.</h3>
                <h5>${request_en_h5_1}</h5>
                <br />
              
            </div>
            `;
          }
          const mailOptions = {
            from: `"${project}" <${email}>`, // sender address
            to: user.email, // list of receivers
            subject: "Your request status is updated.", // Subject line
            html: mailBody
          };
          transporter.sendMail(mailOptions, function(err, info) {
            if (err) console.log(err);
            else console.log(info);
          });
        
    }
    

   
    // console.log(update_status,"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    res.status(200).send(update_status);
  } catch {
    res.status(400).send({
      errmsg: "Sorry,Could not update status"
    });
  }
});

// router.get('/viewMyRequestStatus',usercustautheomerauthenticate, async (req, res) =>

// {
//     console.log("get id: "+req.person._id)

//     // var url=req.url
//     // console.log(url+'url')
//     try
//     {
//         var my_requests = await Requests.findById(req.query.reqId);
//         res.status(200).send(my_requests);
//     }
//     catch (e)
//     {
//         res.status(400).send
//         ({
//             errmsg: "Unable to find any requests"
//         });
//     }

// });

router.get('/viewMyRequests', usercustomerauthenticate, async (req, res) =>
    {

        try {
            var my_requests = await Requests.find({madeBy:req.person}).populate('madeBy', [ 'email', 'firstname', 'lastname' ]);
            console.log('my request___________', my_requests)
            res.status(200).send(my_requests);
        }catch (e) {
            res.status(400).send({
                errmsg: "Sorry, no user exists"
            });
        }
    });

router.delete("/delete", adminauthenticate, async (req, res) => {
  try {
    var delet_user = await Requests.findByIdAndDelete(req.query.reqId);
    res.status(200).send(delet_user);
  } catch (e) {
    console.log(e);
    res.status(400).send({
      errmsg: "could not delet user"
    });
  }
});

router.delete("/deleteMyRequest",usercustomerauthenticate,async (req, res) =>
 {
    try {
      var delet_user = await Requests.deleteOne({
        madeBy: req.person._id,
        _id: req.query.reqId
      });
      res.status(200).send(delet_user);
    } catch (e) {
      console.log(e);
      res.status(400).send({
        errmsg: "could not delet user"
      });
    }
  }
);

router.get("/:id", adminauthenticate, async (req, res) => {
  console.log("get id: " + req.params.id);

  // var url=req.url
  // console.log(url+'url')
  try {
    var my_requests = await Requests.findById(req.params.id);
    console.log(my_requests);
    res.status(200).send(my_requests);
  } catch (e) {
    res.status(400).send({
      errmsg: "Unable to find any requests"
    }); 
  }
});

module.exports = router;

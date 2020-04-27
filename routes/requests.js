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
          <h1>Hallo Admin</h1>
          <h3>Sie haben eine neue Anfrage erhalten.</h3>
          <h3 >${doc1.madeBy.firstname} haben darum gebeten, Partner zu werden.</h3><br>
           <p>Bitte überprüfen Sie die Anfrage und Aktualisierung des Benutzers ${doc1.madeBy.firstname}'s status.
           Auf diese Weise erfahren Benutzer, wie viele Rechte Benutzer an Ihren Diensten haben </h5><br>

           <h3> Nutzerinformation</h3>
           <p>Name: ${doc1.madeBy.firstname} ${doc1.madeBy.lastname}</p>
           <p>Email: ${doc1.madeBy.email}</p>
          <h3>Dankeschön </h3>
      </div>
      `;
    }
    else if (lang.languages[0] == "Spanish")
    {
      var mailBody = `
                <div style="
                    background-color:#fafafa;
                    padding-left: 20px;">
                    <h1>Hola admin</h1>
                    <h3>Tienes una nueva solicitud..</h3>
                    <h3 >${doc1.madeBy.firstname} ha solicitado ser socio.</h3><br>
                     <p>Por favor revise la solicitud del usuario y actualice ${doc1.madeBy.firstname}'s status.
                     Esto le permitirá al usuario saber cuántos derechos tiene el usuario sobre sus servicios </h5><br>

                     <h3> informacion del usuarion</h3>
                     <p>Nombre: ${doc1.madeBy.firstname} ${doc1.madeBy.lastname}</p>
                     <p>Correo electrónico: ${doc1.madeBy.email}</p>
                    <h3> Thank You </h3>
                </div>
                `;
    }
    else{
      var mailBody = `
      <div style="
          background-color:#fafafa;
          padding-left: 20px;">
          <h1>Hi Admin </h1>
          <h3>You got a new request.</h3>
          <h3 >${doc1.madeBy.firstname} have requested to become a
           pertner.</h3><br>
           <p>Please review user's request and update ${doc1.madeBy.firstname}'s status.
           This will let user to know how much rights user have to your services </h5><br>

           <h3> User Information</h3>
           <p>Name: ${doc1.madeBy.firstname} ${doc1.madeBy.lastname}</p>
           <p>Email: ${doc1.madeBy.email}</p>
          <h3> Thank You </h3>
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
                <h1>Hi, ${user.firstname} </h1>
                <h3>Your request's status is ${req.body.status}.</h3>
                <h5>You can now view your status </h5>
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
                <h1>Hi, ${user.firstname} </h1>
                <h3>Your request's status is ${req.body.status}.</h3>
                <h5>You can now view your status </h5>
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
                <h1>Hi, ${user.firstname} </h1>
                <h3>Your request's status is ${req.body.status}.</h3>
                <h5>You can now view your status </h5>
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

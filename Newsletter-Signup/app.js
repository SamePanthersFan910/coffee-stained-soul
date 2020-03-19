const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: "firstName",
          LNAME: "lastName"
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/6ca3db9eb7",
    method: "POST",
    headers: {
      "Authorization": "mailchimp a54dd9823ac254c857b4b8679624fd26-us"
    },
    body: jsonData
  };

  request(options, function(error, response, body){
    if (error){
      console.log(error);
      res.sendFile(__dirname + "/failure.html")
    }
    else if (response.statusCode == 200){
      console.log(response.statusCode);
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
  });
});

app.post("/failure", function(req,res){
  res.redirect("/");
})



app.listen(process.env.PORT || 3000, function(req, res){
  console.log("Server started on port 3000.");
});


// a54dd9823ac254c857b4b8679624fd26-us4
// 6ca3db9eb7

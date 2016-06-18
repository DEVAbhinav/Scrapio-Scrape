var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var bodyParser     =        require("body-parser");

//defining static work
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// define json model
  var name , follower , nStudent ;
  var responses = {
                  nameOfCourse : "",
                  nFollower : "",
                  nStudent : ""
                };
  

  app.get("/", function(req,res){  
      res.sendFile("home.html",{
        root : __dirname  
      });
  });
  

  app.post("/scape", function(req,res){
      var url = req.body.url;
        //console.log(url);
        var a = [];
        var responses = {
                  nameOfCourse : "",
                  nStudent : "",
                  nFollower : ""
                  
                };
                url = url + '/teaching';
          request(url, function(error,response,html){
            if (!error && response.statusCode == 200){
              var $ = cheerio.load(html)  ;     //some editing on the next line to make $ accesible using jquery   
             // console.log(html);
             // var data = $(this);
              // here we do the scraping part consisting of   classes-list-view teaching-classes-list-view row populated
              //1) finding out  scrapping header 
              //2) manipulating it to readable form using each function

              // notes for header ::contains 3 tables //var data = $('.col-4.class-column.rendered')
                 

                        a=[]; //temp variable
                        $('.ss-icon-user.num-students.left').each(function(i,elem){a[i] = $(this).text()});     
                        responses.nStudent =  a; 
                     // responses.nameOfCourse = $('.classes-list-view.teaching-classes-list-view.row.populated .title-link').filter('p').text() ;
                      //              //to string manipulation on name of course.
                       responses.nFollower = $('.col-9.user-information-wrapper').siblings().first().find('.clear').children().first().text();
                        a=[];
                        $('p.title-link a').each(function(i,elem){a[i] = $(this).text()});
                        responses.nameOfCourse = a;
                   
                       
                
               console.log(responses );
            }
                res.send(responses);
          });
                  

 });
              
              

              // similarly repeat filtering of new document  to get out followers in Courses and nStudent 






app.listen('8080');
console.log("lets see the thing at 8080");
module.exports = app;

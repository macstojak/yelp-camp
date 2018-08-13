var express=require("express"),
    router = express.Router();
var Campground = require("../models/campground"),
    middleware = require("../middleware");

//INDEX
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){

            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campground: allCampgrounds});
        }
    });
});

//ADD NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new");
});

//CREATE - Add new campground to database
router.post("/", middleware.isLoggedIn, function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var price = req.body.price
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   var newCamp = {name: name, price: price, image: image, description: desc, author: author};
   Campground.create(newCamp, function(err, campground){
       if(err){
           console.log("Error ocurred");
       }
       else{
           console.log(campground)
           res.redirect("/campgrounds");
       }
   });
});
//SHOW - show 
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err){
            console.log("Something went wrong. Error occured")
        }else{
            console.log(foundCamp);
          res.render("campgrounds/show", {campground: foundCamp});  
        }
    });
    
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
      res.render("campgrounds/edit", {campground: foundCampground});
    });
   
});
//UPDATE CAMPGROUND ROUTE
router.put("/:id", function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//DELETE CAMPGROUND
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;

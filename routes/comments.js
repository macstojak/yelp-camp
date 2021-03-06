var express = require("express"),
    router = express.Router({mergeParams: true}),
    mongoose = require("mongoose");
var Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");
//================
// COMMENTS ROUTES
//================

//COMMENT NEW 
router.get("/new", 
// middleware.isLoggedIn, 
function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
             res.render("comments/new", {campground: campground});
        }
    })
   
});

//COMMENT CREATE
router.post("/", 
// middleware.isLoggedIn,
 function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
                    res.redirect("/campgrounds");
               }else{
                   //add username and id to the comment
                   let id, username;
                   req.user===undefined?id=mongoose.Types.ObjectId():id=req.user._id;
                   req.user===undefined?username="Anonymous": username=req.user.username;
                   comment.author.id = id;
                   comment.author.username = username;
                   //save comment
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   console.log(comment);
                   req.flash("success", "Successfully added a comment!");
                   res.redirect("/campgrounds/"+campground._id);
               }
           });      
        }
    });
});


//COMMENT EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
    
});
//COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash("error", "Something went wrong");
            res.redirect("back");
        }else{
            req.flash("success", "Removed a comment");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

module.exports = router;
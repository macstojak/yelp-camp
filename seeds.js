var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")
var data = [
    {
        name:"Cloud's Rest",
        image:"http://www.camping-usa.com/images/sized/images/uploads/buttes_fs-450x300.jpg",
        description:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    },
    {
        name:"Avenue Park",
        image:"http://www.camping-usa.com/images/sized/images/uploads/boardwalk_fs-450x300.jpg",
        description:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    },
    {
        name:"Arthur's Peak",
        image:"http://www.camping-usa.com/images/sized/images/uploads/atc400-2-400x277.jpg",
        description:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?[pfoes[pfd[a  [pokd a[wd pwaojdwai"
    }
    ];

function seedDB()
{
    Campground.remove({}, function(err)
    {
        if(err)
        {
            console.log(err);
        }else
        {
            console.log("Removed all the campgrounds");
                data.forEach(function(seed)
                {
                Campground.create(seed, function(err, campground)
                {
                    if(err)
                    {
                        console.log(err);
                    }else
                    {
                        console.log("Added a campground");
                        Comment.create(
                            {
                                text:"This place is great, but it has no internet",
                                author: "Homer"
                            }, function(err, comment){
                            if(err){
                                console.log(err);
                            }else
                            {
                                
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a comment");
                            }
                        });
                    }
                });
                });
        }
    });
};



module.exports = seedDB;
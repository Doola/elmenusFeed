var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://localhost:7474');


//(S19) I can unfollow another user.
//This function takes two parameters :
//the follower email and the current user email
//then it matches the two users and deletes the relationship follow between them
exports.deleterFollowUserUser  = function (FollowerEmail,FolloweeEmail) {
    db.query("MATCH (d)-[rel:Follows]->(r)  WHERE d.email={e1p} AND r.email={e2p}  DELETE rel", params = {e1p:FollowerEmail,e2p:FolloweeEmail}, function (err, results) {
        if (err){  console.log('Error');
                 throw err;
                }
        else console.log("Done");
    });
}
//(S5) The function takes the following parameters:
//UserEmail, the restaurant name, the review title and the body of the review
//then it matches the user with the restaurant
//and adds the review to this restaurant
exports.createrReviewUserToRestaurant = function (UserEmail,RestaurantName,ReviewTitle,ReviewBody) {
    db.query("MATCH (n:User { email:{ep} }),(r:Restaurant { name:{rp} })CREATE (n) -[:Review { title:{tp} , body:{bp} }]-> (r) ;", params = {ep:UserEmail,rp:RestaurantName,tp:ReviewTitle,bp:ReviewBody}, function (err, results) {
        if (err){  console.log('Error');
                 throw err;
                }
        else console.log("Done");
    });
}
exports.createResturant  = function (name) {
    db.query("CREATE (:Restaurant { name:{np} })", params = {np:name}, function (err, results) {
        if (err){  console.log('Error');
                 throw err;
                }
        else console.log("Done");
    });
}

//2-I can add a dish to the resturant
exports.createDish  = function (name) {
    db.query("CREATE (:Dish { dish_name:{np} })", params = {np:name}, function (err, results) {
        if (err){  console.error('Error');
                 throw err;
                }
        else console.log("Done");
    });
}
exports.addDishToRestaurant  = function (dish,restaurant) {
    db.query("MATCH (d:Dish),(r:Restaurant) WHERE d.dish_name={dp} AND r.name ={rp} CREATE (r)-[rl:Has]->(d)", params = {dp:dish,rp:restaurant}, function (err, results) {
        if (err){  console.error('Error');
                 throw err;
                }
        else console.log("Done");
    });
}



/*  Sprint #-1-US-5
     The user can add a photo yuck to a certain photo.
     This function takes the User Email and the Photo URL as an input.
     It matches the user and the photo and creates the relationship "ADD_YUCK" to it.
     If there was a yum on this photo, placed by the same user, then it will be deleted 
     and replaced by a yuck
*/
exports.createrYuckUserPhoto  = function (UserEmail,PhotoURL) {
     db.query("MATCH (user:User {email: {ep}}), (photo:Photo {url: {pnp}}) CREATE (user)-[:ADD_YUCK]->(photo) WITH user,photo MATCH (user)-[x:ADD_YUM]->(photo) DELETE x", 
        params = {ep:UserEmail,pnp:PhotoURL}, function (err, results) {
        if (err) throw err;
        console.log('done');
    });
}


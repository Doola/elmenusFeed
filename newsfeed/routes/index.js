
/*
 * GET home page.
 */

 var query = require('../queries');
 
exports.index = function(req, res){

  res.render('index', { title: 'Express' })
};

exports.Get_restaurant_info = function(req, res){
	query.Get_restaurant_info(req.param("tagId"), req, res);
};

exports.Get_restaurant_info_cont = function(req, res, x){
	res.render('Get_restaurant_info', x);
};

exports.newDish = function(req, res){
	res.render('add_dish')
};

exports.signUp = function(req, res){
	res.render('signup')
};

exports.newReview = function(req, res){
	res.render('add_review')
};



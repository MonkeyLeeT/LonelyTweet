OAuth.initialize('9uKv1TdU3SgGu8reX5HM4np9Egc')
var a = {};
var tweets = [];
var res;

//Using popup
function twitauth() {
	tweets.length = 0;
	OAuth.popup('twitter')
	.done(function(result) {
    result.get('/1.1/friends/list.json')
    .done(function (response1) {
		  res = result;
		  for (var i = 0; i < response1.users.length; i++) {
		  result.get('/1.1/statuses/user_timeline.json?user_id=' + response1.users[i].id + '&count=5')
		  .done(function (response2) {
		  for (var j = 0; j < response2.length; j++) {
				a[response2[j].id_str] = response2[j].retweet_count;
		  }});
		  }
		  setTimeout(function(){ process(a); }, 2000);
    })
    .fail(function (err) {
		  //handle error with err
    });
		  })
.fail(function (err) {
    //handle error with err
		  });
}

function randomize(o) {
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}

function process(map) {
	var keys = [];
	for(var key in map)
		keys.push(key);
	var sorted = keys.sort(function(a,b){return map[a]-map[b]});
	var max = Math.min(20, sorted.length);
	sorted = randomize(sorted).slice(0, max);
	console.log(sorted);
	for (var i = 0; i < sorted.length; i++) {
		res.get('/1.1/statuses/show.json?id=' + sorted[i])
		.done(function (response3) {
			  tweets.push({"tid":response3.id_str,
						   "uid":response3.user.name,
						   "profile_image_url_https":response3.user.profile_image_url,
						   "text":response3.text});
			  });
	}
	setTimeout(function(){
			   sessionStorage.myObject = JSON.stringify(tweets);; }, 2000);
	
}

function retweet(tid) {
	result.post('/1.1/statuses/retweet/:' + tid + '.json')
	.done(function (response4) {
		  //this will display "John Doe" in the console
		  console.log(response.name);
    });
}

function favorite(tid) {
	result.post('/1.1/favorites/create.json?id=' + tid)
	.done(function (response5) {
		  //this will display "John Doe" in the console
		  console.log(response.name);
    });
}

function respond(msg, tid) {
	result.post('/1.1/statuses/update.json?status=' + msg + '&in_reply_to_status_id=' + tid)
	.done(function (response6) {
		  //this will display "John Doe" in the console
		  console.log(response.name);
    });
}
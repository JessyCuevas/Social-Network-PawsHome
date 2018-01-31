// Initialize Firebase
    var config = {
      apiKey: "AIzaSyC1LUXhOucBhR6TesAqAUHbFUFZIWloJ2U",
      authDomain: "pet-app-c88fb.firebaseapp.com",
      databaseURL: "https://pet-app-c88fb.firebaseio.com",
      projectId: "pet-app-c88fb",
      storageBucket: "pet-app-c88fb.appspot.com",
      messagingSenderId: "902252465338"
    };
    firebase.initializeApp(config);

function loadPage() {
	$("#share").click(showPost)
	/*Para agregar imagen*/
	$("#file").change(function(event){
		var imagen = $("#imagen")
		imagen[0].src = URL.createObjectURL(event.target.files[0])
		console.log(imagen)
	})
	/***/
	$("#auth").click(function(){
	authGoogle()
})
}


function authGoogle() {
	var provider = new firebase.auth.GoogleAuthProvider();
	authentication(provider);
}

function authentication(provider) {
	firebase.auth().signInWithPopup(provider).then(function(result) {
  	// This gives you a Google Access Token. You can use it to access the Google API.
  	var token = result.credential.accessToken;
  	// The signed-in user info.
  	var user = result.user;
	// window.location.href="../views/newsfeed.html";
	// saveUserData(user);

  	// ...
}).catch(function(error) {
	console.log(error)
	// window.location.href="../views/newsfeed.html";
  	// Handle Errors here.
  	var errorCode = error.code;
	console.log(errorCode)
  	var errorMessage = error.message;
	console.log(errorMessage)
  	// The email of the user's account used.
  	var email = error.email;
	console.log(email)
  	// The firebase.auth.AuthCredential type that was used.
  	var credential = error.credential;
	console.log(credential)
  	// ...
});
}

// function saveUserData(user) {
// 		var usuario = {
// 			uid: user.uid,
// 			nombre: user.displayName,
// 			email: user.email,
// 			foto: user.photoURL
// 		}
// 		firebase.database().ref("user/" + user.uid).set(usuario)
// }

function showPost(e) {
	e.preventDefault()
	var $container = $("#posts_container")
	var $divPost =  $("<div />", {'class': "col-xs-12 post-style"})
	var $user =  users[0]['nickname']
	var $pUser = $("<p />")
	var $saveImg = $("<img>", {'id': "imagen"})
	$saveImg.addClass('img-responsive')
	var $date = new Date()
	var $hour = $date.getHours()
	var $minutes = $date.getMinutes()
	var $finalHour = $hour + ':'+ $minutes
	var $pHour = $("<p />")
	$pHour.text($finalHour)
	var $input = $("#input")
	var post = $input.val()
	var $divBar = $("<div />", {'class': "row bar-style"})
	var $pawButton = $("<button />",  {'class': "button-bar col-xs-2"})
	var pawIcon = $("<i />", {'class': "fa fa-heart-o"})
	$pawButton.html(pawIcon)
	var $commentButton = $("<button />",  {'class': "button-bar col-xs-2"})
	var $commentIcon = $("<i />", {'class': "fa fa-comment-o"})
	$commentButton.html($commentIcon)
	var $shareButton =  $("<button />",  {'class': "button-bar col-xs-2"})
	var $shareIcon = $("<i />", {'class': "fa fa-paper-plane"})
	$shareButton.html($shareIcon)

	$divPost.append($pUser)
	$divPost.append($pHour)
	$divPost.append($saveImg)
	$divPost.append(post)
	$divBar.append($pawButton)
	$divBar.append($commentButton)	
	$divBar.append($shareButton)		
	$container.prepend($divPost)
	$divPost.append($divBar)
	$input.val(" ")
	$input.attr("placeholder", "Compartir el dia de hoy")

	$pawButton.click(function(){
		like(pawIcon);
	})
}

function like(pawIcon) {
	pawIcon.removeClass("fa fa-heart-o")
	pawIcon.addClass("fa fa-heart")
	pawIcon.addClass("like-color")
}



// function showImg(event) {
//   		var $file = event.target.files[0];
//   		var reader = new FileReader();
//   		reader.onload = function (event){
//     	// crear elemento imagen, darle clase y attr
//     	// var $image = $("<section />");
//     	var $newImg = $("<img />", {"class":"img-responsive container-image  col-xs-offset-1 col-xs-10 mt-5"});
//     	$newImg.attr("src", event.target.result);
//     	var $container = $("#posts_container")
// 		var $divPost =  $("<div />", {'class': "col-xs-12 post-style"})
// 		$divPost.append($newImg)
// 		$container.prepend($divPost)
    	
//   }
//   reader.readAsDataURL(this.files[0]);
// }


$(document).ready(loadPage)
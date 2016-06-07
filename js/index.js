var pictureSource; // picture source
var destinationType; // sets the format of returned value
// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
 
function onDeviceReady() {
pictureSource = navigator.camera.PictureSourceType;
destinationType = navigator.camera.DestinationType;
document.addEventListener("backbutton", onBackKeyDown, false);
}
// Called when a photo is successfully retrieved
//
 
function onPhotoDataSuccess(imageURI) {
// Uncomment to view the base64-encoded image data
console.log(imageURI);
// Get image handle
//acq_val


var cameraval = document.getElementById('acq_val');
  cameraval.value=imageURI;

var cameraImage = document.getElementById('acq_aqimg');
// Unhide image elements
//
cameraImage.style.display = 'block';
// Show the captured photo
// The inline CSS rules are used to resize the image
//
cameraImage.src = imageURI;
}
// Called when a photo is successfully retrieved
//
 
function onPhotoURISuccess(imageURI) {
// Uncomment to view the image file URI
console.log(imageURI);
// Get image handle
//
var galleryImage = document.getElementById('image');
// Unhide image elements
//
galleryImage.style.display = 'block';
// Show the captured photo
// The inline CSS rules are used to resize the image
//
galleryImage.src = imageURI;
}
// A button will call this function
//
 
function capturePhoto() {
// Take picture using device camera and retrieve image as base64-encoded string
navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
quality: 30,
targetWidth: 600,
targetHeight: 600,
destinationType: destinationType.FILE_URI,
saveToPhotoAlbum: true
});
}
// A button will call this function
//
 
function getPhoto(source) {
// Retrieve image file location from specified source
navigator.camera.getPicture(onPhotoURISuccess, onFail, {
quality: 30,
targetWidth: 600,
targetHeight: 600,
destinationType: destinationType.FILE_URI,
sourceType: source
});
}
// Called if something bad happens.
//
 
function onFail(message) {
//alert('Failed because: ' + message);
}

//========================file transfer process==========
 function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
 
            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";
 
            options.params = params;
            options.chunkedMode = false;
 
            var ft = new FileTransfer();
            ft.upload(imageURI, "http://192.254.235.68/~rvsales/dacybihar/webservice?action=uploadpic", win, fail, options);
        }
 
        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
           // alert(r.response);
        }
 
        function fail(error) {
           // alert("An error has occurred: Code = " = error.code);
        }
        
function onBackKeyDown() {
	
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
        // IOS DEVICE
        history.go(-1);
        var pageurl=localStorage.getItem("Pageurl");
         switch(pageurl){
         	case 'index.html':
         	navigator.app.exitApp();
         	break;
         	case 'mdashboard.html':
         	window.open('index.html');
         	break;
         	default:
         	$('#home').click();
         }
    } else if (userAgent.match(/Android/i)) {
        // ANDROID DEVICE
        
        //history.go(-1);
        //navigator.app.backHistory();
         var pageurl=localStorage.getItem("Pageurl");
    
           switch(pageurl){
         	case 'index.html':
             navigator.app.exitApp();
         	break;
         	case 'mdashboard.html':
            navigator.app.exitApp();
         	break;
         	default:
            document.getElementById("mhome").click();
       	
         }
        
    } else {
        // EVERY OTHER DEVICE
        history.go(-1);
   
    }
}
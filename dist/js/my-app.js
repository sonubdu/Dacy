// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
$$(document).on('navbarInit', function (e) {
  
  var navbar = e.detail.navbar;
  var page = e.detail.page;
  
    	switch(page.name){
    	case 'nature':
    	var navdata='<div class="left"><a href="mdashboard.html" id="home" class="link">'; 
		navdata +='<i class="icon icon-back"></i></a></div>';
    	navdata +="<div class='center1 sliding'>Nature of collection</div>";
    	$$('.navbar-inner').html(navdata);
    	break;
    	case 'nature_drafted':
    	var navdata='<div class="left"><a href="mdashboard.html" id="home" class="link">'; 
		navdata +='<i class="icon icon-back"></i></a></div>';
        navdata +="<div class='center1 sliding'>Nature of collection</div>";
    	navdata +='<div class="left"><a href="#" class="link" onclick="MLogout();">Logout</a></div>';
    	$$('.navbar-inner').html(navdata);
    	break;
    	case 'acquisitions':
    	var navdata='<div class="left"><a href="mdashboard.html" id="home" class="link">'; 
		navdata +='<i class="icon icon-back"></i></a></div>';
    	navdata +="<div class='center1 sliding'>Acquisition</div>";
    	navdata +='<div class="left"><a href="#" class="link" onclick="MLogout();">Logout</a></div>';
    	$$('.navbar-inner').html(navdata);
    	break;
    	case 'acquisitions_drafted':
    	var navdata='<div class="left"><a href="mdashboard.html" id="home" class="link">'; 
		navdata +='<i class="icon icon-back"></i></a></div>';
    	navdata +="<div class='center1 sliding'>Drafted Acquisitions</div>";
    	navdata +='<div class="left"><a href="#" class="link" onclick="MLogout();">Logout</a></div>';
    	$$('.navbar-inner').html(navdata);
    	break;
    	case 'attendance':
    	var navdata='<div class="left"><a href="mdashboard.html" id="home" class="link">'; 
		navdata +='<i class="icon icon-back"></i></a></div>';
    	navdata +="<div class='center1 sliding'>Attendance</div>";
    	navdata +='<div class="left"><a href="#" class="link" onclick="MLogout();">Logout</a></div>';
    	$$('.navbar-inner').html(navdata);
    	break;
    	case 'attendance_drafted':
    	var navdata='<div class="left"><a href="mdashboard.html" id="home" class="link">'; 
		navdata +='<i class="icon icon-back"></i></a></div>';
    	navdata +="<div class='center1 sliding'>Drafted Attendence</div>";
    	navdata +='<div class="left"><a href="#" class="link" onclick="MLogout();">Logout</a></div>';
    	$$('.navbar-inner').html(navdata);
    	break;
    	case 'conservationassessment':
    	var navdata='<div class="left"><a href="mdashboard.html" id="home" class="link">'; 
		navdata +='<i class="icon icon-back"></i></a></div>';
    	navdata +="<div class='center1 sliding'>Conservation Assessment</div>";
    	navdata +='<div class="left"><a href="#" class="link" onclick="MLogout();">Logout</a></div>';
    	$$('.navbar-inner').html(navdata);
    	break;
    	case 'conservationassessment_drafted':
    	var navdata='<div class="left"><a href="mdashboard.html" id="home" class="link">'; 
		navdata +='<i class="icon icon-back"></i></a></div>';
    	navdata +="<div class='center1 sliding'>Drafted Conservation Assessment</div>";
    	navdata +='<div class="left"><a href="#" class="link" onclick="MLogout();">Logout</a></div>';
    	$$('.navbar-inner').html(navdata);
    	break;
    	case 'movementofcollection':
    	var navdata='<div class="left"><a href="mdashboard.html" id="home" class="link">'; 
		navdata +='<i class="icon icon-back"></i></a></div>';
    	navdata +="<div class='center1 sliding'>Movement of Collection</div>";
    	navdata +='<div class="left"><a href="#" class="link" onclick="MLogout();">Logout</a></div>';
    	$$('.navbar-inner').html(navdata);
    	break;
    	case 'movementofcollection_drafted':
    	var navdata='<div class="left"><a href="mdashboard.html"  id="home" class="link">'; 
		navdata +='<i class="icon icon-back"></i></a></div>';
    	navdata +="<div class='center1 sliding'>Drafted Movement of collection</div>";
    	navdata +='<div class="left"><a href="#" class="link" onclick="MLogout();">Logout</a></div>';
    	$$('.navbar-inner').html(navdata);
    	break;
    	case 'visitordetails':
    	var navdata='<div class="left"><a href="mdashboard.html" id="home" class="link">'; 
		navdata +='<i class="icon icon-back"></i></a></div>';
    	navdata +="<div class='center1 sliding'>Visitor Details</div>";
    	navdata +='<div class="left"><a href="#" class="link" onclick="MLogout();">Logout</a></div>';
    	$$('.navbar-inner').html(navdata);
    	break;
    	case 'visitordetails_drafted':
    	var navdata='<div class="left"><a href="mdashboard.html" id="home" class="link">'; 
		navdata +='<i class="icon icon-back"></i></a></div>';
    	navdata +="<div class='center1 sliding'>Drafted Visitors</div>";
    	navdata +='<div class="left"><a href="#" class="link" onclick="MLogout();">Logout</a></div>';
    	$$('.navbar-inner').html(navdata);
    	break;
    	
    	case 'mdashboard':
    	var navdata="<div class='center1 sliding'>Dashboard</div>";
    	navdata +='<div class="left"><a href="#" class="link" onclick="MLogout();">Logout</a></div>';
    	$$('.navbar-inner').html(navdata);
    	break;
    	case 'museums':
    	var navdata='<div class="left"><a href="mdashboard.html" id="home" class="link">'; 
		navdata +='<i class="icon icon-back"></i></a></div>';
    	navdata +="<div class='center1 sliding'>Museum</div>";
    	navdata +='<div class="left"><a href="#" class="link" onclick="MLogout();">Logout</a></div>';
    	$$('.navbar-inner').html(navdata);
    	break;
    	case 'museums_drafted':
    	var navdata='<div class="left"><a href="mdashboard.html" id="home" class="link">'; 
		navdata +='<i class="icon icon-back"></i></a></div>';
    	navdata +="<div class='center1 sliding'>Drafted Museum</div>";
    	navdata +='<div class="left"><a href="#" class="link" onclick="MLogout();">Logout</a></div>';
    	$$('.navbar-inner').html(navdata);
    	default:
    	var navdata ="<div class='center1 sliding'>DACY</div>";
    	navdata +='<div class="right"><a href="#" class="link" onclick="MLogout();">Logout</a></div>';
    	$$('.navbar-inner').html(navdata);
    	
     }
     
     if(page.name=='index'){
     	var vuser=localStorage.getItem("Userid");
     	if(vuser > 0){
          document.getElementById('loginform').style.display="none";
          document.getElementById('depert').style.display="block";
     	}
     	
     }

});

$$(document).on('pageInit', function (e) {
   var page = e.detail.page;
   localStorage.setItem("Pageurl",page.url);
   document.getElementById('toolbar').style.display="none";
   var pictureSource   = navigator.camera.PictureSourceType;
   var destinationType = navigator.camera.DestinationType;
  // Page Data contains all required information about loaded and initialized page 
 // get Old form data 
     checkDateString();
     pagedata=page.name.split('_');
    var Parsequery = page.query; 
    if(pagedata[1]=='drafted'){
       showformlist(pagedata[0]);	
     }else{
    	switch(page.name){
    	case 'mdashboard':
    myApp.showPreloader('Data Loading..');
        getNavigation();
    	break;
    	case 'nature':
    	getSingleformdata(page.name);
    	break;
    	case 'museums':
    	getSingleformdata(page.name);
    	break;
    	
    	default:
       if(Parsequery.id > 0){
          getformdata(Parsequery.id);
    	}else{
         localStorage.setItem("Formaction", 'New');
    	}
    	
     }
   }
   if(page.name=='museums'){
   	     getMuseumdata();
   }
     // add/update form data.
     $$('.form-to-json').on('click', function(){
     	    var pid =0;
     	     if(Parsequery.id > 0){
     	     	pid=Parsequery.id;
     	     }
     	     
     	    addNatureOfCollection(page.name,pid);
 
      }); 
       
       
       $$('.form-to-sync').on('click', function(){
     	    
     	    syncdata(page.name);
 
      }); 
	
          
     
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}
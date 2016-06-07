/* function name : getConnectioninfo
 * created by : Rv solutions pvt ltd.
 * Description : This function return mobile network information  
 */

var webservice_url="http://192.254.235.68/~rvsales/dacybihar/webservice?action=";
var db = window.openDatabase("Database", "1.0", "Cordova Demo", 400000);
  
function getConnectioninfo() {
	var networkState = navigator.connection.type;
	var states = {};
	states[Connection.UNKNOWN] = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI] = 'WiFi connection';
	states[Connection.CELL_2G] = 'Cell 2G connection';
	states[Connection.CELL_3G] = 'Cell 3G connection';
	states[Connection.CELL_4G] = 'Cell 4G connection';
	states[Connection.CELL] = 'Cell generic connection';
	states[Connection.NONE] = 'No network connection';
    return states[networkState];
}
/* function name : MLogin
 * created by : Rv solutions pvt ltd.
 * Description : Login using Userid and password
 */
		
function MLogout(){
	   localStorage.removeItem("Userid");
	   localStorage.removeItem("Museumid");
	   localStorage.removeItem("loginstatus");
	   window.location.href="index.html";
       
   
    }
/* function name : MLogin
 * created by : Rv solutions pvt ltd.
 * Description : Login using Userid and password
 */
		
function MLogin(){
	var Userid=document.getElementById('userid').value;
	var Pwd=document.getElementById('pwd').value;
	if((Userid.length < 1) || (Userid.length < 1)){
		myApp.alert('Login failed.Try again!');	
	}else{
	var Networkstauts=getConnectioninfo();
	switch(Networkstauts){
	case 'Unknown connection': 
	      loginOffline(Userid,Pwd);
	      break;
	case 'Ethernet connection': 
	      loginOffline(Userid,Pwd); 
	      break;	
	case 'No network connection': 
	      loginOffline(Userid,Pwd); 	
	      break;
	 default:
	     loginOnline(Userid,Pwd); 
		
	}
	}
}		
/* function name : loginOnline
 * created by : Rv solutions pvt ltd.
 * Description : Login using User id and password using live server.
 */
function loginOnline(Userid,Pwd){
  var dataString='username='+Userid+'&password='+Pwd;
   $.ajax({
        url: webservice_url+'login',
        type: 'POST',
		datatype:'json',
        data: dataString,
        async: true,
        crossDomain: true,
        success: function(resp){
        var data = JSON.parse(resp); 
         if(data.status==1){
          var loginstatus='active';
          localStorage.setItem("Userid", data.user_id);
          localStorage.setItem("loginstatus", data.status);
          iuUserinfo(data,Userid,Pwd);
        }else{
            myApp.alert('Login failed.Please try again later.','Failure Message');	
           }
            
         },
        error: function(err) {
            
            console.log(err);
        }
    });
	
}


/* function name : loginOffline
 * created by : Rv solutions pvt ltd.
 * Description : Login using User id and password using live server.
 */
function loginOffline(Userid,Pwd){
  db.transaction(function (tx) {
   	var sqlQuery='SELECT * FROM dacy_Users where username=? and pwd=?';
   tx.executeSql(sqlQuery,[Userid,Pwd], function (tx, results) {
      var len = results.rows.length, i;
      var  userid = results.rows.item(0).id;
      if(len > 0){
      	 var loginstatus='active';
          localStorage.setItem("Userid", userid);
          localStorage.setItem("loginstatus", loginstatus);
          document.getElementById('loginform').style.display="none";
          document.getElementById('depert').style.display="block";
          document.getElementById("mhome").click();
      }else{
      	
      	myApp.alert('Please enter correct login information','Failure Message');
      }
         
       },null);
   });

}	

/* function name : iuUserinfo
 * created by : Rv solutions pvt ltd.
 * Description : Insert/update user information.
 */
  function iuUserinfo(data,username,pwd){
  
	db.transaction(function (tx) {
   	var sqlQuery='SELECT * FROM dacy_Users where username=? and pwd=?';
    tx.executeSql(sqlQuery,[username,pwd], function (tx, results) {
    	    var len = results.rows.length, i;
    	     if(len==0){
    	     	    addUser(data,username,pwd);
    	     }else{
    	     	    updateUser(data);
    	     }
            
       },null);
     });
           
  }
	
	
/* function name : addUser
 * created by : Rv solutions pvt ltd.
 * Description : This function used to add a new user.
 */
	
function addUser(data,username,pwd){
	
	db.transaction(function (tx) {	
   	var sqlQuery='INSERT OR REPLACE INTO dacy_Users';
   	  sqlQuery+='(id, username, pwd, departments, loginstatus)';
   	  sqlQuery+='VALUES (?, ?, ?, ?, ?)';
      tx.executeSql(sqlQuery,[data.user_id,username,pwd,data.deptname,data.status], function () {
       
         document.getElementById("mhome").click();
       },function (tx, error) {
    //   myApp.alert('INSERT error: ' + error.message);
       });
   });
	
}	

/* function name : updateUser
 * created by : Rv solutions pvt ltd.
 * Description : This function used to Update existing user info.
*/
	
function updateUser(data){
	db.transaction(function (tx) {
 		var sqlQuery='Update dacy_Users set departments=?,loginstatus=?';
 		sqlQuery +='where id=?';
 		tx.executeSql(sqlQuery,[data.deptname,data.status,data.user_id], function () {
          //myApp.alert('Record updated successfully');
          document.getElementById("mhome").click();
          
       },function (tx, error) {
         //myApp.alert('INSERT error: ' + error.message);
       });
   });
	
}	

function addNavdata(UserId,jdata){
  	db.transaction(function (tx) {	
   	var sqlQuery='INSERT OR REPLACE INTO dacy_Users';
   	  sqlQuery+='(Userid,Navdata)';
   	  sqlQuery+='VALUES (?, ?)';
       tx.executeSql(sqlQuery,[UserId,jdata], function () {
       // myApp.alert('INSERT nav');
         
       },function (tx, error) {
    //   myApp.alert('INSERT error: ' + error.message);
       });
   });	
 	
	
}

function updateNavdata(UserId,jdata){
	db.transaction(function (tx) {
 		var sqlQuery='Update dacy_Users set Navdata=?';
 		sqlQuery +='where UserId=?';
 		tx.executeSql(sqlQuery,[jdata,UserId], function () {
       //   myApp.alert('Update nav');
          
       },function (tx, error) {
         //myApp.alert('INSERT error: ' + error.message);
       });
   });
	
	
}

/* function name : getNavigation
 * created by : Rv solutions pvt ltd.
 * Description : Build dynamic navigation on role basis.
 */	
function navigationOnline(Userid,Token){
	
	$.ajax({
        url: webservice_url+'getnavigation',
        type: 'POST',
		datatype:'json',
        data: {user_id:Userid},
        async: true,
        crossDomain: true,
        success: function (data) {
        navstructure(data);
        db.transaction(function (tx) {
   	      var sqlQuery='SELECT * FROM dacy_Nav where Userid=?';
          tx.executeSql(sqlQuery,[Userid], function (tx, results) {
    	    var len = results.rows.length, i;
    	      myApp.hidePreloader();
    	     if(len==0){
    	     	    addNavdata(Userid,data);
    	     }else{
    	     	    updateNavdata(Userid,data);
    	     }
            
       },null);
     });
         
    }
    });
	
	
	
} 	
/* function name : getNavigation
 * created by : Rv solutions pvt ltd.
 * Description : Build dynamic navigation on role basis.
 */
function navigationOffline(Userid,Token){
	
	  db.transaction(function (tx) {
   	        var sqlQuery='SELECT * FROM dacy_Nav where Userid=?';
          tx.executeSql(sqlQuery,[Userid], function (tx, results) {
    	    var len = results.rows.length, i;
    	     myApp.hidePreloader();
    	     if(len==0){
    	     	    //addNavdata(UserId,jdata);
    	     }else{
    	     	  
    	     	  navstructure(results.rows.item(0).Navdata);
    	     }
            
       },null);
     });
	
	
	
} 	
	
	
/* function name : getNavigation
 * created by : Rv solutions pvt ltd.
 * Description : Build dynamic navigation on role basis.
 */
function getNavigation(){
	var userId=localStorage.getItem("Userid");
	var Networkstauts=getConnectioninfo();
	switch(Networkstauts){
	case 'Unknown connection': 
	      navigationOffline(userId,'1');
	      break;
	case 'Ethernet connection': 
	      navigationOffline(userId,1); 
	      break;	
	case 'No network connection': 
	     navigationOffline(userId,1); 	
	      break;
	 default:
	      navigationOnline(userId,1); 
		
	}
	getmuseuminfo(userId);
  
}
/* function name : capitalize
 * created by : Rv solutions pvt ltd.
 * Description : Convert first later capital.
 */
function capitalize(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}
 
 function populateDB(tx) {
     tx.executeSql('CREATE TABLE IF NOT EXISTS dacy_Users (id unique,username,pwd,departments,loginstatus)');
     tx.executeSql('CREATE TABLE IF NOT EXISTS dacy_Nav (Id INTEGER PRIMARY KEY   AUTOINCREMENT,Userid,Navdata)');
     tx.executeSql('CREATE TABLE IF NOT EXISTS dacy_Museum (Id INTEGER PRIMARY KEY  AUTOINCREMENT,Userid,museumid,museumname)');
     var natureOfCollection='CREATE TABLE IF NOT EXISTS Museumdata(Id INTEGER PRIMARY KEY   AUTOINCREMENT,Museumid,Formname,Formdata,Createdby,Modifyby,Createddate,Modifydate)';
     tx.executeSql(natureOfCollection);
   
}

   function  createdb(){
    db.transaction(populateDB, errorCB, successCB);
	}
    // Transaction error callback
    //
    function errorCB(err) {
    // alert("Error processing SQL: "+err);
    }

    // Transaction success callback
    //
    function successCB() {
       //alert("success!");
    }
    
    
    
/* function name : losort
 * created by : Rv solutions pvt ltd.
 * Description :Convert object into array.
 */  
    function losort(obj)
  {  // map the object to an array [key, obj[key]]
    return Object.keys(obj).map(function(key) { return [key,obj[key]]}).sort(
      function (keya, keyb)
      { // sort(from largest to smallest)
          return keyb[1] - keya[1];
      }
    );
  }
/* function name : check_email
 * created by : Rv solutions pvt ltd.
 * Description :Validate email.
 */  
  function check_email(val){
    if(!val.match(/\S+@\S+\.\S+/)){ // Jaymon's / Squirtle's solution
        // Do something
        return false;
    }
    if( val.indexOf(' ')!=-1 || val.indexOf('..')!=-1){
        // Do something
        return false;
    }
    return true;
}
/* function name : phonenumber
 * created by : Rv solutions pvt ltd.
 * Description :Validate phone number.
 */  
function phonenumber(inputtxt)  
{  
  var phoneno = /^\d{10}$/;  
  if(inputtxt.value.match(phoneno))  
  {  
      return true;  
  }  
  else  
  {  
    
     return false;  
  }  
}  
/* function name : valueIsNaN
 * created by : Rv solutions pvt ltd.
 * Description :Check empty values.
 */ 
 
 function valueIsNaN(v) { return v !== v; }
 
/* function name : validatedata
 * created by : Rv solutions pvt ltd.
 * Description :Implement a custom validation for a form.
 */ 
  function validatedata(dname,x_elements,y_elements){
  	var newdata_value=x_elements;
     switch(y_elements){
  		 case 'required':
			 if(newdata_value == "" || newdata_value == null || newdata_value.length==0 )
			{ 
				
				   
			    	myApp.alert(capitalize(dname)+': This is required field','Error Message!');
			        return false;
			}
			break;
			case 'number':
			      if(valueIsNaN(newdata_value) || newdata_value == "" || newdata_value == null || newdata_value.length==0){
			      	 myApp.alert(capitalize(dname)+': Please Enter Numaric value.','Error Message!');
			         return false;
		        }
		   break;
		   case 'email':
				    if(check_email(newdata_value)==false){
				    	myApp.alert(capitalize(dname)+': Please Enter Valid Email Address','Error Message!');
					     return false;
				     }
			break;
			case 'phone':
				 if(phonenumber(newdata_value)==false){
				 	 myApp.alert(capitalize(dname)+': Please Enter Valid Phone Number','Error Message!');
				     return false;
				  }  
		      break;
			
			default:
	       
	           if(y_elements!=null){
	           	 var newdata=y_elements.split(',');
                for (var k=0; k < newdata.length; k++){
		                
		                if(validatedata(x_elements,newdata[k])===false){
		                  
	    		          break;
	    	               }
		               
		                
				}
				
			}
			
			
		}
  }
   function checkDateString() {
      navigator.globalization.dateToString(
        new Date(),
        function (date) { 
        	  var mdate=date.value;
        	  localStorage.setItem("Cdate",mdate);
        	     },
        function () {myApp.alert('Error getting dateString\n');},
        {formatLength:'short', selector: 'date and time'}
      );
    }
/* function name : savedformdata
 * created by : Rv solutions pvt ltd.
 * Description :This function used to add form data into local database.
 */ 
 function savedformdata(Createdby,Formname,Formdata,Museumid){
 var Createddate=localStorage.getItem("Cdate");
   db.transaction(function (tx) {	
   	var sqlQuery='INSERT INTO Museumdata';
   	  sqlQuery+='(Museumid, Formname, Formdata, Createdby, Modifyby, Createddate, Modifydate)';
   	  sqlQuery+='VALUES (?, ?, ?, ?, ?, ?,?)';
      tx.executeSql(sqlQuery,[Museumid,Formname,Formdata,Createdby,Createdby,Createddate,Createddate], function () {
      myApp.alert('Record added successfully','Success!');
       },function (tx, error) {
      // myApp.alert('INSERT error: ' + error.message);
       });
   });
 }
/* function name : updateformdata
 * created by : Rv solutions pvt ltd.
 * Description :This function used to update form data into local database.
 */ 
 function updateformdata(Createdby,Formname,Formdata,ID){
 	var Createddate=localStorage.getItem("Cdate");
 	db.transaction(function (tx) {
 		var sqlQuery='Update Museumdata set Formdata=?,Modifyby=?,Modifydate=?';
 		if(Formname=='nature' || Formname=='museums'){
 		    sqlQuery +='where Formname=?';
 		}else{
 	        Formname=ID;
 		    sqlQuery +='where Id=?';
 		}
   
   tx.executeSql(sqlQuery,[Formdata,Createdby,Createddate,Formname], function () {
      myApp.alert('Record updated successfully','Success!');
       },function (tx, error) {
      // myApp.alert('INSERT error: ' + error.message);
       });
   });
 	
 }
 
/* function name : getformdata
 * created by : Rv solutions pvt ltd.
 * Description :This function used display form data.
 */ 
 
 function getformdata(Formname){
 localStorage.setItem("Formaction", 'New');

 db.transaction(function (tx) {
 	var sqlQuery='Select * from Museumdata where Id=?';	
 	
   	
   tx.executeSql(sqlQuery,[Formname], function (tx, results) {
   	 var len = results.rows.length;
   	 var  Formdata = results.rows.item(0).Formdata;
     var  Formn = results.rows.item(0).Formname;
            var Parseddata = JSON.parse(Formdata); 
          
            if(Formdata.length > 15){ 
            	if(Parseddata.picture.length > 10){
            		$('#acq_aqimg').attr('src',Parseddata.picture);
            		$('#acq_aqimg').show();
            		$('.acquisitions').html('Change Photo');
            	}
            	
              myApp.formFromJSON('#'+Formn, Parseddata);
              localStorage.setItem("Formaction", 'Update');
          }
        },null);
   });
	
 }
 
 /* function name : getSingleformdata
 * created by : Rv solutions pvt ltd.
 * Description :This function used display form data.
 */ 
 
 function getSingleformdata(Formname){
var Userid=localStorage.getItem("Userid");
var Museumid  = localStorage.getItem("museumid");

 localStorage.setItem("Formaction", 'New');
 db.transaction(function (tx) {
   var sqlQuery='Select * from Museumdata where Formname=? and Modifyby=? and Museumid=? limit 0,1';
  tx.executeSql(sqlQuery,[Formname,Userid,Museumid], function (tx, results) {
   	 var len = results.rows.length;
   	 var  Formdata = results.rows.item(0).Formdata;
     var  Formn = results.rows.item(0).Formname;
     var Parseddata = JSON.parse(Formdata); 
          if(Formdata.length > 15){ 
          	if(Formn=='nature' || Formn=='museums'){}else{
          		 if(Parseddata.picture.length > 10){
            		$('#acq_aqimg').attr('src',Parseddata.picture);
            		$('#acq_aqimg').show();
            		$('.acquisitions').html('Change Photo');
            	 }
        
          	}
            
              myApp.formFromJSON('#'+Formn, Parseddata);
              localStorage.setItem("Formaction", 'Update');
          }
        },null);
   });
	
 }
/* function name : getformdata
 * created by : Rv solutions pvt ltd.
 * Description :This function used to process form data.
 */ 
 
 function addNatureOfCollection(Formname,Pid){
 	
    var Formname=Formname;
    var formData = myApp.formToJSON('#'+Formname);
    var jdata=JSON.stringify(formData);
    var parsed = JSON.parse(jdata); 
    var data= losort(parsed);
    var errors=0;
	for(var i=0; i < data.length;i++){
		var combindata=data[i];
		var x_elements = document.getElementsByName(combindata[0])[0];
		var y_elements = x_elements.getAttribute('data-validate');
	    	if(validatedata(combindata[0],x_elements.value,y_elements)===false){
	    		errors++;
	    		break;
	    	}
	}
	
	if(errors==0){
	   var Createdby=localStorage.getItem("Userid");
	   var Formdata=jdata;
	   var Museumid  = localStorage.getItem("museumid");
       var facton=localStorage.getItem("Formaction");
    
      if(facton=='New'){
	     savedformdata(Createdby,Formname,Formdata,Museumid);
	   }else{
	     updateformdata(Createdby,Formname,Formdata,Pid);
	     }
	       
	 }
         
 }
/* function name : getformdata
 * created by : Rv solutions pvt ltd.
 * Description :This function used to process form data.
 */ 
  function showformlist(Formname){

   db.transaction(function (tx) {
  	var sqlQuery='Select * from Museumdata where Formname=?';
   tx.executeSql(sqlQuery,[Formname], function (tx, results) {
        var len = results.rows.length, i;
        var pageContent='<div class="list-block cards-list"><ul>';
        if(len==0){ 
          myApp.alert('No record avilable');
         
          }else{
       k=1;
       for(var i=0; i<len; i++){
       	if(k%2==0){
       	 	var vclass="listeven";
       	 	}else{
       		var vclass="listodd";
       	}
       	k++;
       	var  Createddate = results.rows.item(i).Createddate;
       	var  Formdata = results.rows.item(i).Formdata;
        var Parseddata = JSON.parse(Formdata); 
        var  ID = results.rows.item(i).Id;
       	var added=Formname+"_add.html?id="+ID;
       	   switch(Formname){
        case "attendance":
        pageContent +='<li class="card" '+vclass+'"><div class="card-header"><strong>Added On:</strong>';     		
        pageContent +=Createddate+"</div><div class='card-footer'>";
        pageContent +="<a href='"+added+"'>view</a> | <button class='synctoserver' onclick='synctoserver(this);' id='"+ID+"'>sync</button></div></li>";
        break;
        	
        case"visitordetails":
        pageContent +='<li class="card" '+vclass+'"><div class="card-header"><strong>Added On:</strong>';     		
        pageContent +=Createddate+"</div><div class='card-header'><strong>Total visitor:</strong>";
        pageContent +=Parseddata.numberofvisitors+"</div><div class='card-footer'>";
        pageContent +="<a href='"+added+"'>view</a> | <button class='synctoserver' onclick='synctoserver(this);' id='"+ID+"'>sync</button></div></li>";
        break;
        	
        default:
        pageContent +='<li class="card" '+vclass+'"><div class="card-header"><strong>Added On:</strong>';     		
        pageContent +=Createddate+"</div><div class='card-header'><strong>Collection Name:</strong>";
        pageContent +=Parseddata.nameofcollection+"</div><div class='card-footer'>";
        pageContent +="<a href='"+added+"'>view</a> | <button class='synctoserver' onclick='synctoserver(this);' id='"+ID+"'>sync</button></div></li>";
        	
        }
       
         }
       
        }
      
           pageContent +='</ul></div>';
           document.getElementById(Formname+"_drafted").innerHTML=pageContent;
         
        },null);
   });
  
 	
 	
 }	
 
function synctoserver(formd){
   var formid  = formd.id;
   db.transaction(function (tx) {
   var sqlQuery='Select * from Museumdata where Id=?';	
   tx.executeSql(sqlQuery,[formid], function (tx, results) {
 var len = results.rows.length;
 	 if(len > 0){ 
        var  Formdata = results.rows.item(0).Formdata;
        var  Formn = results.rows.item(0).Formname;
        var  userid = results.rows.item(0).Createdby;
        var  createddate = results.rows.item(0).Createddate;
        var  museumid = results.rows.item(0).Museumid;
       var Parseddata = JSON.parse(Formdata); 
       var dataString='formaction=add&token=ase123ser2'+'&formname='+Formn+'&museumid='+museumid;
        dataString +='&formdata='+Formdata+'&createddate='+createddate+'&userid='+userid;
        if(Parseddata.picture.length > 10){
         uploadPhoto(Parseddata.picture);
         var picturedata=Parseddata.picture.substr(Parseddata.picture.lastIndexOf('/')+1);
         dataString +='&picturedata='+picturedata;
          }
        $.ajax({
        url: webservice_url+'synctoserver',
        type: 'POST',
		datatype:'json',
        data: dataString,
        async: true,
        crossDomain: true,
        success: function(resp){
        var data = JSON.parse(resp); 
         if(data.status==1){
           removeform(formid);
          
        }else{
            myApp.alert('synchronization failed.Please try again.','Error!');	
           }
            
         },
        error: function(err) {
            
            console.log(err);
        }
    });
          }
        },null);
   });
 
	
}

function removeform(formid){
	  db.transaction(function (tx) {
          var sqlQuery='delete from Museumdata where Id=?';		
   tx.executeSql(sqlQuery,[formid], function (tx, results) {
         myApp.alert('data synchronization complete.','Success');
         document.getElementById(formid).parentNode.style.display='none';
        },null);
   });
	
	
}

function syncdata(formtype){
	
   var formtype  = formtype;
   var Museumid  = localStorage.getItem("museumid");
   var Createdby=localStorage.getItem("Userid");
       
   db.transaction(function (tx) {
  var sqlQuery='Select * from Museumdata where Formname=? and Modifyby=? and Museumid=? limit 0,1';
   tx.executeSql(sqlQuery,[formtype,Createdby,Museumid], function (tx, results) {
   var len = results.rows.length;
  if(len > 0){ 
        var  Formdata = results.rows.item(0).Formdata;
        var  Formn = results.rows.item(0).Formname;
        var  userid = results.rows.item(0).Createdby;
        var  createddate = results.rows.item(0).Createddate;
        var  museumid = results.rows.item(0).Museumid;
        var Parseddata = JSON.parse(Formdata); 
        var dataString='formaction=manage&token=ase123ser2'+'&formname='+Formn+'&museumid='+museumid;
        dataString +='&formdata='+Formdata+'&createddate='+createddate+'&userid='+userid;
         
        $.ajax({
        url: webservice_url+'synctoserver',
        type: 'POST',
		datatype:'json',
        data: dataString,
        async: true,
        crossDomain: true,
        success: function(resp){
        var data = JSON.parse(resp); 
     
         if(data.status==1){
                 myApp.alert('synchronization done','Success');
          
        }else{
                myApp.alert('synchronization failed.Please try again.','Error!');		
           }
            
         },
        error: function(err) {
            
            myApp.alert('synchronization failed.Please try again.','Error!');		
        }
    });
          }
        },null);
   });
 
	
}
function capturepic1(data){
    setTimeout(function(){$('.acquisitions').html('Change Photo');},3000);
	$('#picturedata').click();
}



function navstructure(data){
	
	var json=JSON.parse(data);
		var Navigationdata='<div class="page-content">'
        + '<div class="list-block">';
        for(var i = 0; i < json.length; i++)
   {   var maction=json[i].action;
   	   var maction=maction.replace(/\s/g, "");
   	   switch(maction){
   	 	case 'add':
   	 	var mname=json[i].name;
   	 	var nameadd = mname.toLowerCase(); 
   	 	var hurl = nameadd.replace(/\s/g, "")+'.html'; 
   	 	Navigationdata+='<ul><li><a class="item-link" href="'+hurl+'"><div class="item-content"><div class="item-inner"><div class="item-title">';
   	 	Navigationdata+=mname;
   	 	Navigationdata+='</div></div></div></a></li></ul>';
   	 	
   	 	default :
   	 	var mname=json[i].name;
   	 	var inner_menu = maction.split("#");
   	 	if(inner_menu.length>1){
        Navigationdata+='<div class="content-block-title">'+mname+'</div>';
   	    var nameadd = mname.toLowerCase(); 
   	    Navigationdata+='<ul>';
   	    for(var k=0; k < inner_menu.length; k++){
   	    var hurl = nameadd.replace(/\s/g, "")+'_'+inner_menu[k]+'.html'; 
   	 	Navigationdata+='<li><a class="item-link" href="'+hurl+'"><div class="item-content"><div class="item-inner"><div class="item-title">';
   	 	Navigationdata+= capitalize(inner_menu[k])+' '+mname;
   	 	Navigationdata+='</div></div></div></a></li>';	
   	    
   	    }
   	    Navigationdata+='</ul>';
   	   }
   	 }
   }
	Navigationdata+='</ul></div></div>';
    var navid = document.getElementById('navid');
	navid.innerHTML=Navigationdata;   
	
}

function getmuseuminfo(Userid){
	$.ajax({
        url: webservice_url+'getmuseuminfo',
        type: 'POST',
		datatype:'json',
        data: {user_id:Userid},
        async: true,
        crossDomain: true,
        success: function(data){
        var data = JSON.parse(data); 
        if(data.status==1){
         db.transaction(function (tx) {
   	        var sqlQuery='SELECT * FROM dacy_Museum where Userid=?';
          tx.executeSql(sqlQuery,[Userid], function (tx, results) {
    	    var len = results.rows.length, i;
    	     localStorage.setItem("museumid",data.id);
    	     if(len==0){
    	     ///	alert('add');
    	     	     addMuseumdata(Userid,data);
    	     }else{
    	     //	alert('up');
    	     	    updateMuseumdata(Userid,data);
    	     }
            
       },null);
     });
        } },
        error: function(err) {
            
            console.log(err);
        }
        
    });
	
	}
	
	function addMuseumdata(UserId,jdata){
		
		db.transaction(function (tx) {	
   	var sqlQuery='INSERT OR REPLACE INTO dacy_Museum';
   	  sqlQuery+='(Userid,museumid,museumname)';
   	  sqlQuery+='VALUES (?,?,?)';
       tx.executeSql(sqlQuery,[UserId,jdata.id,jdata.name], function () {
    //    myApp.alert('add museumdata');
         
       },function (tx, error) {
     // myApp.alert('INSERT error: ' + error.message);
       });
   });	
		
		
		
		
	}
	
	function updateMuseumdata(UserId,jdata){
	    db.transaction(function (tx) {      
 		var sqlQuery='Update dacy_Museum set museumid=?,museumname=?';
 		sqlQuery +='where Userid=?';
 		tx.executeSql(sqlQuery,[jdata.id,jdata.name,UserId], function () {
          //myApp.alert('Update museumdata');
          
          
       },function (tx, error) {
     //   myApp.alert('INSERT error: ' + error.message);
       });
   });
		
		
		
	}
	
	function getMuseumdata(){
		var Userid=localStorage.getItem("Userid");
		db.transaction(function (tx) {
   	        var sqlQuery='SELECT * FROM dacy_Museum where Userid=?';
          tx.executeSql(sqlQuery,[Userid], function (tx, results) {
    	    var len = results.rows.length, i;
    	     if(len==0){
    	  
    	     }else{

    	     	$('#museumids').val(results.rows.item(0).museumid);
    	     	$('#nameofmuseum').val(results.rows.item(0).museumname);
    	       
    	      }
            
       },null);
     });
		
		
	}

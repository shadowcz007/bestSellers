var fs = require('fs-extra');
var path=require('path');
const {remote,ipcRenderer} = require('electron');

var obj=remote.getGlobal('sharedObj');

function loading (argument) {
	var json;
	let dpf=$("#dpf");
 	let ln=dpf.children().length;
 	if (ln==0) {
 		console.log("read AnyDepartment.json")
 		json=fs.readJsonSync(`${__dirname}/data/AnyDepartment.json`);
 		let count=json.length;
 		for (var i = 0; i <= json.length - 1; i++) {
 			//dpf.append("<tr class='dpf'><td src='"+json[i].link+"'>"+json[i].title+"</td><td ></td></tr>");
 			
			dpf.append("<li class='list-group-item dpf' src='"+json[i].link+"'><div class='media-body'><strong>"+json[i].title+"</strong><div class='rank pull-right'></div></div></li>");
 			



 			count--;
 			console.log(count);
 			
			
 		
 		};

 			


 		
 	};

	
    
 	console.log("json had read"+dpf.children().length);

 	
}

function show(argument){

	var json1=fs.readJsonSync(argument);
	let dpc=$("#dpc");
	let ln=dpc.children().length;
 	
 	dpc.html("");
 		console.log("read "+argument);
 		console.log(json1);
 		
 		let count=json1.length;
 		for (var i = 0; i <= json1.length - 1; i++) {
 			dpc.append("<tr class='dpc' id='"+json1[i].title+"'><td src='"+json1[i].link+"'>"+json1[i].title+"</td><td ></td></tr>");
 			
 			count--;
 			//console.log(count);
 			
			
 		
 		};

 			
		$(".dpc").on('click', function(){ 
			var json2;
			ipcRenderer.send('catch',[$(this).find('td').attr('src'),$(this).text(),1]);
		
			console.log("-----------dpc click----"+$(this).find('td').attr('src')); 
			var file=path.join(`${__dirname}`,'../js/data/'+$(this).text()+'.json');
			console.log(file);
	
			json2=fs.readJsonSync(file);
					console.log("load dpc-c---------"+json2);
			if (json2.length==0) {
						console.log("没有下一级")
			}else{

				var html3=$('#'+$(this).text());

				for (var i = json2.length - 1; i >= 0; i--) {
					html3.append("<tr class='dpc' id='"+json2[i].title+"'><td src='"+json2[i].link+"'>"+json1[2].title+"</td><td ></td></tr>");
 			
				}; 

			}
				
			
			
			
		}); 
			
					

 		
 

}

module.exports = {
    loading: loading,
    show:show
    
};
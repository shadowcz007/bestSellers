'use strict';
const fs = require('fs-extra');

const {remote,ipcRenderer} = require('electron');

var obj=remote.getGlobal('sharedObj');

var department=require(path.join(`${__dirname}`,'../js/department.js'));

function saveCatch(){



  var result=obj.result;

  if (result) {

        for (var i = result.length - 1; i >= 0; i--) {
         result[i].title= result[i].title.replace(/.*.Best-Sellers-|\/zgbs.*/g,"");
         result[i].link=result[i].link;
         console.log(result[i].title);
        };

        $("#result").append('<p>' + JSON.stringify(result,null,2).replace(/{|}|[|]/g,' ') + '</p>');
        

        fs.outputJsonSync(path.join(`${__dirname}`,'../js/data/'+obj.dpf[1]+'.json'),result);
        
       // console.log(ipcRenderer);

        ipcRenderer.send('catch-result-save',path.join(`${__dirname}`,'../js/data/'+obj.dpf[1]+'.json'));
  }

  if (result.length==0){
    console.log('result none');
     fs.outputJsonSync(path.join(`${__dirname}`,'../js/data/'+obj.dpf[1]+'.json'),result);
       
  };		
  //department.show(path.join(`${__dirname}`,'../js/data/'+obj.dpf[1]+'.json'));
}


module.exports = {
    save: saveCatch,
    target:obj.dpf
    
};
 






'use strict'
const path=require('path');

const ipcRenderer = require('electron').ipcRenderer

var department=require(path.join(__dirname, './department.js'));

//console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"


ipcRenderer.on('asynchronous-reply', function (event, arg) {
  console.log(arg) // prints "pong"
})

ipcRenderer.send('asynchronous-message', 'ping')



var toolsButtons = document.querySelectorAll('.button-tools');

for (let i = 0; i < toolsButtons.length; i++) {
    var toolsButton = toolsButtons[i];
    var toolsName = toolsButton.innerText;

    prepareButton(toolsButton, toolsName);
}

function prepareButton(buttonEl, toolsName) {
    
    buttonEl.addEventListener('click', function () {
        
        for (let i = 0; i < toolsButtons.length; i++) {
		    let toolsButton = toolsButtons[i];
		    toolsButton.className="nav-group-item button-tools";		    
		}

        buttonEl.className="nav-group-item button-tools active";

        var btnText=buttonEl.innerText.replace(/\s/g,'');

        console.log(btnText);

        ipcRenderer.send('click-button', btnText);

        if (btnText=="AnyDepartment") {
            console.log(path.join(__dirname, './department.js'))
              
            department.loading();

            $(".dpf").on('click', function(){ 
                console.log("dpf click----"+$(this).attr('src')); 
                ipcRenderer.send('catch',[$(this).attr('src'),$(this).text(),0]);
                
                
                department.show(path.join(`${__dirname}`,'../js/data/'+$(this).text()+'.json'));
                
                
            }); 
                        
                    
            
            
        };

    });

}

ipcRenderer.on('catch-result-save-reply', function (event, arg) {
  console.log('catch-result-save-reply------------'+arg) // 
  //department.show(arg);
})

ipcRenderer.on('click-button-reply', function (event, arg) {
  console.log(arg) // prints
})



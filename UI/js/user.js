var UIcontroller = (function(){
    let _sidebar = document.getElementById('sidebar');
    let _appBarOpts = document.querySelector('.app-bar-options');
    let _appOpts = document.querySelectorAll('.app-bar-options li'); 
    let _maintab = document.querySelectorAll('.main-tab > div');
    let _compose = document.getElementById('compose-wrapper');
    let _composeInner = document.getElementById('compose');
    let _composeCloseBtn = document.getElementById('close-btn');
    let _composeExpandBtn = document.getElementById('expand-btn');
    let _sendMsgBtn = document.getElementById('send');
    let _emailInput = document.getElementById('email');
    let _emailInputSuggestion = document.getElementById('email-suggestion');
    
    return{
        sidebar: _sidebar,
        appBarOpts: _appBarOpts,
        appOpts: _appOpts,
        maintab:  _maintab,
        composeInner: _composeInner,
        compose: _compose,
        composeCloseBtn: _composeCloseBtn,
        composeExpandBtn: _composeExpandBtn,
        composeShrink: true,
        sendMsgBtn: _sendMsgBtn,
        emailInput: _emailInput,
        emailSuggestion: _emailInputSuggestion,
    };
    
})(); 

var featureController = (function(){
    
    
    return{
        
    };
    
})(); 

var controller = (function(UIctrl, ftCtrl){
//    UIctrl.inboxBtn.disabled = true;
    var maintab = UIctrl.maintab;
    
    UIctrl.sidebar.addEventListener('click', e=>{
        var tagClass = e.target.classList;
        maintab.forEach(function(tab){
                        
                 if(tab.classList.contains(tagClass[0]))
                    {
                        tab.style.display = 'block';
                        e.target.focus();   
                    }
                else { 
                    if(e.target.id !== 'sidebar'){
                        
                        if(e.target.id === 'compose-btn') {    
                            return true;
                        }
                        if(!UIctrl.composeShrink){

                            UIctrl.composeExpandBtn.click()
                            UIctrl.composeShrink = true;
                            }
                        tab.style.display = 'none';
                    }
                }
        });     
    });
    
    UIctrl.composeCloseBtn.addEventListener('click', (e)=>{
        UIctrl.compose.style.display='none';
    });
    
    UIctrl.composeExpandBtn.addEventListener('click', (e)=>{
        if(UIctrl.composeShrink){
            UIctrl.composeInner.style.cssText ='width: 73.5%;height: 84vh; right: 0px; top: 90px;';
             console.log('clicked');
            e.target.setAttribute("src","imgs/Compress_32.png");
            UIctrl.composeShrink=false;
           
        }
        else{ UIctrl.composeInner.style.cssText =' position: fixed; z-index: 1; width: 420px; height: 420px;';
             e.target.setAttribute("src","imgs/icons8_Enlarge_32.png");
             UIctrl.composeShrink=true;
            }
    });
    
    UIctrl.emailInput.addEventListener('focus', (e)=>{
        UIctrl.emailSuggestion.style.display='block';
    });
    UIctrl.emailInput.addEventListener('blur', (e)=>{
        UIctrl.emailSuggestion.style.display='none';
    });
    
   var barOpts = UIctrl.appBarOpts;   
    UIctrl.appBarOpts.addEventListener('click', (e)=>{
       var elemTagert = e.target;
        if(elemTagert.tagName==='LI') {
//            UIctrl.appOpts.forEach(function(appOpt){
//                if(elemTagert.id !== appOpt.id){
//                   appOpt.classList.remove('.app-active'); 
//                   }
//                else{ elemTagert.classList.toggle('app-active');} 
//                });
            }
    });
    
})(UIcontroller,featureController); 
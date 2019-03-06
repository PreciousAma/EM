var UIcontroller = (function(){
    //Login
    let _username = document.getElementById('username');
    let _password = document.getElementById('password');
    let _loginBtn = document.getElementById('login');
    let _forgetPasswordBlock = document.getElementById('forget-pass-wrapper');
    let _forgetPassPopup = document.getElementsByClassName('forgot-pass-container')[0];
    let _passwordRestBtn = document.querySelector('.forgot-pass-container  button[type="submit"]');
     let _passwordRestCancelBtn = document.querySelector('.forgot-pass-container  button[type="button"]');
    let _restInput = document.getElementById('reset-sent-to');
    
    return{
        //login
        username: _username,
        password: _password,
        loginbtn: _loginBtn,
        forgetPasswordBlock: _forgetPasswordBlock,
        forgetPassPopup:  _forgetPassPopup,
        passwordResetBtn: _passwordRestBtn,
        restInput: _restInput,
        passwordRestCancelBtn: _passwordRestCancelBtn,
        NotifyPasswordReset: (event)=>{
            let contact = _restInput.value
            console.log(contact, 'and somethng else');
            if(!isNaN(contact)&contact !==''){
                alert('A link has been sent to you');
                _forgetPassPopup.classList.toggle('popup-toggle'); 
                event.submit;
            } 
            else{
                event.preventDefault();
                alert('Enter a valid phone number'); 
            }
        },     
        
    };
})();

var featureController = (function(){
    
    
    return{
        
    };
    
})(); 

var controller = (function(UIctrl, ftCtrl){
    
    //        login page event listner to check length of password and username
    UIctrl.loginbtn.addEventListener('click', e=>{
      
        passkey = UIctrl.password.value;
        user = UIctrl.username.value
    
        if(user.length < 4) {
            alert('Username must be at least 4 characters long');
            e.preventDefault();
        }
        else if(passkey.length < 6) {
            alert('Password must be at least 6 characters long');
            e.preventDefault();
        }
       
        else e.submit;
    });
    
     // forget password popup
    let resetBtn = UIctrl.forgetPasswordBlock.firstElementChild;
    let initClicked = false;
    
    resetBtn.addEventListener('click', e=>{
        e.preventDefault();
       UIctrl.forgetPassPopup.classList.toggle('popup-toggle')     
    });
    
    UIctrl.passwordResetBtn.addEventListener('click', e=>{ 
        
        UIctrl.NotifyPasswordReset(e);
    });
    
    UIctrl.passwordRestCancelBtn.addEventListener('click', e=>{
        UIctrl.forgetPassPopup.classList.toggle('popup-toggle');
    }) ;
    
})(UIcontroller,featureController); 
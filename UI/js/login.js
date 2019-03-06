var UIcontroller = (function(){
    //Login
    let _username = document.getElementById('username');
    let _password = document.getElementById('password');
    let _loginBtn = document.getElementById('login');
 //=>
    
    return{
        //login
        username: _username,
        password: _password,
        loginbtn: _loginBtn,
         //=>
        
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
    
   //=>
    
})(UIcontroller,featureController); 
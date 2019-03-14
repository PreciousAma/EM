var UIcontroller = (function(){
    
    //Sign up
    
    let _signUpUsername = document.getElementById('signup-username'); 
    let _phoneNumber = document.getElementById('signup-phone');
    let _signUpPassword = document.getElementById('signup-password');
    let _signUpConfirmPassword = document.getElementById('confirm-pass');
    let _singUpBtn = document.getElementById('sign-up');
    let _signupAgreement = document.getElementById('agreement');
    let _signupFirstname = document.getElementById('signup-firstname');
    let _signupSurname = document.getElementById('signup-surname');
    
    return{
        //sign up
        signUpUsername: _signUpUsername, 
        phoneNumber:  _phoneNumber,
        signUpPassword:  _signUpPassword,
        signUpConfirmPassword: _signUpConfirmPassword,
        signUpBtn:  _singUpBtn,
        signupAgreement: _signupAgreement,
        signFirstname: _signupFirstname,
        signSurname: _signupSurname,
   
        Validations: ()=>{
            var firstname = _signupFirstname.value;
            var surname = _signupSurname.value; 
            var username = _signUpUsername.value; 
            var Digit = _phoneNumber.value; 
            var pwd = _signUpPassword.value;
            var confirmPwd = _signUpConfirmPassword.value;
            
            console.log('//',firstname,surname,username,Digit,pwd,confirmPwd); 
            
            if( !firstname =='' && !surname ==''){
               if(!(username.length<4)){ 
                if( Digit !=='' && Digit.length >5){
                   if( !(pwd < 6) ){
                    if(pwd===confirmPwd){
                       if(_signupAgreement.checked){
                           return true;
                    }else{
                        alert('You need to agree with our terms and conditions before you can sign up');
                                return false;
                    }
                    }else{
                            alert("Your password does not match");
                            return false;
                       }
                }else{
                    alert("Password must be at least 6 characters long"); 
                    return false;
                }
                    }else{
                         alert('You entered an invalid number'); 
                        return false;
                   }
            }else{
                alert( ' your username must be at least 4 characters long');
                return false; 
            }
               }else{
                    alert('firstname or surname cannot be empty');
                    return false;
               }
        },
    }
})();

var featureController = (function(){
    
    
    return{
        
    }
    
})(); 

var controller = (function(UIctrl, ftCtrl){
    
    UIctrl.signUpBtn.addEventListener('click', e=>{
        var validationBoolean = UIctrl.Validations();
        if(!validationBoolean){
            e.preventDefault();
            console.log('not submitted');
        }
        if(validationBoolean) {
            console.log('submitted');
//            UIctrl.submitBtn.click;
            } 
});
  
UIctrl.phoneNumber.addEventListener('keypress', e=>{
    var charCode = (e.which)? e.which : event.keyCode;
    if (charCode==43) return true;
    else if(charCode>31 && (charCode<48 || charCode > 57)){
        e.preventDefault(); 
        return false;
    }
    
    return true;
});

})(UIcontroller,featureController); 
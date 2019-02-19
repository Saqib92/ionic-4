import { Component } from '@angular/core';
import  {Router } from '@angular/router'; 
import { HttpService } from '../http.service'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

headers:any;
		constructor(
			private router: Router,
			private http: HttpService
			){

		}


validateEmail(mail) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
		return (true)
	}
    return (false)
}

	login(email, password){

		if (!this.validateEmail(email)) {
			this.http.presentAlert('Error', 'Please Check Email Address');
			return false;
		}

		if (password == undefined || password == '') {
			this.http.presentAlert('Error', 'Please Enter Password');
			return false;
		}

		let loginObj = {
	      email: email,
	      password: password,
	      device_token : ''
	    };

	    this.http.postApi('login', loginObj).then((res:any)=>{
	    	console.log(res);
	    	if (res.success) {
	    		this.http.presentAlert('Success', res.message);
	    	}
	    	else{
	    		this.http.presentAlert('Error', res.message);
	    	}
	    })	

	}

	toSignup(){
		this.router.navigateByUrl('/signup');
	}


	getData(){
		this.http.getApi('Enter Link Here').then((res:any)=>{
	    	console.log(res);
	    })
	}

}

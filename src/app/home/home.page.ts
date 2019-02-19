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

	login(email, password){
		let loginObj = {
	      email: email,
	      password: password,
	      device_token : ''
	    };

	    this.http.postApi('login', loginObj).then((res:any)=>{
	    	console.log(res);
	    })	

	}

	toSignup(){
		this.router.navigateByUrl('/signup');
	}

}

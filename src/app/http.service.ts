import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
globalUrl:any;
headers:any;
loading:any;
  constructor(public http: Http, public loadingController: LoadingController) {
  	this.globalUrl = 'https://wizdiary.com/api/v1/'
   }

  postApi(link, data){
  	this.presentLoading();
  	this.headers = {'Content-Type':'application/json'};
  	return new Promise(resolve => {
  		this.http.post(this.globalUrl+link, JSON.stringify(data), {headers: this.headers})
  		.subscribe(data => {
            resolve(data.json());
            this.stoploading();
        },
    	(err) => {
	        console.log("Error" + err)
	        this.stoploading();
       	})
    });
  }


  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait',
    });
    await this.loading.present();
    //const { role, data } = await loading.onDidDismiss();
    
  }
  stoploading(){
  	this.loading.dismiss();
  }
}

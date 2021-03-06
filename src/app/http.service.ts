import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
globalUrl:any;
headers:any;
loading:any;
  constructor(
    public http: Http,
    public loadingController: LoadingController,
    public alertController: AlertController
    ) {
  	this.globalUrl = 'https://wizdiary.com/api/v1/'
   }

  postApi(link, data, loader){
    if(loader == true){
    	this.presentLoading();
    }
  	this.headers = {'Content-Type':'application/json'};
  	return new Promise(resolve => {
  		this.http.post(this.globalUrl+link, JSON.stringify(data), {headers: this.headers})
  		.subscribe(data => {
            resolve(data.json());
            if(loader == true){
              this.stoploading();
            }
        },
    	(err) => {
	        console.log("Error" + err)
	        this.stoploading();
       	})
    });
  }

  getApi(link){
    this.presentLoading();
    this.headers = {'Content-Type':'application/json'};
    return new Promise(resolve => {
      this.http.get(this.globalUrl+link, {headers: this.headers})
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

  async presentAlert(h, m) {
    const alert = await this.alertController.create({
      header: h,
      message: m,
      buttons: ['OK']
    });

    await alert.present();
  }
}

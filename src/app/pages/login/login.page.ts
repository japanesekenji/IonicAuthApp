import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials = {
    email: '',
    password: ''
  };
 
  constructor(
    private api: ApiService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}
 
  ngOnInit() { }
 
  async login() {
    const loading = await this.loadingCtrl.create();
    loading.present();

    this.api.login(this.credentials).pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe(res => {
      if (res) {
        this.router.navigateByUrl('/app');
      }
    }, async err => {
      const alert = await this.alertCtrl.create({
        header: 'Login failed',
        message: err.error['msg'],
        buttons: ['OK']
      });
      await alert.present();
    });
  }
}

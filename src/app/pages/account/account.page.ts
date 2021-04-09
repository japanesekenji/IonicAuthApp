import { Component, OnInit } from '@angular/core';
import { ApiService, User } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss']
})
export class AccountPage implements OnInit {
  userForm: FormGroup;
  user: User;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      bio: ''
    });
    this.loadUserData();
  }

  loadUserData() {
    this.api.getUserData().subscribe(res => {
      this.user = res;
      this.userForm.patchValue(res);
    });
  }

  updateUser() {
    this.api
      .updateUser(this.user._id, this.userForm.value)
      .subscribe(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Account updated!',
          buttons: ['OK']
        });
        toast.present();
      });
  }

  async deleteAccount() {
    const alert = await this.alertCtrl.create({
      header: 'Delete account?',
      message: 'This will remove all your information.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary-btn'
        },
        {
          text: 'Okay',
          cssClass: 'danger-btn',
          handler: () => {
            this.api.removeUser(this.user._id).subscribe(async () => {
              const toast = await this.toastCtrl.create({
                message: 'Your Account was deleted!',
                buttons: ['OK']
              });
              toast.present();
              this.api.logout();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  signOut() {
    this.api.logout();
  }
}

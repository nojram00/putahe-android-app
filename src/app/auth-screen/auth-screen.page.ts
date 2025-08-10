import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FireauthService } from '../services/fireauth.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { NgForm } from '@angular/forms';
import { IonModal, ModalController, ToastController, Platform } from '@ionic/angular';
import { take } from 'rxjs';

@Component({
  selector: 'app-auth-screen',
  templateUrl: './auth-screen.page.html',
  styleUrls: ['./auth-screen.page.scss'],
  standalone: false,
})
export class AuthScreenPage implements OnInit {
  @ViewChild('modal') modal!: IonModal;

  day: 'day' | 'night' = 'day';
  greeting: string = 'Good Day';
  constructor(
    private fireauth: FireauthService,
    private router: Router,
    private firestore: FirestoreService,
    private toastCtrl : ToastController,
    private platform: Platform,
    private ngZone : NgZone
  ) {
    // if(this.fireauth.checkAuth() != null){
    //   console.log('User is already logged in')
    //   this.router.navigate(['/'])
    // }
  }

  ngOnInit() {
    this.initializeDay();
    this.greeting = this.day === 'day' ? 'Good Day!' : 'Good Evening!';

    this.fireauth.handleRedirect().then((result) => {
      if (result?.user) {
        const uid = result.user.uid;
        const userData = this.firestore.find('users', uid);

        if (userData == null) {
          this.firestore.createWithCustomId(
            { email: result.user.email },
            'users',
            uid
          );
        }

        this.router.navigate(['/']);
      }
    });
  }

  initializeDay() {
    let hours = new Date().getHours();

    if (hours >= 7 && hours <= 19) {
      this.day = 'day';
    } else {
      this.day = 'night';
    }
  }

  googleLogin() {
    console.log('Starting Google login...');

    if(this.platform.is('android') || this.platform.is('ios') || this.platform.is('mobile')){
      this.fireauth.mobileLoginViaGoogle().then(result => {
        console.log('Google login successful (mobile):', result.user?.uid)

        if(result.user){
          this.firestore.find('users', result.user?.uid).pipe(take(1)).subscribe({
            next: (value) => {
              if (!value) {
                if(result.user == null) return

                this.firestore.createWithCustomId(
                  { email: result.user.email },
                  'users',
                  result.user.uid
                );

                this.ngZone.run(() => {
                  console.log("Navigating to tabs...");
                  // this.router.navigateByUrl('/', { replaceUrl: true });
                  this.router.navigate(['/']);
                });
              }
            },
            error: (err) => {
              console.error('Error finding user:', err);
              this.toastCtrl.create({
                message: 'Google login failed: ' + err.message,
                duration: 3000
              }).then(toast => {
                toast.present()
              })
            }
          });
        }

        this.router.navigate(['/']);
      }).catch(error => {
        console.error('Google login error:', error)
        this.toastCtrl.create({
          message: 'Google login failed: ' + error.message,
          duration: 3000
        }).then(toast => {
          toast.present()
        })
      })
    }
    else {
      this.fireauth.loginViaGoogle().then((user) => {
        console.log('Google login successful:', user);
        if (user.user.uid) {
          const userData = this.firestore.find('users', user.user.uid);

          if (userData == null) {
            this.firestore.createWithCustomId(
              { email: user.user.email },
              'users',
              user.user.uid
            );
          }

          this.firestore.find('users', user.user.uid);

          this.router.navigate(['/']);
        }
      }).catch((error) => {
        console.error('Google login error:', error);
        this.toastCtrl.create({
          message: 'Google login failed: ' + error.message,
          duration: 3000
        }).then(toast => {
          toast.present()
        })
      });
    }


  }

  googleRedirect(){
    // Use redirect for both mobile and web
    this.fireauth.loginViaGoogleRedirect()
  }

  formLogin(form: NgForm) {
    const { email, password } = form.value;

    if(this.platform.is('android') || this.platform.is('ios') || this.platform.is('mobile')){
      this.fireauth.mobileLoginWithCreds(email, password).then((user) => {
        if(user.user){
          this.firestore.find('users', user.user.uid).pipe(take(1)).subscribe({
            next: (value) => {
              if (!value) {
                if(user.user == null) return

                this.firestore.createWithCustomId(
                  { email: user.user.email },
                  'users',
                  user.user.uid
                );

                this.ngZone.run(() => {
                  console.log("Navigating to tabs...");
                  // this.router.navigateByUrl('/', { replaceUrl: true });
                });
              }
            },
            error: (err) => {
              console.error('Error finding user:', err);
              this.toastCtrl.create({
                message: 'Login failed: ' + err.message,
                duration: 3000
              }).then(toast => {
                toast.present()
              })
            }
          });

          this.router.navigate(['/']);
        }
      }).catch((error) => {
        console.error('Login error:', error);
        this.toastCtrl.create({
          message: 'Login failed: ' + error.message,
          duration: 3000
        }).then(toast => {
          toast.present()
        })
      });

      return
    }

    this.fireauth.loginWithCreds(email, password).then((user) => {
      if (user.user.uid) {
        const userData = this.firestore.find('users', user.user.uid);
        if (userData == null) {
          this.toastCtrl.create({
            message: 'User Not Found. Please Sign Up first.'
          }).then(toast => {
            toast.present()
          })

          return
        }

        this.router.navigate(['/']);
      }
    });
  }

  formRegistration(form: NgForm) {
    const { email, password } = form.value;

    if(this.platform.is('android') || this.platform.is('ios') || this.platform.is('mobile')){
      this.fireauth.mobileRegisterWithCreds(email, password).then((user) => {
        if(user.user){
          this.firestore.createWithCustomId(
            { email: email, ...form.value },
            'users',
            user.user.uid
          ).then(() => {
            this.toastCtrl.create({
              message: 'User Created Successfully. Please Login.'
            }).then(toast => {
              toast.present()
            })
          });
        }
      }).catch((error) => {
        console.error('Registration error:', error);
        this.toastCtrl.create({
          message: error.message || 'Registration failed'
        }).then(toast => {
          toast.present()
        })
      });

      return
    }

    this.fireauth.registerWithCreds(email, password).then((user) => {
      if (user.user.uid) {
        const userData = this.firestore.find('users', user.user.uid);
        if(userData != null){
          this.toastCtrl.create({
            message: 'User Already Exists. Please Login.',
            duration: 3000
          }).then(toast => {
            toast.present()
          })

          return
        }

        this.firestore.createWithCustomId(
          { email: email, ...form.value },
          'users',
          user.user.uid
        ).then(() => {
          this.toastCtrl.create({
            message: 'User Created Successfully. Please Login.'
          }).then(toast => {
            toast.present()
          })
        });
      }
    }).catch((error) => {
      console.error('Registration error:', error);
      this.toastCtrl.create({
        message: error.message || 'Registration failed'
      }).then(toast => {
        toast.present()
      })
    });
  }

  checkUser() {
    if(this.platform.is('android') || this.platform.is('ios') || this.platform.is('mobile')){
      this.fireauth.mobileCheckAuth().then((user) => {
        if(user.user){
          alert(user.user.uid)
        }else{
          alert('No user')
        }
      })
    }
    else
    {
      const user = this.fireauth.checkAuth();
      if (user) {
        alert(user.uid);
      } else {
        alert('No user');
      }
    }
  }

  closeModal() {
    this.modal.dismiss();
  }
}

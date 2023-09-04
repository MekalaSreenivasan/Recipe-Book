import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy, OnInit {
  //Angular finds first instance of the directive
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  isUserSignedUp = true;
  isLoading = false;
  error: string = null;
  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(
    private componentResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ){}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }      
    })
  }

  onSwitchMode() {
    this.isUserSignedUp = !this.isUserSignedUp;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {  //Safe check
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    if (this.isUserSignedUp) {
      //authObs = this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart(
        {
          email: email,
          password: password
        }
      ))
    } else {
      this.store.dispatch(
        new AuthActions.SignupStart({
          email: email,
          password: password
        })
      )
    }
    authForm.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  private showErrorAlert(errorMsg) {
    //Normal intialisation will not work here
    const alertComponentFactory = this.componentResolver.resolveComponentFactory(AlertComponent);
    const hostVewContainerRef = this.alertHost.viewContainerRef;
    hostVewContainerRef.clear();
    const componentRef = hostVewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = errorMsg;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostVewContainerRef.clear();
    })
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    this.storeSub.unsubscribe();
  }

}

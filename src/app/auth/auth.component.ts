import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  //Angular finds first instance of the directive
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  isUserSignedUp = true;
  isLoading = false;
  error: string = null;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentResolver: ComponentFactoryResolver
  ){}

  onSwitchMode() {
    this.isUserSignedUp = !this.isUserSignedUp;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {  //Safe check
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isUserSignedUp) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe((response) => {
      console.log(response);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    },
    (errorMsg) => {
      this.error = errorMsg;
      this.showErrorAlert(errorMsg);
      this.isLoading = false;
    }
    );
    authForm.reset();
  }

  onHandleError() {
    this.error = null;
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
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(
    private datastgService: DataStorageService,
    private authService: AuthService
    ) {}

    ngOnInit(): void {
      this.userSub = this.authService.user.subscribe(user => {
        this.isAuthenticated = !!user;
      })
    }

  onSaveData() {
    this.datastgService.storeRecipes();
  }

  onFetchData() {
    this.datastgService.fetchRecipes().subscribe();
  }

  onLogOut() {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-confirme-compte',
  templateUrl: './confirme-compte.component.html'
})
export class ConfirmeCompteComponent {
  key: string | undefined;
  dialogErrorMessage: any;
  confirmeOk: boolean = false;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private layoutService: LayoutService,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.key = params['token'];
    });
  }

  ngOnInit(): void {
    this.onSubmit();
  }

  get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

  onSubmit(): void {
    this.userService.confirmeCompte(this.key!).subscribe(
      data => {
        this.confirmeOk = true;
        this.router.navigate(["/login"]);
      },
      err => this.handleError(err));
  }
  handleError(err: HttpErrorResponse) {
    console.error(`Processing Error: ${JSON.stringify(err)}`);
    this.dialogErrorMessage = err.error.message;
  }
}

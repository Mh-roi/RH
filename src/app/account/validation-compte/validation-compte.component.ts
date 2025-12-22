import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IValidationCompte, ValidationCompte } from 'src/app/shared/model/validationCompte';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-validation-compte',
  templateUrl: './validation-compte.component.html',
  styleUrls: ['./validation-compte.component.scss']
})
export class ValidationCompteComponent {
  validatrionCompte: IValidationCompte = new ValidationCompte();
  dialogErrorMessage: any;
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.validatrionCompte.token = params['token'];
    });
  }

  ngOnInit(): void {
  }

  validationCompte(): void {
    this.userService.validationCompte(this.validatrionCompte).subscribe(
      data => {
        this.router.navigate(["/login"]);
      },
      err => this.handleError(err));
  }
  handleError(err: HttpErrorResponse) {
    console.error(`Processing Error: ${JSON.stringify(err)}`);
    this.dialogErrorMessage = err.error.message;
  }
}


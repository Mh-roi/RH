import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../shared/service/auth.service';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
    selector: 'app-password-reset-finish',
    templateUrl: './password-reset-finish.component.html',
    styleUrls: ['./password-reset-finish.component.scss'],
})
export class PasswordResetFinishComponent {
    form: FormGroup;
    token: string | null = null;
    isSuccessful = false;
    dialogErrorMessage = '';

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) {
        // récupérer le token dans l’URL
        this.route.queryParams.subscribe((params) => {
            this.token = params['token'];
        });

        this.form = this.fb.group(
            {
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirm_password: ['', Validators.required],
            },
            { validators: ConfirmedValidator('password', 'confirm_password') }
        );
    }

    get f() {
        return this.form.controls;
    }

    onSubmit() {
        if (!this.form.valid || !this.token) return;

        const password = this.form.value.password;
        console.log('Token ====>', this.token);
        console.log('Password ====>', password);
        this.authService.resetFinish(password, this.token).subscribe({
            next: () => {
                this.isSuccessful = true;
                this.dialogErrorMessage = '';

                // redirection après 3s
                setTimeout(() => {
                    this.router.navigate(['/auth/login']);
                }, 3000);
            },
            error: (err: HttpErrorResponse) => {
                console.error(err);
                this.isSuccessful = false;
                this.dialogErrorMessage =
                    err.error?.message || 'Une erreur est survenue.';
            },
        });
    }
}

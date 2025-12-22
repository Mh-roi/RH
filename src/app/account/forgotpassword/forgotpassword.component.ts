import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './forgotpassword.component.html'
})
export class ForgotPasswordComponent { 

	username: string | undefined;

    constructor(private layoutService: LayoutService) {}

	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

}

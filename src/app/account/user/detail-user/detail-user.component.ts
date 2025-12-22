import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IUser, User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent {

  @Input() data:  IUser = new User();

  user: IUser = new User();
  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.user = cloneDeep(this.dynamicDialog.data);
    }
  }

  clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }
}

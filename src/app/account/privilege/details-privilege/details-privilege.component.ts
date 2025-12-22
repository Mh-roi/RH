import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPrivilege, Privilege } from 'src/app/shared/model/privilege';

@Component({
  selector: 'app-details-privilege',
  templateUrl: './details-privilege.component.html',
  styleUrls: ['./details-privilege.component.scss']
})
export class DetailsPrivilegeComponent {

  @Input() data: IPrivilege = new Privilege();

  privilege: IPrivilege = new Privilege();
  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.privilege = cloneDeep(this.dynamicDialog.data);
    }
  }

  clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }
}

import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IMinistere, Ministere } from 'src/app/shared/model/ministere';

@Component({
  selector: 'app-details-ministere',
  templateUrl: './details-ministere.component.html',
  styleUrls: ['./details-ministere.component.scss']
})
export class DetailsMinistereComponent {


    ministere: IMinistere = new Ministere();
  @Input() data: IMinistere = new Ministere();

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.ministere = cloneDeep(this.dynamicDialog.data);
    }
    }

    clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }

}

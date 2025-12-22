import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IFonctionnaire, Fonctionnaire } from 'src/app/shared/model/fonctionnaire';
import { IMinistere, Ministere } from 'src/app/shared/model/ministere';


@Component({
  selector: 'app-details-fonctionnaire',
  templateUrl: './detail-fonctionnaire.component.html',
  styleUrls: ['./detail-fonctionnaire.component.scss']
})
export class DetailFonctionnaireComponent {
  fonctionnaire: IFonctionnaire = new Fonctionnaire();
  @Input() data: IFonctionnaire = new Fonctionnaire();
  ministere: IMinistere = new Ministere();

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.fonctionnaire = cloneDeep(this.dynamicDialog.data);
    }
    }

    clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }
}
import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Critere, ICritere } from 'src/app/shared/model/critere';

@Component({
  selector: 'app-detail-critere',
  templateUrl: './detail-critere.component.html',
  styleUrls: ['./detail-critere.component.scss']
})
export class DetailCritereComponent {

  critere: ICritere = new Critere();
  @Input() data: ICritere = new Critere();

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.critere = cloneDeep(this.dynamicDialog.data);
    }
    }

    clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }

}

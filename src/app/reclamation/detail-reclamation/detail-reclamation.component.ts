import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IReclamation, Reclamation } from 'src/app/shared/model/reclamation';

@Component({
  selector: 'app-detail-reclamation',
  templateUrl: './detail-reclamation.component.html',
  styleUrls: ['./detail-reclamation.component.scss'],
})
export class DetailReclamationComponent {
  reclamation: IReclamation = new Reclamation();

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data?.reclamation) {
      this.reclamation = cloneDeep(this.dynamicDialog.data.reclamation);
      console.log("📌 Reclamation reçue :", this.reclamation);
    }
  }

  clear(): void {
    this.dialogRef.close();
    this.dialogRef.destroy();
  }
}

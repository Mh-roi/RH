import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Emploi, IEmploi } from 'src/app/shared/model/emploi';

@Component({
  selector: 'app-details-emploi',
  templateUrl: './details-emploi.component.html',
  styleUrls: ['./details-emploi.component.scss']
})
export class DetailsEmploiComponent {

   emploi: IEmploi = new Emploi();
    @Input() data: IEmploi = new Emploi();
  
    constructor(
      private dialogRef: DynamicDialogRef,
      private dynamicDialog:  DynamicDialogConfig,
  ) {}
  
    ngOnInit(): void {
      if (this.dynamicDialog.data) {
        this.emploi = cloneDeep(this.dynamicDialog.data);
      }
      }
  
      clear(): void {
        this.dialogRef.close();
        this.dialogRef.destroy();
    }
}

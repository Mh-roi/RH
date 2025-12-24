import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IObjectif, Objectif } from 'src/app/shared/model/objectif';

@Component({
  selector: 'app-details-objectif',
  templateUrl: './details-objectif.component.html',
  styleUrls: ['./details-objectif.component.scss']
})
export class DetailsObjectifComponent {
objectif: IObjectif = new Objectif();
  @Input() data: IObjectif = new Objectif();

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.objectif = cloneDeep(this.dynamicDialog.data);
    }
    }

    clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }
}

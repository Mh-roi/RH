import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Domaine, IDomaine } from 'src/app/shared/model/domaine';

@Component({
  selector: 'app-details-domaine',
  templateUrl: './details-domaine.component.html',
  styleUrls: ['./details-domaine.component.scss']
})
export class DetailsDomaineComponent {
domaine: IDomaine = new Domaine();
  @Input() data: IDomaine = new Domaine();

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.domaine = cloneDeep(this.dynamicDialog.data);
    }
    }

    clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }
}

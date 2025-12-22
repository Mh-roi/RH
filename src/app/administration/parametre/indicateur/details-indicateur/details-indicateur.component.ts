import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IIndicateur, Indicateur } from 'src/app/shared/model/indicateur';

@Component({
  selector: 'app-details-indicateur',
  templateUrl: './details-indicateur.component.html',
  styleUrls: ['./details-indicateur.component.scss']
})
export class DetailsIndicateurComponent {
indicateur: IIndicateur = new Indicateur();
  @Input() data: IIndicateur = new Indicateur();

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.indicateur = cloneDeep(this.dynamicDialog.data);
    }
    }

    clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }
}

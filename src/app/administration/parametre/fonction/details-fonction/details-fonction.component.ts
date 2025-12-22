import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IFonction, Fonction } from 'src/app/shared/model/fonction';

@Component({
  selector: 'app-details-fonction',
  templateUrl: './details-fonction.component.html',
  styleUrls: ['./details-fonction.component.scss']
})
export class DetailsFonctionComponent {
  fonction: IFonction = new Fonction();
  @Input() data: IFonction = new Fonction();

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.fonction = cloneDeep(this.dynamicDialog.data);
    }
    }

    clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }
}

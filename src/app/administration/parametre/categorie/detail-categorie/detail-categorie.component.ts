import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Categorie, ICategorie } from 'src/app/shared/model/categorie';


@Component({
  selector: 'app-detail-categorie',
  templateUrl: './detail-categorie.component.html',
  styleUrls: ['./detail-categorie.component.scss']
})
export class DetailCategorieComponent {
  categorie: ICategorie = new Categorie();
  @Input() data: ICategorie = new Categorie();

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.categorie = cloneDeep(this.dynamicDialog.data);
    }
    }

    clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }
}

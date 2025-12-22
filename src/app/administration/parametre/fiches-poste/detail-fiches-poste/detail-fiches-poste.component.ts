import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FichesPoste, IFichesPoste } from 'src/app/shared/model/fiches-poste';

@Component({
  selector: 'app-detail-fiches-poste',
  templateUrl: './detail-fiches-poste.component.html',
  styleUrls: ['./detail-fiches-poste.component.scss']
})
export class DetailFichesPosteComponent {

  
  fichesPoste: IFichesPoste = new FichesPoste();
  @Input() data: IFichesPoste = new FichesPoste();

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.fichesPoste = cloneDeep(this.dynamicDialog.data);
    }
    }

    clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }
}

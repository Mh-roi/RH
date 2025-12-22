import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Activite, IActivite } from 'src/app/shared/model/activite';


@Component({
  selector: 'app-detail-activite',
  templateUrl: './detail-activite.component.html',
  styleUrls: ['./detail-activite.component.scss']
})
export class DetailActiviteComponent {
  activite: IActivite = new Activite();
  @Input() data: IActivite = new Activite();

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.activite = cloneDeep(this.dynamicDialog.data);
    }
    }

    clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }
}

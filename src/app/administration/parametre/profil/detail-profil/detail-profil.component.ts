import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Profil, IProfil } from 'src/app/shared/model/profil';


@Component({
  selector: 'app-detail-profil',
  templateUrl: './detail-profil.component.html',
  styleUrls: ['./detail-profil.component.scss']
})
export class DetailProfilComponent {
  profil: IProfil = new Profil();
  @Input() data: IProfil = new Profil();

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.profil = cloneDeep(this.dynamicDialog.data);
    }
    }

    clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }
}

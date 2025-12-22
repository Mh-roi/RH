import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IProfilAgent, ProfilAgent } from 'src/app/shared/model/profil-agent';

@Component({
  selector: 'app-detail-profil-agent',
  templateUrl: './detail-profil-agent.component.html',
  styleUrls: ['./detail-profil-agent.component.scss']
})
export class DetailProfilAgentComponent {
  ProfilAgent: IProfilAgent = new ProfilAgent();
  @Input() data: IProfilAgent = new ProfilAgent();

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.ProfilAgent = cloneDeep(this.dynamicDialog.data);
    }
    }

    clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }

}

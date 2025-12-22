import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-actions-toolbar-iud',
    templateUrl: './actions-toolbar-iud.component.html',
    styleUrls: ['./actions-toolbar-iud.component.scss'],
})
export class ActionsToolbarIudComponent implements OnInit {
    @Input() enableBtnInfo!: boolean;
    @Input() enableBtnEdit!: boolean;
    @Input() enableBtnDelete!: boolean;
    @Input() enableBtnDownload!: boolean;
    @Input() enableBtnPrivilege?: boolean = false;
    @Input() enableBtnClose: boolean = false;
    @Input() enableBtnEmail: boolean = false;
    @Input() enableBtnTreat: boolean = false;
    @Input() enableBtnEval: boolean = false;
    @Input() enableBtnChanger: boolean = false;
    @Input() enableBtnEditProfil: boolean = false;
    @Input() enableBtnValidation!: boolean;
    @Input() enableBtnNoter!: boolean;
    @Input() enableBtnAttribuer!: boolean;
    @Input() enableBtnPrint!: boolean;
    @Input() enableBtnCloture!: boolean;
    @Input() enableBtnPointer!: boolean;
    @Input() enableBtnRejeter!: boolean;
    @Input() enableBtnAccepter!: boolean;
    @Input() enableBtnListe: boolean = false;

    @Input() enableBtnRejeterNote!: boolean;
    @Input() enableBtnDisableCompte!: boolean;
     @Input() enableBtnCertifierRapport!: boolean;

    @Output() info: EventEmitter<any> = new EventEmitter();
    @Output() liste: EventEmitter<any> = new EventEmitter();
    @Output() edit: EventEmitter<any> = new EventEmitter();
    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Output() privilege: EventEmitter<any> = new EventEmitter();
    @Output() close: EventEmitter<any> = new EventEmitter();
    @Output() email: EventEmitter<any> = new EventEmitter();
    @Output() treat: EventEmitter<any> = new EventEmitter();
    @Output() evaluer: EventEmitter<any> = new EventEmitter();
    @Output() changer: EventEmitter<any> = new EventEmitter();
    @Output() editProfil: EventEmitter<any> = new EventEmitter();
    @Output() download: EventEmitter<any> = new EventEmitter();
    @Output() validation: EventEmitter<any> = new EventEmitter();
    @Output() print: EventEmitter<any> = new EventEmitter();
    @Output() cloture: EventEmitter<any> = new EventEmitter();
    @Output() attribuer: EventEmitter<any> = new EventEmitter();
    @Output() noter: EventEmitter<any> = new EventEmitter();
    @Output() pointer: EventEmitter<any> = new EventEmitter();
    @Output() rejeter: EventEmitter<any> = new EventEmitter();
    @Output() accepter: EventEmitter<any> = new EventEmitter();
    @Output() rejeterNote: EventEmitter<any> = new EventEmitter();
    @Output() desactiverCompte: EventEmitter<any> = new EventEmitter();
    @Output() certifierRapport: EventEmitter<any> = new EventEmitter();


    // items: MenuItem[] = [];

    constructor() {}

    ngOnInit(): void {
        // this.items = [
        //   {
        //       label: 'Détails',
        //       icon: 'pi pi-eye',
        //       items: [
        //           {
        //               label: 'Delete',
        //               icon: 'pi pi-fw pi-trash'
        //           },
        //           {
        //               separator: true
        //           },
        //           {
        //               label: 'Export',
        //               icon: 'pi pi-fw pi-external-link'
        //           }
        //       ]
        //   },
        // ];
    }

    fireInfo() {
        this.info.emit();
    }
    fireListe() {
        this.liste.emit();
    }
    fireEdit() {
        this.edit.emit();
    }

    fireDelete() {
        this.delete.emit();
    }

    firePrivilege() {
        this.privilege.emit();
    }
    fireClose() {
        this.close.emit();
    }
    fireEmail() {
        this.email.emit();
    }

    fireTreat() {
        this.treat.emit();
    }
    fireEvaluer() {
        this.evaluer.emit();
    }
    fireChanger() {
        this.changer.emit();
    }

    fireEditProfil() {
        this.editProfil.emit();
    }

    fireDownload() {
        this.download.emit();
    }
    fireValidation() {
        this.validation.emit();
    }

    firePrint() {
        this.print.emit();
    }
    fireCloture() {
        this.cloture.emit();
    }
    fireAttribuer() {
        this.attribuer.emit();
    }
    fireNoter() {
        this.noter.emit();
    }
    firePointer() {
        this.pointer.emit();
    }

    fireRejeter() {
        this.rejeter.emit();
    }
    fireAccepter() {
        this.accepter.emit();
    }
    fireRejeterNote() {
        this.rejeterNote.emit();
    }

    fireDesactiverCompte() {
        this.desactiverCompte.emit();
    }
    fireCertifierRapport() {
        this.certifierRapport.emit();
    }
}

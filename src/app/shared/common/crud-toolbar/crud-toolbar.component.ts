import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-crud-toolbar',
    templateUrl: './crud-toolbar.component.html',
    styleUrls: ['./crud-toolbar.component.scss'],
})
export class CrudToolbarComponent {
    @Input() enableEnroler!: boolean;
    @Input() enableCreate!: boolean;
    @Input() enableEdit!: boolean;
    @Input() enableDelete!: boolean;
    @Input() enableTreat!: boolean;
    @Input() enableListe!: boolean;
    @Input() enableImporter: boolean = false;
    /*exist? : boolean = false;
  exist1? : boolean = false;
  exis2? : boolean = false;*/
    @Output() create: EventEmitter<any> = new EventEmitter();
    @Output() edit: EventEmitter<any> = new EventEmitter();
    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Output() treat: EventEmitter<any> = new EventEmitter();
    @Output() importer: EventEmitter<any> = new EventEmitter();
    @Output() enroler: EventEmitter<any> = new EventEmitter();
    @Output() liste: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    fireCreate() {
        this.create.emit();
    }

    fireEdit() {
        this.edit.emit();
    }

    fireDelete() {
        this.delete.emit();
    }

    fireTreat() {
        this.treat.emit();
    }

    fireImporter() {
        this.treat.emit();
    }

    fireEnroler() {
        this.treat.emit();
    }
    fireListe() {
        this.liste.emit();
    }
}

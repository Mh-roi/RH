import { Component, OnDestroy, OnInit} from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Activite, IActivite } from 'src/app/shared/model/activite';
import { Note } from 'src/app/shared/model/note';
import { Pointage } from 'src/app/shared/model/pointage.model';
import { ActiviteService } from 'src/app/shared/service/activite.service';
import { NoteService } from 'src/app/shared/service/note.service';
import { PointageService } from 'src/app/shared/service/pointage.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';

@Component({
  selector: 'app-agent-home',
  templateUrl: './agent-home.component.html',
  styleUrls: ['./agent-home.component.scss']
})
export class AgentHomeComponent {

  activites: IActivite[] =[];
  activite: IActivite = new Activite();
  isLoggedIn = false;
  matricule!: string;
  message: any ;
  notes: Note[]=[];
  isLoading: boolean = false;
  anneeActu! : Date;
  nbTache!: number;
  nbNote!: number;
  nbPointage!: number;
  constructor(private activiteService: ActiviteService,
    private tokenStorageService: TokenStorageService,
    private noteService : NoteService,
    private pointageService: PointageService) { }

  ngOnInit(): void {
    this.anneeActu = new Date();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
    this.matricule = user.matricule;
     
    }
    this.load();
    this.loadNbPointage();
  }

  load(event?: LazyLoadEvent) {
   
    this.isLoading = true;
    this.activiteService.getAll(this.matricule,this.anneeActu.getFullYear(),event).subscribe((response) => {
      this.isLoading = false;
      this.nbTache= response.activites.length;
       console.log(this.nbTache)
      // this.totalRecords = response.totalCount;
    }, (error: { error: any; }) => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }




  loadNote(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.noteService.getAllNote(event).subscribe((response: { notes: string | any[]; }) => {
      this.isLoading = false;
      this.nbNote = response.notes.length;
    }, (error: { error: any; }) => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }


   loadNbPointage(): void {
    this.pointageService.getMesPointages().subscribe({
      next: (pointages: Pointage[]) => {
        this.nbPointage = pointages.length;
        console.log("=======================pointages===================",this.nbPointage)
      },
      error: (err) => {
        console.error('Erreur lors du chargement des pointages :', err);
      }
    });
  }

   




}

import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { Activite, IActivite } from 'src/app/shared/model/activite';
import { Agent } from 'src/app/shared/model/agent';
import { Fonctionnaire } from 'src/app/shared/model/fonctionnaire';
import { Note } from 'src/app/shared/model/note';
import { Pointage } from 'src/app/shared/model/pointage.model';
import { ActiviteService } from 'src/app/shared/service/activite.service';
import { AgentService } from 'src/app/shared/service/agent.service';
import { FonctionnaireService } from 'src/app/shared/service/fonctionnaire.service';
import { NoteService } from 'src/app/shared/service/note.service';
import { PointageService } from 'src/app/shared/service/pointage.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-superieur-hierarchique-home',
  templateUrl: './superieur-hierarchique-home.component.html',
  styleUrls: ['./superieur-hierarchique-home.component.scss']
})
export class SuperieurHierarchiqueHomeComponent implements OnInit {

  activites: IActivite[] = [];
  fonctionnaires: Fonctionnaire[] = [];
  notes: Note[] = [];
  agents: Agent [] = [];
  nbPointage!: number;


  isLoggedIn = false;
  matricule!: string;
  message: any;
  isLoading = false;

  recordsPerPage = environment.recordsPerPage;
  totalRecords!: number;
  page = CURRENT_PAGE;
  maxSize = MAX_SIZE_PAGE;

  anneeActu!: Date;

  nbTache: number = 0;
  nbNote: number = 0;
  nbAgent: number = 0;

  constructor(
    private activiteService: ActiviteService,
    private tokenStorageService: TokenStorageService,
    private noteService: NoteService,
    private fonctionnaireService: AgentService,
    private pointageService: PointageService
  ) {}

  ngOnInit(): void {
    this.anneeActu = new Date();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.matricule = user.matricule;
    }

  //  this.loadTaches();
  //  this.loadNotes();
  this.loadNbPointage();
    this.loadAgents();
  }

  // Récupérer toutes les tâches de l’utilisateur
 /*  loadTaches(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.activiteService.getAll(this.matricule, this.anneeActu.getFullYear(), event)
      .subscribe(response => {
        this.isLoading = false;
        this.nbTache = response.totalItems ?? response.activites.length; // selon API
        this.activites = response.activites;
      }, error => {
        this.isLoading = false;
        this.message = { severity: 'error', summary: error.error };
      });
  } */

  // Récupérer toutes ses notes
/*   loadNotes(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.noteService.getAllNoteByMatricule(this.matricule, event) // ⚡️ utilise l’API filtrée
      .subscribe(response => {
        this.isLoading = false;
        this.nbNote = response.totalItems ?? response.notes.length;
        this.notes = response.notes;
      }, error => {
        this.isLoading = false;
        this.message = { severity: 'error', summary: error.error };
      });
  } */

  // Récupérer tous ses agents
loadAgents(): void {
  this.fonctionnaireService.getAgentsBySuperieur(this.matricule)
    .subscribe(result => {
      if (result) {
        this.agents = result;
        this.nbAgent = result.length; // ici tu as bien le total
      }
    }, error => {
      this.message = { severity: 'error', summary: error.error };
    });
}


   loadNbPointage(): void {
    this.pointageService.getMesPointages().subscribe({
      next: (pointages: Pointage[]) => {
        this.nbPointage = pointages.length;
       // console.log("============LE NOMBRE DE pointages===================",this.nbPointage)
      },
      error: (err) => {
        console.error('Erreur lors du chargement des pointages :', err);
      }
    });
  }

}

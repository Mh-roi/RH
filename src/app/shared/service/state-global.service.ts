import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateGlobalService {

      // private apiUrl = 'http://localhost:8080/api/statistiques/agentStat/';
      private apiUrl = 'https://digicop.gov.bf/api/statistiques/agentStat/';


     constructor(private http: HttpClient) { }

    getAgentStatistiques(matricule: string, profil: string): Observable<any> {
      const url = `${this.apiUrl}${matricule}/${profil}`;
      return this.http.get(url);
    }
}

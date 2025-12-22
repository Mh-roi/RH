import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

import { createRequestOption } from '../util/request-util';
import { Agent, IAgent } from '../model/agent';
import { GetAllAgentResponse } from '../model/get-all-agent-response';
import { IFonctionnaire } from '../model/fonctionnaire';

type EntityResponseType = HttpResponse<IAgent>;
type EntityArrayResponseType = HttpResponse<IAgent[]>;
const AgentUrl = environment.AgentResource;
const AgentUrls = environment.AgentResources;
const afficherCodeUrl = environment.afficherCodeResource;
const genererCodeUrl = environment.genererCodeResource;
const affiliationUrl = environment.changeAffiliationResource;
const verifierUrl = environment.verifierAffiliationResource;
const rejeterAgentUrl = environment.rejeterAgentResource;
const changePasswordUrl = environment.changePassword;
//const mesAgentsBySuperieurUrl = environment.AgentResource;
const resourceUrlAgent = environment.mesAgentsResource;

@Injectable({
    providedIn: 'root',
})
export class AgentService {
    constructor(private http: HttpClient) {}

    create(Agent: IAgent): Observable<EntityResponseType> {
        return this.http.post<IAgent>(`${AgentUrl}/new`, Agent, {
            observe: 'response',
        });
    }
    createFonctionnaire(
        agent: IFonctionnaire
    ): Observable<HttpResponse<IFonctionnaire>> {
        return this.http.post<IFonctionnaire>(`${AgentUrl}/new`, agent, {
            observe: 'response',
        });
    }

    update(Agent: IAgent): Observable<EntityResponseType> {
        return this.http.put<IAgent>(AgentUrl, Agent, { observe: 'response' });
    }
    // update fonctionnnaire
    updateFonctionnaire(request: IFonctionnaire): Observable<IFonctionnaire> {
        return this.http.put<IFonctionnaire>(`${AgentUrl}/update`, request);
    }

    updateAcc(request: Agent): Observable<Agent> {
        return this.http.put(AgentUrl, request);
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAgent>(`${AgentUrl}/${id}`, {
            observe: 'response',
        });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAgent[]>(AgentUrl, {
            params: options,
            observe: 'response',
        });
    }

    findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
        return this.http.get<IAgent[]>(AgentUrl, { observe: 'response' });
    }
    listAgents(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
        return this.http.get<IAgent[]>(`${AgentUrl}/list`, {
            observe: 'response',
        });
    }

 
listAgentsPagination(req?: any): Observable<EntityArrayResponseType> {
  console.log('Requête envoyée au backend :', req); // 👀
  return this.http.get<IAgent[]>(`${AgentUrl}/list-page`, { params: req, observe: 'response' });
}

    delete(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${AgentUrl}/${id}`, { observe: 'response' });
    }

    afficherCodeAffiliation(): Observable<IAgent> {
        return this.http.get(`${afficherCodeUrl}`, {});
    }

    genererCodeAffiliation(): Observable<IAgent> {
        return this.http.post(`${genererCodeUrl}`, {});
    }

    changerAffiliation(
        oldCodeAffiliation: string,
        newCodeAffiliation: string,
        reference: string,
        motif: string
    ): Observable<any> {
        return this.http.post(affiliationUrl, {
            oldCodeAffiliation,
            newCodeAffiliation,
            reference,
            motif,
        });
    }

    VerifierAffiliation(code: string): Observable<any> {
        return this.http.get(`${verifierUrl}/${code}`);
    }

    getAllAgent(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<Agent[]>(resourceUrlAgent, {
            params: options,
            observe: 'response',
        });
    }

    // getAllAgent(): Observable<GetAllAgentResponse> {
    //   return this.http.get(resourceUrlAgent,{observe:'response'})
    //   .pipe(map(response => {
    //       let AgentResponse: GetAllAgentResponse = {
    //         Agents: response.body as Agent[],

    //       };

    //       return AgentResponse;
    //     }));
    // }

    rejeterAgent(request: Agent, matricule: string): Observable<Agent> {
        return this.http.put(rejeterAgentUrl + matricule, request);
    }

    getAgentConnecte(matricule: string): Observable<IAgent> {
        return this.http.get(`${AgentUrl}/${matricule}`);
    }

    addCollaborateur(matricule: string): Observable<IAgent> {
        return this.http.put<IAgent>(`${AgentUrl}/ajouter/${matricule}`, {
            observe: 'response',
        });
    }

    getSuperieurAgent(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<Agent[]>(AgentUrl, {
            params: options,
            observe: 'response',
        });
    }

    /*
    changerPassword(request: ChangePasswordVo): Observable<ChangePasswordVo> {
      return this.http.post(changePasswordUrl,request);
    }
  */

    getAgentByMatricule(matricule: string): Observable<IAgent> {
        return this.http
            .get<IAgent>(`${AgentUrls}/${matricule}`, { observe: 'response' })
            .pipe(
                map((response) => {
                    if (response.body) {
                        return response.body;
                    } else {
                        throw new Error(
                            'Aucun Agent trouvé avec ce matricule.'
                        );
                    }
                })
            );
    }

    getAgent(matricule: string): Observable<GetAllAgentResponse> {
        return this.http
            .get(`${AgentUrl}/${matricule}`, { observe: 'response' })
            .pipe(
                map((response) => {
                    let agentResponse: GetAllAgentResponse = {
                        agents: response.body as Agent[],
                        agent: response.body as Agent,
                    };
                    return agentResponse;
                })
            );
    }

    getAgentsBySuperieur(matricule: string): Observable<IAgent[]> {
        const url = `${environment.mesAgentsBySuperieurUrl}/${matricule}`;
        return this.http.get<IAgent[]>(url);
    }

    /*     enrolerAgent(id: number): Observable<IAgent> {
      return this.http.put<IAgent>(`${AgentUrl}/enroler/${id}`, {});
    } */

    retirerAgent(
        idAgent: number,
        matriculeSuperieur: string
    ): Observable<IAgent> {
        const url = `${AgentUrl}/retrait/${idAgent}?matriculeSuperieur=${matriculeSuperieur}`;
        return this.http.put<IAgent>(url, {});
    }

    enrolerAgent(agent: IAgent): Observable<IAgent> {
        return this.http.put<IAgent>(`${AgentUrl}/enroler`, agent);
    }
}

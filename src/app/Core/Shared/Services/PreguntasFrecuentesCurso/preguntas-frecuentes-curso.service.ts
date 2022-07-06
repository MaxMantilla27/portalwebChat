import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreguntasFrecuentesCursoService {
  public urlBase=environment.url_api+'PreguntasFrecuentesCurso';
  constructor(private http: HttpClient) { }
  public ObtenerPreguntaFrecuentePorPrograma(IdPrincipal:number,IdPGeneral:number):Observable<any>{
    return this.http.get<any>(this.urlBase+'/ObtenerPreguntaFrecuentePorPrograma?IdPrincipal='+IdPrincipal+'&IdPGeneral='+IdPGeneral);
  }
}

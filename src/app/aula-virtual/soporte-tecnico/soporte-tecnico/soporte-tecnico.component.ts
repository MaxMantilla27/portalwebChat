import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ChatEnLineaService } from 'src/app/Core/Shared/Services/ChatEnLinea/chat-en-linea.service';
import { HelperService } from 'src/app/Core/Shared/Services/helper.service';
import { SnackBarServiceService } from 'src/app/Core/Shared/Services/SnackBarService/snack-bar-service.service';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@microsoft/signalr';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { SessionStorageService } from 'src/app/Core/Shared/Services/session-storage.service';
@Component({
  selector: 'app-soporte-tecnico',
  templateUrl: './soporte-tecnico.component.html',
  styleUrls: ['./soporte-tecnico.component.scss'],

})
export class SoporteTecnicoComponent implements OnInit {
  /* public hubConnection: HubConnection; */
  public hubConnection: any;

  constructor(
    private http: HttpClient,
    private _ChatEnLinea: ChatEnLineaService,
    private _SnackBarServiceService: SnackBarServiceService,
    private _HelperService: HelperService,
    private elementRef:ElementRef,
    private _sessionStorage:SessionStorageService


  ) {
    console.log("Inicio de conexión")
    let builder = new HubConnectionBuilder();
    console.log(builder)

    this.hubConnection = new signalR.HubConnectionBuilder()
    .withAutomaticReconnect()
      .withUrl("https://localhost:7120/hub?idUsuario=11&&usuarionombre=Anonimo&&rooms=633")
      .build();

    this.hubConnection.on("messageReceived", (username: string, message: string) => {
      console.log(username),
      console.log(message)
    });
    this.hubConnection.on("conectado", (x: any) => {
      console.log(x)
    });
    this.Configuracion();

    this.hubConnection.start().then((x:any) =>{
        /* this.GetId(); */
        /* this.hubConnection.stop(true,true).then((x:any)=>console.log(x)); */
        console.log(x)
        this.GenerarLogVisitante()
      })

        .catch((err:any) =>console.log('Error while starting connection: ' + err));
          console.log(this.hubConnection);
    this.hubConnection.on("NuevaActividad",(username: string, message: string) => {
      console.log(username),
      console.log(message)
    });
    /* this.hubConnection.onreconnected(() => {
      this.http.get('https://localhost:7120/hub')
      .subscribe(res => {
        console.log(res);
      })
    }) */

  }
  @Input() idProgramageneral=0;
  public data=[];
  public connectionId='';
  public auxiliar:any;
  public message ='';
  public messages:any;
  public chatInicial=false;
  public chatOpen=false;
  statuscharge = false;
  formVal: boolean = false;
  public initValues = false;
  public validacionChat = false;
  public nombreAsesor:any;
  public idpais=51;
  public estadoLogeo='3';
  public nombre1='';
  public apellido1='';
  public IdUsuarioEnviar='';
  public nombres='';
  public apellidos='';
  public correo='';
  public celular='';
  public idalumno=0;
  public idcampania=this._sessionStorage.SessionGetValue("idCampania")==''?'0':(this._sessionStorage.SessionGetValue("idCampania"));

  public username = new Date().getTime();
  public combosPrevios:any
  ngOnInit(): void {

  }
  EnviarMensajeChat(){
  }

  send() {
    this.hubConnection.invoke('NuevaActividadParaEjecutar2', this.connectionId, "Mensaje Prueba Juan").then((x:any)=> console.log(x))
    this.hubConnection.send("newMessage", this.username, 'prueba mensaje')
      .then(() => (console.log('enviado')));
/*     this.hubConnection.send("NuevaActividadParaEjecutar2","ASD","Mensaje de Prueba Juan")
      .then(()=>(console.log('enviado mensaje Juan'))); */
  }
  GetId(){
    this.hubConnection.invoke('getconnectionid')
      .then((data:any) => {
        console.log(data);
        this.connectionId = data;
      });
  }
  send2() {
    this.hubConnection.invoke('NuevaActividadParaEjecutar2', this.IdUsuarioEnviar, "Usuario mensaje envio prueba");

  }
  GenerarLogVisitante(){
    var cookiecontaco = this._sessionStorage.SessionGetValue("usuarioWeb")
    console.log(cookiecontaco)
    this.hubConnection.invoke("GenerarLogVisitante",document.location.href, document.referrer, "Arequipa", "Arequipa", "Peru", cookiecontaco, this.idProgramageneral, this.idpais, this.estadoLogeo, this.nombres, this.apellidos, this.correo, this.celular,0,0, this.idalumno, this.idcampania)
  }
  Configuracion(){
    this.hubConnection.on("configuracion", (x: any) => {
      console.log(x)
    });
  }




}


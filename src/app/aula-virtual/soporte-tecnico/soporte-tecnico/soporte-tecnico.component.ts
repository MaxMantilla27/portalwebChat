import { Component, ElementRef, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ChatEnLineaService } from 'src/app/Core/Shared/Services/ChatEnLinea/chat-en-linea.service';
import { HelperService } from 'src/app/Core/Shared/Services/helper.service';
import { SnackBarServiceService } from 'src/app/Core/Shared/Services/SnackBarService/snack-bar-service.service';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@microsoft/signalr';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
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
    private elementRef:ElementRef


  ) {
    console.log("Inicio de conexión")
    let builder = new HubConnectionBuilder();
    console.log(builder)

    this.hubConnection = new signalR.HubConnectionBuilder().withUrl("https://localhost:7120/hub").build();

    this.hubConnection .on("messageReceived", (username: string, message: string) => {
      console.log(username),
      console.log(message)
    });
    this.hubConnection.start().then(() =>{
        this.GetId();
        console.log('Connection started')})
        .catch((err:any) =>console.log('Error while starting connection: ' + err));
    console.log(this.hubConnection);
    this.hubConnection.on("NuevaActividad",(username: string, message: string) => {
      console.log(username),
      console.log(message)
    });
  }

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
  public nombre1='';
  public apellido1='';

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


}


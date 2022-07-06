import { Component, ElementRef, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ChatEnLineaService } from 'src/app/Core/Shared/Services/ChatEnLinea/chat-en-linea.service';
import { HelperService } from 'src/app/Core/Shared/Services/helper.service';
import { SnackBarServiceService } from 'src/app/Core/Shared/Services/SnackBarService/snack-bar-service.service';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@aspnet/signalr';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
@Component({
  selector: 'app-soporte-tecnico',
  templateUrl: './soporte-tecnico.component.html',
  styleUrls: ['./soporte-tecnico.component.scss'],

})
export class SoporteTecnicoComponent implements OnInit {
  /* public hubConnection: HubConnection; */
  public hubConnection2: any;
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
    /* this.hubConnection = builder.configureLogging(signalR.LogLevel.Debug).withUrl("http://localhost:14150/signalr").build(); */
    this.hubConnection2 = new signalR.HubConnectionBuilder().withUrl("http://localhost:14150/signalr").build();

    this.hubConnection2 .on("messageReceived", (username: string, message: string) => {
      console.log(username),
      console.log(message)
    });
    this.hubConnection2.start().then(() =>console.log('Connection started'))
        .catch((err:any) =>console.log('Error while starting connection: ' + err));
    console.log(this.hubConnection2)



/*     builder.integraHub.connection.qs ="idUsuario=" + 11 + ";rooms=" + 633 + ";usuarioNombre=Anonimo"; */

   /*  $.connection.hub.url = "http://localhost:14150/signalr";
    if (!$.connection.integraHub) {
        _conexionFallida();
        return;
    }
    $.connection.integraHub.connection.qs = "idUsuario=" + 11 + ";rooms=" + 633 + ";usuarioNombre=Anonimo";

    _integraProxy = $.connection.integraHub;
 */

   /*  this.hubConnection.on("ReceiveMessage",(Mensaje) =>{
      this.messages.push(Mensaje);
      console.log(this.messages)
    })
    this.hubConnection.start().then(() =>console.log('Connection started'))
        .catch(err =>console.log('Error while starting connection: ' + err));
    console.log(this.hubConnection) */


  }
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
    this.hubConnection2.send("newMessage", this.username, 'prueba mensaje')
      .then(() => (console.log('enviado')));
  }
}


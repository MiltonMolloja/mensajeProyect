import { Component, OnInit } from '@angular/core';

import { Mensaje } from './../../models/mensaje';
import { Empresa } from './../../models/empresa';
import { MensajeService } from 'src/app/services/mensaje.service';
import { EmpresaService } from 'src/app/services/empresa.service';



@Component({
  selector: 'app-punto01',
  templateUrl: './punto01.component.html',
  styleUrls: ['./punto01.component.css']
})
export class Punto01Component implements OnInit {
  mensaje: Mensaje;
  empresa: Empresa;
  tamMaxTexto: number = 20;
  tamTexto: number;
  mensajes: Array<Mensaje>;
  empresas: Array<Empresa>;


  constructor(private mensajeService: MensajeService) {
    this.mensaje = new Mensaje();
    this.empresa = new Empresa();
    this.mensajes = new Array<Mensaje>();
    this.empresas = new Array<Empresa>();
    this.obtenerEmrpesas();
    this.mostrarHistoricos();
    this.enviarMensaje();
    //console.log(this.empresas);
  }

  ngOnInit() {
  }

  public obtenerEmrpesas() {
    this.mensajeService.getEmpresas().subscribe(
      results => {
        console.log(results['empresas']);
        this.empresas = JSON.parse(results['empresas']);
        console.log(this.empresas);
      }
    );
  }

  public mostrarHistoricos() {
    //llamamos al metodo del service
    //para cargar los mensajes
    this.mensajeService.getMensajes()
      .subscribe(
        result => {
          this.mensajes = result;
          console.log(this.mensajes);
        },
        error => {
          alert("error en la peticion");
        });
  }

  public borrarMensaje(id: number) {
    this.mensajeService.borrarMensaje(id).subscribe(
      result => {
        console.log("borrado correctamente.")
        //actualizo la tabla de mensajes
        this.mostrarHistoricos();
        return true;
      },
      error => {
        console.error("Error deleting!");
        console.log(error);
        return false;
      }
    )
  }

  public enviarMensaje() {
    this.empresa = new Empresa();
    this.mensaje = new Mensaje();
    this.mensaje.fecha = new Date();
    //this.mensaje.id = 17;
    this.mensaje.desde = 1555555;
    this.mensaje.para = 133333;
    this.mensaje.texto = "HOLA";
    this.empresa.id = 1;
    this.empresa.nombre = "Personal";
    this.empresa.razonSocial = "PersonalSA";
    this.empresa.urlWebsite = "WWW.PersonalSA";
    this.mensaje.empresa = this.empresa;
    this.mensajeService.sendMensaje(this.mensaje)
      .subscribe(
        result => {
          console.log("agregado correctamente.");
        },
        error => {
          alert("Error en el envio.");
        });
  }

  public elegirMensaje(mensaje: Mensaje) {
    //Creo una copia del mensaje recibido como parametro para NO modificarlo
    //ya que el parametro esta mostrandose por el binding en el datatable
    this.mensaje = Object.assign(this.mensaje, mensaje);
    //se asigna a la propiedad mensaje.empresa el correspondiente en el
    //array de empresas, ya que este array es fuente de datos del <select>
    this.mensaje.empresa = this.empresas.find(function (item: Empresa) {
      return item.id === mensaje.empresa.id;
    });
  }

  public actualizarMensaje() {
    //seteo nuevamente la fecha actual para el msj modificado
    this.mensaje.fecha = new Date();
    this.mensajeService.modificarMensaje(this.mensaje).subscribe(
      data => {
        console.log("modificado correctamente.")
        //actualizo la tabla de mensajes
        this.mostrarHistoricos();
        return true;
      },
      error => {
        console.error("Error updating!");
        console.log(error);
        return false;
      });
  }

  public cambiarTamTexto(){

  }
}

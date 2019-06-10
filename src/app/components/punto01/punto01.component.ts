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

  public enviarMensaje() {
    this.mensaje.fecha = new Date();
    this.mensajes.push(this.mensaje);
    this.mensaje = new Mensaje();
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


}

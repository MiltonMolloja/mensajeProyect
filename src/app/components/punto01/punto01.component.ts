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
  tamMaxTexto: number = 20;
  tamTexto: number;
  mensajes: Array<Mensaje>;
  empresas: Array<Empresa>;


  constructor(private mensajeService: MensajeService) {
    this.mensaje = new Mensaje();
    this.mensajes = new Array<Mensaje>();
    this.empresas = new Array<Empresa>();
    this.obtenerEmrpesas();
  }

  ngOnInit() {
  }

  public obtenerEmrpesas() {
    this.mensajeService.getEmpresas().subscribe(
      results => {
        this.empresas = results['empresas'];
        console.log(this.empresas);
      }
    );
  }

  public enviarMensaje() {
    this.mensaje.fecha = new Date();
    this.mensajes.push(this.mensaje);
    this.mensaje = new Mensaje();
  }


}

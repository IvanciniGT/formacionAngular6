import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

const PATRON_DNI = "^((([0-9]{1,2}[.][0-9]{3}[.][0-9]{3})|([0-9]{1,3}[.][0-9]{3})|([0-9]{1,8}))[ -]?[a-zA-Z])$";
const LETRAS_DNI = "TRWAGMYFPDXBNJZSQVHLCKE";
@Component({
  selector: 'app-formulario-nuevo-usuario',
  templateUrl: './formulario-usuario.html',
  styleUrls: ['./formulario-usuario.css'],
  imports: [ReactiveFormsModule, CommonModule], // Dentro tiene en ngSubmit
})
export class FormularioNuevoUsuarioComponent {

  formulario: FormGroup;
  direcciones: FormArray;

  constructor( private readonly constructorDeFormularios: FormBuilder ) {
    this.direcciones = this.constructorDeFormularios.array([]); // ARRAY es una lista de formularios
    // Con el constructor de formulario creamos/definimos un formulario (conceptual,estructura, lógico, no visual)
    // El constructor me devuelve un objeto de tipo FormGroup, que es la representación lógica de un formulario.
    this.formulario = this.constructorDeFormularios.group({ // Group es un FORMULARIO
      // campo: ['VALOR POR DEFECTO', [Validaciones]]
      // Angular nos ofrece en su módulo de formularios muchas validaciones predefinidas
      // Y luego yo puedo crearme mis propias funciones de validación específicas
      // Las validaciones se definen/usan mediante una clase que ofrece angular, llamada Validators
      nombre:     [null, [ Validators.required, Validators.minLength(3), Validators.maxLength(50) ]], 
      apellidos:  [null, [ Validators.required, Validators.minLength(3), Validators.maxLength(50) ]],
      edad:       [null, [ Validators.required, Validators.min(0), Validators.max(150) ]],
      email:      [null, [ Validators.required, Validators.email ]],
      conduce:    [null, [ Validators.required ]],
      vehiculo:   [null ],
      dni:        [null, [ Validators.required, Validators.pattern(PATRON_DNI) ] , FormularioNuevoUsuarioComponent.dniValido ],
      direcciones: this.direcciones
    });
  }

  agregarDireccion() {
    const nuevoFormularioDeDireccion = this.constructorDeFormularios.group({
      // Detallo los campos de ese subformulario de dirección
      calle:      [null, [ Validators.required, Validators.minLength(3), Validators.maxLength(50) ]],
      numero:     [null, [ Validators.required, Validators.min(1), Validators.max(10000) ]],
      ciudad:     [null, [ Validators.required, Validators.minLength(3), Validators.maxLength(50) ]],
      codigoPostal: [null, [ Validators.required, Validators.minLength(5), Validators.maxLength(5) ]],
    });
    this.direcciones.push(nuevoFormularioDeDireccion);
  }

  eliminarDireccion(indice: number) {
    this.direcciones.removeAt(indice);
  }

  guardarFormulario() {
    // Cojo los datos del formulario:
    const datosDelFormulario = this.formulario.value;
    console.log("Datos del formulario:", datosDelFormulario);
    const dniEscrito = datosDelFormulario.dni;
    let dniNormalizado = FormularioNuevoUsuarioComponent.normalizarDNI(dniEscrito);
    // Completo con 0s a la izquierda hasta que tenga 8 dígitos
    dniNormalizado = ("0000000"+dniNormalizado);
    dniNormalizado = dniNormalizado.substring(dniNormalizado.length-9);
    datosDelFormulario.dni = dniNormalizado;
    console.log("Datos del formulario con DNI normalizado:", datosDelFormulario);
    // Este dato, lo pasaría a un servicio (como el que hicimos de usuarios... para que se guarde en un backend, en una base de datos, etc)
  }

  // En la función no usamos por ningñun lado ningún atributo de la clase (si no tengo this.)
  // Este tipo de funciones de validación tienen siempre esta pinta. Lo impone Angular.
  static dniValido(campoDelFormularioConElDNI: AbstractControl) : Observable<ValidationErrors|null> {
    // Obtener el valor actual del campo del formulario
    const valorActual = campoDelFormularioConElDNI.value;
    const esValido = FormularioNuevoUsuarioComponent.validarDNI(valorActual);
    if(esValido){
      return of(null); // Nada. Promesa(Observable) null
    } else{
      return of({ dniInvalido: true }); // Promesa(Observable) con un objeto que describe el error
    }
  }

  static validarDNI(dni:string): boolean {
    dni = FormularioNuevoUsuarioComponent.normalizarDNI(dni);
    const numero = dni.substring(0, dni.length - 1);
    const letra = dni.charAt(dni.length - 1);
    const restoDeLaDivisionEntrera = parseInt(numero) % 23;
    const letraQueCorrespondeAlNumero = LETRAS_DNI.charAt(restoDeLaDivisionEntrera);
    return letra === letraQueCorrespondeAlNumero;
  }
  static normalizarDNI(dni:string): string {
    dni = dni.toUpperCase();
    // Quitarle puntos, espacios y guiones. Si aparecen, ya sé que están en buen sitio (PATRON)
    dni = dni.trim().replaceAll(".","").replaceAll("-", "").replaceAll(" ", "");
    return dni;
  }

}


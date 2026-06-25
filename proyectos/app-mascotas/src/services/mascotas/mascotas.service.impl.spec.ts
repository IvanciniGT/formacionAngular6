import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';

import { MascotasServiceImpl } from './mascotas.service.impl';
import { MascotaBackend } from './mascota.backend.model';
import { Mascota } from '../../models/mascota.model';

describe('MascotasServiceImpl', () => {

  const URL_BASE = 'http://localhost:3000/mascotas';

  let service: MascotasServiceImpl;
  let httpMock: HttpTestingController;

  // Datos de ejemplo reutilizados en los tests.
  const mascotaBackend: MascotaBackend = {
    id: '1',
    nombre: 'Toby',
    tipo: 'perro',
    raza: 'Labrador',
    edad: 4,
    foto: 'https://ejemplo.com/toby.jpg',
  };

  const mascotaEsperada: Mascota = {
    id: '1',
    nombre: 'Toby',
    tipo: 'perro',
    raza: 'Labrador',
    edad: 4,
    foto: 'https://ejemplo.com/toby.jpg',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MascotasServiceImpl,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(MascotasServiceImpl);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no quedan peticiones pendientes sin atender.
    httpMock.verify();
  });

  it('debe crearse', () => {
    expect(service).toBeTruthy();
  });

  describe('listar', () => {

    it('hace un GET sin parámetros cuando no hay filtros y mapea el resultado', async () => {
      const promesa = firstValueFrom(service.listar());

      const req = httpMock.expectOne((r) => r.url === URL_BASE);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.keys().length).toBe(0);
      req.flush([mascotaBackend]);

      await expect(promesa).resolves.toEqual([mascotaEsperada]);
    });

    it('añade los query params nombre:contains y tipo cuando hay filtros', async () => {
      const promesa = firstValueFrom(service.listar({ nombre: 'Tob', tipo: 'perro' }));

      const req = httpMock.expectOne((r) => r.url === URL_BASE);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('nombre:contains')).toBe('Tob');
      expect(req.request.params.get('tipo')).toBe('perro');
      req.flush([mascotaBackend]);

      await expect(promesa).resolves.toEqual([mascotaEsperada]);
    });

    it('devuelve una lista vacía cuando el backend no devuelve mascotas', async () => {
      const promesa = firstValueFrom(service.listar());

      httpMock.expectOne((r) => r.url === URL_BASE).flush([]);

      await expect(promesa).resolves.toEqual([]);
    });
  });

  describe('obtener', () => {

    it('hace un GET a la url con el id y mapea la mascota', async () => {
      const promesa = firstValueFrom(service.obtener('1'));

      const req = httpMock.expectOne(`${URL_BASE}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mascotaBackend);

      await expect(promesa).resolves.toEqual(mascotaEsperada);
    });
  });

  describe('crear', () => {

    it('hace un POST sin enviar el id y devuelve la mascota creada', async () => {
      const nueva: Mascota = {
        nombre: 'Luna',
        tipo: 'gato',
        raza: 'Siamés',
        edad: 2,
        foto: 'https://ejemplo.com/luna.jpg',
      };

      const promesa = firstValueFrom(service.crear(nueva));

      const req = httpMock.expectOne(URL_BASE);
      expect(req.request.method).toBe('POST');
      // El id no debe viajar en el body: lo asigna el backend.
      expect(req.request.body.id).toBeUndefined();
      expect(req.request.body.nombre).toBe('Luna');
      req.flush({ id: '99', ...nueva });

      await expect(promesa).resolves.toEqual({ id: '99', ...nueva });
    });
  });

  describe('actualizar', () => {

    it('hace un PUT a la url con el id enviando la mascota', async () => {
      const promesa = firstValueFrom(service.actualizar('1', mascotaEsperada));

      const req = httpMock.expectOne(`${URL_BASE}/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mascotaEsperada);
      req.flush(mascotaBackend);

      await expect(promesa).resolves.toEqual(mascotaEsperada);
    });
  });

  describe('eliminar', () => {

    it('hace un DELETE a la url con el id', async () => {
      const promesa = firstValueFrom(service.eliminar('1'));

      const req = httpMock.expectOne(`${URL_BASE}/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);

      await expect(promesa).resolves.toBeNull();
    });
  });

  describe('errores', () => {

    it('propaga el error cuando el backend falla al listar', async () => {
      const promesa = firstValueFrom(service.listar());

      httpMock
        .expectOne((r) => r.url === URL_BASE)
        .flush('Boom', { status: 500, statusText: 'Server Error' });

      await expect(promesa).rejects.toBeTruthy();
    });
  });
});

// Estado de una operación asíncrona, usado por los componentes para informar al usuario.
// - idle: aún no se ha iniciado nada.
// - loading: hay una operación en curso (mostramos un spinner / "cargando...").
// - success: la operación terminó correctamente.
// - error: la operación falló.
export type EstadoCarga = 'idle' | 'loading' | 'success' | 'error';

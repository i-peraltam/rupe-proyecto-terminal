/* RUPE - JavaScript del prototipo
   Funciones sencillas para navegación, validaciones y demostración. */

function elemento(id) {
  return document.getElementById(id);
}

function valor(id) {
  var campo = elemento(id);
  return campo ? campo.value.trim() : '';
}

function mensaje(id, texto, tipo) {
  var caja = elemento(id);
  if (!caja) return;
  caja.textContent = texto;
  caja.className = 'mensaje ' + (tipo || '');
}

function mostrar(id) {
  var pantallas = document.querySelectorAll('.pantalla');
  for (var i = 0; i < pantallas.length; i++) {
    pantallas[i].classList.remove('activa');
  }

  var pantalla = elemento(id);
  if (pantalla) {
    pantalla.classList.add('activa');
    window.scrollTo(0, 0);
  }
}

function validarTutor() {
  var nombre = valor('tutorNombre');
  var telefono = valor('tutorTelefono');
  var correo = valor('tutorCorreo');
  var privacidad = elemento('avisoPrivacidad').checked;

  if (!nombre || !telefono || !correo || !privacidad) {
    mensaje('mensajeTutor', 'Completa nombre, teléfono, correo y acepta el aviso de privacidad.', 'error');
    return;
  }

  mensaje('mensajeTutor', '', '');
  mostrar('p03');
}

function validarMascota() {
  if (!valor('mascotaNombre') || !valor('mascotaSexo') || !valor('mascotaRaza') || !valor('mascotaTamano') || !valor('mascotaColor')) {
    mensaje('mensajeMascota', 'Completa los datos principales de la mascota.', 'error');
    return;
  }

  mensaje('mensajeMascota', '', '');
  mostrar('p04');
}

function mostrarVistaPreviaFoto(event) {
  var archivo = event.target.files[0];
  var marco = elemento('vistaFoto');
  if (!archivo || !marco) return;

  var lector = new FileReader();
  lector.onload = function(e) {
    marco.innerHTML = '<img src="' + e.target.result + '" alt="Vista previa de la mascota">';
  };
  lector.readAsDataURL(archivo);
}

function validarExtravio() {
  if (!valor('fechaExtravio') || !valor('alcaldia') || !valor('colonia')) {
    mensaje('mensajeExtravio', 'Completa fecha, alcaldía y colonia.', 'error');
    return;
  }

  cargarResumen();
  mensaje('mensajeExtravio', '', '');
  mostrar('p06');
}

function cargarResumen() {
  elemento('resTutorNombre').textContent = valor('tutorNombre') || '—';
  elemento('resTutorTelefono').textContent = valor('tutorTelefono') || '—';
  elemento('resTutorCorreo').textContent = valor('tutorCorreo') || '—';
  elemento('resMascotaNombre').textContent = valor('mascotaNombre') || '—';
  elemento('resMascotaRaza').textContent = valor('mascotaRaza') || '—';
  elemento('resMascotaColor').textContent = valor('mascotaColor') || '—';
  elemento('resMascotaSenas').textContent = valor('mascotaSenas') || '—';
  elemento('resFechaExtravio').textContent = valor('fechaExtravio') || '—';
  elemento('resZonaExtravio').textContent = valor('colonia') + ', ' + valor('alcaldia');
}

function confirmarRegistro() {
  actualizarDatosPublicos();
  mostrar('p07');
}

function actualizarDatosPublicos() {
  var nombre = valor('mascotaNombre') || 'Max';
  var raza = valor('mascotaRaza') || 'Labrador';
  var color = valor('mascotaColor') || 'Dorado';
  var tamano = valor('mascotaTamano') || 'Grande';
  var senas = valor('mascotaSenas') || 'Collar azul';
  var zona = (valor('colonia') || 'Del Carmen') + ', ' + (valor('alcaldia') || 'Coyoacán');

  var idsNombre = ['fichaMascotaNombre', 'seguimientoMascotaNombre', 'publicMascotaNombre'];
  for (var i = 0; i < idsNombre.length; i++) elemento(idsNombre[i]).textContent = nombre;

  elemento('fichaMascotaRaza').textContent = raza;
  elemento('fichaMascotaColor').textContent = color;
  elemento('fichaMascotaTamano').textContent = tamano;
  elemento('fichaMascotaSenas').textContent = senas;
  elemento('fichaZonaExtravio').textContent = zona;
  elemento('publicMascotaRaza').textContent = raza;
  elemento('publicMascotaColor').textContent = color;
  elemento('publicMascotaTamano').textContent = tamano;
  elemento('publicMascotaSenas').textContent = senas;
  elemento('publicZonaExtravio').textContent = zona;
}

function generarQR() {
  var bloque = elemento('bloqueQr');
  bloque.style.display = 'block';
  var url = window.location.href.split('#')[0] + '#reporte-RUPE-2026-0001';
  elemento('urlQr').textContent = url;

  crearQR('codigoQr', url);
  crearQR('codigoQrFicha', url);
}

function crearQR(id, texto) {
  var contenedor = elemento(id);
  if (!contenedor) return;
  contenedor.innerHTML = '';

  if (typeof QRCode !== 'undefined') {
    new QRCode(contenedor, { text: texto, width: 130, height: 130 });
  } else {
    contenedor.innerHTML = '<div class="qr-demo" title="QR de demostración"></div>';
  }
}

function mostrarFicha() {
  elemento('fichaBusqueda').style.display = 'block';
  generarQR();
}

function ocultarFicha() {
  elemento('fichaBusqueda').style.display = 'none';
}

function imprimirFicha() {
  window.print();
}

function consultarFolio() {
  var folio = valor('folio').toUpperCase();
  if (folio === 'RUPE-2026-0001') {
    mensaje('msgFolio', '', '');
    mostrar('p09');
  } else {
    mensaje('msgFolio', 'Folio no encontrado. Para la demostración usa RUPE-2026-0001.', 'error');
  }
}

function guardarEstadoCaso() {
  var estado = valor('nuevoEstado');
  elemento('estadoCaso').textContent = estado;
  mensaje('mensajeEstado', 'Estado actualizado en esta demostración.', 'ok');

  var historial = elemento('historialCaso');
  var item = document.createElement('div');
  item.className = 'historial-item';
  item.innerHTML = '<span class="historial-marca"></span><div><strong>Actualización del caso</strong><p>Nuevo estado: ' + estado + '.</p></div>';
  historial.appendChild(item);
}

function enviarAvistamiento() {
  if (!valor('avFecha') || !valor('avHora') || !valor('avAlcaldia') || !valor('avColonia')) {
    mensaje('mensajeAvistamiento', 'Completa fecha, hora, alcaldía y colonia.', 'error');
    return;
  }
  mensaje('mensajeAvistamiento', 'Avistamiento registrado correctamente en la demostración.', 'ok');
}

function enviarResguardo() {
  var nombre = valor('resNombre');
  var telefono = valor('resTelefono');
  var correo = valor('resCorreo');

  if (!valor('resFecha') || !valor('resHora') || !valor('resAlcaldia') || !valor('resColonia')) {
    mensaje('mensajeResguardo', 'Completa fecha, hora, alcaldía y colonia.', 'error');
    return;
  }

  if (!nombre) {
    mensaje('mensajeResguardo', 'Captura el nombre del resguardante.', 'error');
    return;
  }

  if (!telefono && !correo) {
    mensaje('mensajeResguardo', 'Captura al menos teléfono o correo del resguardante.', 'error');
    return;
  }

  elemento('detalleResNombre').textContent = nombre;
  elemento('detalleResTelefono').textContent = telefono || 'No proporcionado';
  elemento('detalleResCorreo').textContent = correo || 'No proporcionado';
  mensaje('mensajeResguardo', 'Resguardo registrado correctamente. El Tutor podrá consultar los datos de contacto.', 'ok');
}

function iniciarSesionAdmin() {
  if (!valor('adminUsuario') || !valor('adminClave')) {
    mensaje('mensajeLogin', 'Captura usuario y contraseña.', 'error');
    return;
  }
  mensaje('mensajeLogin', '', '');
  mostrar('p20');
}

function cerrarSesionAdmin() {
  elemento('adminUsuario').value = '';
  elemento('adminClave').value = '';
  mostrar('p01');
}

function mostrarFormularioUsuario() { elemento('formUsuario').style.display = 'block'; }
function ocultarFormularioUsuario() { elemento('formUsuario').style.display = 'none'; }

function agregarUsuarioDemo() {
  var nombre = valor('nuevoUsuarioNombre');
  var cuenta = valor('nuevoUsuarioCuenta');
  if (!nombre || !cuenta) {
    mensaje('mensajeUsuario', 'Captura nombre y usuario.', 'error');
    return;
  }

  var cuerpo = elemento('tablaUsuarios').querySelector('tbody');
  var fila = cuerpo.insertRow();
  fila.innerHTML = '<td>' + nombre + '</td><td>' + cuenta + '</td><td>' + valor('nuevoUsuarioRol') + '</td><td><span class="estado-activo">' + valor('nuevoUsuarioEstado') + '</span></td><td><button type="button" class="boton-tabla" onclick="simularEdicion(this)">Modificar</button> <button type="button" class="boton-tabla peligro-tabla" onclick="cambiarEstadoUsuario(this)">Desactivar</button></td>';

  mensaje('mensajeUsuario', 'Usuario agregado en la demostración.', 'ok');
}

function cambiarEstadoUsuario(boton) {
  var fila = boton.closest('tr');
  var estado = fila.cells[3].querySelector('span');
  if (estado.textContent === 'Activo') {
    estado.textContent = 'Inactivo';
    boton.textContent = 'Reactivar';
  } else {
    estado.textContent = 'Activo';
    boton.textContent = 'Desactivar';
  }
}

function simularEdicion() {
  alert('En el prototipo esta acción representa la modificación del registro.');
}

function mostrarFormularioRol() { elemento('formRol').style.display = 'block'; }
function ocultarFormularioRol() { elemento('formRol').style.display = 'none'; }

function agregarRolDemo() {
  var nombre = valor('nuevoRolNombre');
  if (!nombre) {
    mensaje('mensajeRol', 'Captura el nombre del rol.', 'error');
    return;
  }

  var descripcion = valor('nuevoRolDescripcion') || 'Rol administrativo del RUPE.';
  var articulo = document.createElement('article');
  articulo.className = 'rol-card';
  articulo.innerHTML = '<div><h3>' + nombre + '</h3><p>' + descripcion + '</p></div><div class="acciones-rol"><button type="button" class="boton-tabla" onclick="simularEdicion(this)">Modificar</button></div>';
  elemento('listaRoles').appendChild(articulo);
  mensaje('mensajeRol', 'Rol agregado en la demostración.', 'ok');
}

function cargarPermisosRol() {
  var esAdmin = valor('rolPermisos') === 'Administrador';
  var casillas = elemento('p23').querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < casillas.length; i++) {
    casillas[i].checked = esAdmin || i === 0;
  }
}

function guardarPermisos() {
  mensaje('mensajePermisos', 'Permisos guardados en la demostración.', 'ok');
}

// Si el archivo se abre con un enlace que contiene el folio, se muestra la vista pública.
window.addEventListener('load', function() {
  if (window.location.hash.indexOf('reporte-RUPE-2026-0001') !== -1) {
    mostrar('p16');
  }
});

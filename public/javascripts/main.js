document.addEventListener('DOMContentLoaded', function() {

    // ---------------------------------------------------------
    // 1. EVENTOS DE TECLADO (Requisito: 2 eventos)
    // ---------------------------------------------------------

    // A) Keyup: Convertir a Mayúsculas (Ya lo tenías)
    const inputNombre = document.getElementById('nombre');
    if (inputNombre) {
        inputNombre.addEventListener('keyup', function(e) {
            e.target.value = e.target.value.toUpperCase();
        });
    }

    // B) Keydown: Detectar tecla ESCAPE para cancelar formulario
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            // Solo si estamos en la página de crear/editar
            if(document.querySelector('form')) {
                if(confirm("¿Deseas cancelar y volver al inicio?")) {
                    window.location.href = "/";
                }
            }
        }
    });
    // ---------------------------------------------------------
    // 2. EVENTO DE RATÓN (Doble clic + Notificación Toast)
    // ---------------------------------------------------------

    const celdas = document.querySelectorAll('tbody td');
    // Preparamos la notificación de Bootstrap (busca el elemento por ID)
    const toastElement = document.getElementById('liveToast');
    let toastBootstrap = null;

    // Solo inicializamos si existe el elemento en el HTML
    if (toastElement) {
        // eslint-disable-next-line no-undef
        toastBootstrap = new bootstrap.Toast(toastElement);
    }

    celdas.forEach(celda => {
        // Cursor especial para indicar que hay función
        celda.style.cursor = "copy";
        celda.title = "Doble clic para copiar";

        celda.addEventListener('dblclick', function() {
            // Ignorar botones
            if (this.children.length > 0 && this.children[0].tagName === 'A') return;

            const texto = this.innerText;

            navigator.clipboard.writeText(texto).then(() => {
                // Mostrar la notificación profesional
                if (toastBootstrap) {
                    toastBootstrap.show();
                }
                console.log(`Copiado: ${texto}`);
            });
        });
    });
    // ---------------------------------------------------------
    // 3. ANIMACIÓN (Requisito: 1 animación + 1 listener)
    // ---------------------------------------------------------

    const tabla = document.querySelector('.tabla-animada');

    if (tabla) {
        // A) Trigger: Esperamos un poquito y agregamos la clase que inicia el movimiento
        setTimeout(() => {
            tabla.classList.add('aparecer');
        }, 100); // 100ms de retraso aseguran que el navegador note el cambio

        // B) Evento Listener (Requisito Rúbrica): Detectar fin de animación
        tabla.addEventListener('transitionend', function() {
            console.log("¡La animación de la tabla ha terminado!");
        });
    }
    // ---------------------------------------------------------
    // 4. DRAG AND DROP REAL (Reordenar filas)
    // ---------------------------------------------------------

    const filas = document.querySelectorAll('tbody tr');
    let filaArrastrada = null; // Variable para recordar qué estamos moviendo

    filas.forEach(fila => {
        // Hacemos que la fila se pueda arrastrar
        fila.setAttribute('draggable', true);

        // Al empezar a arrastrar
        fila.addEventListener('dragstart', function() {
            filaArrastrada = this; // Guardamos la referencia de la fila
            this.style.opacity = '0.4';
            this.style.background = '#e9ecef'; // Color grisáceo
        });

        // Al terminar (soltar o cancelar)
        fila.addEventListener('dragend', function() {
            this.style.opacity = '1';
            this.style.background = ''; // Quitar color
            filaArrastrada = null;
        });

        // IMPORTANTE: Para poder soltar, hay que prevenir el comportamiento por defecto
        fila.addEventListener('dragover', function(e) {
            e.preventDefault();
        });

        // Al soltar sobre otra fila
        fila.addEventListener('drop', function() {
            // Si hay una fila guardada y no es la misma sobre la que soltamos
            if (filaArrastrada && filaArrastrada !== this) {
                // Intercambiamos de lugar visualmente en el HTML
                // Insertamos la fila arrastrada justo antes de la fila donde soltamos
                this.parentNode.insertBefore(filaArrastrada, this);
            }
        });
    });

    // Validaciones del formulario (Mantener lo que ya tenías)
    const formulario = document.getElementById('formularioProducto');
    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            const precio = parseFloat(document.getElementById('precio').value);
            const stock = parseInt(document.getElementById('stock').value);
            if (precio < 0 || stock < 0) {
                event.preventDefault();
                alert("ERROR: El precio y el stock no pueden ser negativos.");
            }
        });
    }
});
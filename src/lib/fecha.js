/* La fecha larga en castellano, sin depender de Intl ni de la configuración
   regional del servidor que compile: el resultado tiene que ser el mismo en
   tu portátil y en el hosting. */
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
               'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

export function fechaLarga(iso) {
  const [anio, mes, dia] = iso.split('-');
  return `${parseInt(dia, 10)} de ${MESES[parseInt(mes, 10) - 1]} de ${anio}`;
}

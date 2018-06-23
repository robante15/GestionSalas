export class Solicitud {
    constructor(
        public _id: string,
        public localID: String,
        public correlativo: String,
        public fecha_solicitud: String,
        public nombre_actividad: String,
        public inicio_evento: String,
        public fin_evento: String,
        public numero_asistentes: String,
        public responsable_actividad: String,
        public unidad_solicitante: String,
        public jefe_unidad_solicitante: String,
        public aprovacion: String,
        public administrador_sistema: String
    ) {

    }
}
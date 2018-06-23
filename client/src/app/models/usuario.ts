export class Usuario {
    constructor(
        public _id: string,
        public usuario: String,
        public contrasena: String,
        public email: String,
        public nombre: String,
        public apellido: String,
        public rol: String,
        public departamento_seccion: String,
        public image: String
    ) {

    }
}
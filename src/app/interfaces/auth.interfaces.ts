

export interface LoginResponse {
  ok:      boolean;
  status:  string;
  message: string;
  data?:    Usuario;
}
export interface ApiResponse {
  ok:      boolean;
  status:  string;
  http_status_code?  :  number;
  message: string;
  data?:    any[];
}
export interface ApiResponseNewClient {
  ok:      boolean;
  status:  string;
  message: string;
  data?:    Cliente;
}
export interface Cliente {
  id?:         number;
  nombre?:     string;
  apellido?:   string;
  password?:   string;
  email?:      string;
  telefono?:   string;
}

export interface Usuario {
  id?:         number;
  nombres?:    string;
  apellidos?:  string;
  fullName?:   string;
  username?:   string;
  telefono?:   string;
  email?:      string;
  perfil?:     Perfil;
  token?:      string;
  password?:   string;
  rut?:        string;
  dvrut?:      string;
  rol?:       string;
  profile?:    string;
  activo?:     string;
}

export interface Perfil {
  id:     string;
  nombre: string;
}
export interface GoogleUser{
  given_name?:     string;
  family_name?:    string;
  nickname?:       string;
  name?:           string;
  picture?:        string;
  locale?:         string;
  updated_at?:     string;
  email?:          string;
  email_verified?: boolean,
  sub?:            string;
}

export interface Usuario {
  id?:         number;
  nombres?:    string;
  apellidos?:  string;
  fullName?:   string;
  username?:   string;
  telefono?:   string;
  email?:      string;
  perfil?:     Perfil;
  token?:      string;
  password?:   string;
  rut?:        string;
  dvrut?:      string;
  rol?:        string;
}

export interface VentaCliente {
  usuario:  GoogleUser;
  mesa?:     number;
  orden?:    Pedido[];
  estado?:   string;
  idAtencion?: number;
  socialUser?: SocialUser;
}

export interface Pedido {
  id?:             number;
  cantidad?:       number;
  precioUnitario?: number;
  total?:          number;
}

export interface SocialUser {
  data_cliente?: DataCliente;
  token?:        string;
}

export interface DataCliente {
  userId:     string;
  id_cliente: string;
  nombre:     string;
  apellido:   string;
  email:      string;
  exp:        number;
  perfil:     Perfil[];
  perfiles:   Perfil[];
  profile:    string;
}




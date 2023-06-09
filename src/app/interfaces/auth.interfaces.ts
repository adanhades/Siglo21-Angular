
export interface LoginResponse {
  ok:      boolean;
  status:  string;
  message: string;
  data?:    Usuario;
}
export interface ApiResponse {
  ok:      boolean;
  status:  string;
  message: string;
  data?:    Usuario;
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
}

export interface Perfil {
  id:     string;
  nombre: string;
}

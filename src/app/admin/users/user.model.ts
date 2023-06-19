export class User {
  id: number = 0;
  username: string = '';
  password: string = '';  
  profile!: UserProfile;
  work!: UserWork;
  contacts!: UserContacts;
  social!: UserSocial;
  settings!: UserSettings;
}
export class Usuario {
activo:"";
apellidos:"";
dvrut:"";
email:"";
id:"";
id_perfil:"";
logintoken:"";
nombres:"";
password:"";
perfil_usuario:"";
run:"";
rut:"";
telefono:"";
username:"";
usuario_activo_texto:"";
}

export class UserProfile {  
  name: string = '';
  surname: string = '';  
  birthday!: Object;
  gender: string = '';
  image: string = '';
}

export class UserWork {
  company: string = '';
  position: string = '';
  salary: number = 0;
}

export class UserContacts{
  email: string = '';
  phone: string = '';
  address: string = '';  
}

export class UserSocial {
  facebook: string = '';
  twitter: string = '';
  google: string = '';
}

export class UserSettings{
  isActive: boolean = false;
  isDeleted: boolean = false;
  registrationDate!: Date;
  joinedDate!: Date;
}
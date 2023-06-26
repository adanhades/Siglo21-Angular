import { GoogleUser, Pedido, SocialUser } from "../interfaces/auth.interfaces";

export class VentaCliente {
    usuario: GoogleUser;
    mesa: number;
    tieneMesa: boolean;
    orden: MenuS21[];
    socialUser: SocialUser

    constructor() {
        this.usuario = {};
        this.mesa = 0;
        this.tieneMesa = false;
        this.orden = [];
        this.socialUser = {};
    }

}

export class MenuS21 {

    constructor(
                public id?: string,
                public nombre?: string,
                public descripcion?: string,
                public precio?: string,
                public activo?: string,
                public categoria?: string,
                public imagen?: MenuItemImageS21,
                public link_image_auxiliar?: string,
                public total_productos?: string,
                public productos_con_stock?: string,
                public disponibilidad?: string,
                public cartCount?: number,
                public availibilityCount?: number,
                public discount?: number,
                public categoryId?: number
                ){}
}
export class MenuItemImageS21 {
    constructor(public small: string,
                public medium: string,
                public big: string){ }
}
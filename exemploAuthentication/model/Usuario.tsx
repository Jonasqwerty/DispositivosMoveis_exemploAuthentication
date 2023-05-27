export class Usuario {
    public id : string;
    public email : string;
    public nome : string;
    public senha : string;
    
    constructor(obj?: Partial<Usuario>) {
        if (obj) {
            this.id = obj.id
            this.email = obj.email
            this.nome = obj.nome
            this.senha = obj.senha
         }
    }

    toFirestore() {
        const usuario =  {
                    id : this.id,
                    email : this.email,
                    nome : this.nome,
                    senha : this.senha,
         }
         return usuario
    }

   
    toString() {
        const Objeto = `{
            "id": "${this.id}",
            "email": "${this.email}",
            "nome": "${this.nome}",
            "senha": "${this.senha}"
        }`
        return Objeto
    }
};
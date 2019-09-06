export class Estado {
  id: number;
  nome: string;
  sigla: string;
}

export class Cidade {
  id: number;
  nome: string;
  estado = new Estado();
}

export class Endereco {
  id: number;
  tipo: 'Comercial';
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade = new Cidade();
  cliente = new Cliente();
}

export class Contato {
  id: number;
  tipo = 'Comercial';
  email: string;
  fixo: string;
  celular: string;
  cliente = new Cliente();

}

export class Status {
  id: number;
  nome: string;
  numero: number;
  descricao: string;
}

export class TipoUsuario {
  id: number;
  nome: string;
  descricao: string;
  status = new Status();
}

export class Usuario {
  id: number;
  nome: string;
  // telefone: string;
  // senha: string;
  // email: string;
  // tipo = new TipoUsuario();
  // status = new Status();
}


export class Cliente {
  id: number;
  nome: string;
  observacao: string;
  cpf: string;
  nomeComercio: string;
  usuario = new Usuario();
  status = new Status();
  enderecos: Endereco[] = [];
  contatos: Contato[] = [];
}




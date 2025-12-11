export interface Company {
    id_empresa: 1,
    cnpj: string,
    nome: string,
    endereco: string,
    telefone: string,
    numero_vagas: number,
    valor_hora: number,
    _count: {
        vagas: number
    }
}
type Props = {
    novoNome: string
    setNovoNome: (v: string) => void
    novoPreco: string
    setNovoPreco: (v: string) => void
    novaQuantidade: number
    setNovaQuantidade: (v: number) => void
    idEditando: number | null
    onSalvar: () => void
    onCancelar: () => void
}

export default function ProdutoForm({
                                        novoNome, setNovoNome,
                                        novoPreco, setNovoPreco,
                                        novaQuantidade, setNovaQuantidade,
                                        idEditando,
                                        onSalvar, onCancelar
                                    }: Props) {
    return (
        <section className="bg-gray-800 p-6 rounded-xl mb-8 border border-gray-700 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-400 text-left">
                {idEditando !== null ? 'Editar Produto' : 'Cadastrar Novo Item'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Nome"
                    value={novoNome}
                    className="bg-gray-700 border border-gray-600 p-2 rounded outline-none"
                    onChange={(e) => setNovoNome(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Preço"
                    value={novoPreco}
                    className="bg-gray-700 border border-gray-600 p-2 rounded outline-none"
                    onChange={(e) => setNovoPreco(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Qtd"
                    value={novaQuantidade}
                    className="bg-gray-700 border border-gray-600 p-2 rounded outline-none"
                    onChange={(e) => setNovaQuantidade(Number(e.target.value))}
                />
                <button
                    onClick={onSalvar}
                    className="bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded transition"
                >
                    {idEditando !== null ? 'Atualizar Produto' : 'Salvar no Estoque'}
                </button>

                {idEditando !== null && (
                    <button
                        onClick={onCancelar}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </section>
    )
}
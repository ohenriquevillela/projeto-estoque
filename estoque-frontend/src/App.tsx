import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
    const [produtos, setProdutos] = useState<any[]>([])
    const [novoNome, setNovoNome] = useState('')
    const [novoPreco, setNovoPreco] = useState(0)
    const [novaQuantidade, setNovaQuantidade] = useState(0)
    const [idEditando, setIdEditando] = useState<number | null>(null);

    const buscarProdutos = () => {
        axios.get('http://localhost:8081/produtos')
            .then(res => setProdutos(res.data))
            .catch(err => console.error(err))
    }

    const prepararEdicao = (p: any) => {
        setIdEditando(p.id);
        setNovoNome(p.nome);
        setNovoPreco(p.preco);
        setNovaQuantidade(p.quantidade);
    };

    useEffect(() => {
        buscarProdutos()
    }, [])

    const handleSalvar = () => {
        const dados = { nome: novoNome, preco: novoPreco, quantidade: novaQuantidade };

        if (idEditando) {
            // Modo Edição: Usa o PUT
            axios.put(`http://localhost:8081/produtos/${idEditando}`, dados)
                .then(() => {
                    alert("Produto atualizado!");
                    limparFormulario();
                    buscarProdutos();
                })
                .catch(err => console.error("Erro ao editar:", err));
        } else {
            // Modo Cadastro: Usa o POST
            axios.post('http://localhost:8081/produtos', dados)
                .then(() => {
                    alert("Salvo!");
                    limparFormulario();
                    buscarProdutos();
                })
                .catch(err => console.error("Erro ao salvar:", err));
        }
    };

    const limparFormulario = () => {
        setIdEditando(null);
        setNovoNome('');
        setNovoPreco(0);
        setNovaQuantidade(0);
    };

    const handleExcluir = (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir este item?")) {
            axios.delete(`http://localhost:8081/produtos/${id}`)
                .then(() => {
                    alert("Item removido!");
                    buscarProdutos(); // Atualiza a lista automaticamente
                })
                .catch(error => {
                    console.error(error);
                    alert("Erro ao excluir. Verifique se o produto relmente existe.");
                });
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
            <h1 className="text-3xl font-bold mb-8 border-b-2 border-blue-500 pb-2">Estoque 📦</h1>

            <section className="bg-gray-800 p-6 rounded-xl mb-8 border border-gray-700 shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-blue-400 text-left">Cadastrar Novo Item</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input type="text" placeholder="Nome" className="bg-gray-700 border border-gray-600 p-2 rounded outline-none" onChange={(e) => setNovoNome(e.target.value)} />
                    <input type="number" placeholder="Preço" className="bg-gray-700 border border-gray-600 p-2 rounded outline-none" onChange={(e) => setNovoPreco(Number(e.target.value))} />
                    <input type="number" placeholder="Qtd" className="bg-gray-700 border border-gray-600 p-2 rounded outline-none" onChange={(e) => setNovaQuantidade(Number(e.target.value))} />
                    <button onClick={handleSalvar} className="bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded transition">{idEditando ? 'Atualizar Produto' : 'Salvar no Estoque'}</button>
                    {/* BOTÃO DE CANCELAR (CONDICIONAL) */}
                    {idEditando && (
                        <button
                            onClick={limparFormulario}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition ml-2"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </section>


            <main className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
                <table className="w-full text-left">
                    <thead className="bg-gray-700 text-gray-300 uppercase text-xs">
                    <tr>
                        <th className="px-6 py-4">Produto</th>
                        <th className="px-6 py-4">Preço</th>
                        <th className="px-6 py-4 text-right">Quantidade</th>
                        <th className="px-6 py-4 text-center">Ações</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                    {produtos.map((p: any) => (
                        <tr key={p.id} className="hover:bg-gray-750">
                            <td className="px-6 py-4">{p.nome}</td>
                            <td className="px-6 py-4">R$ {p.preco.toFixed(2)}</td>
                            <td className="px-6 py-4 text-right">{p.quantidade}</td>
                            <td className="px-6 py-4 text-center space-x-2">
                                <button
                                    onClick={() => prepararEdicao(p)}
                                    className="text-blue-400 hover:text-blue-300 font-bold"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleExcluir(p.id)}
                                    className="text-red-500 hover:text-red-400 font-bold"
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </main>
        </div>
    )
}

export default App
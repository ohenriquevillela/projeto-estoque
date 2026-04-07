import { useEffect, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios'

type Produto = {
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
};

function App() {
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [novoNome, setNovoNome] = useState('')
    const [novoPreco, setNovoPreco] = useState('')
    const [novaQuantidade, setNovaQuantidade] = useState<number>(0)
    const [idEditando, setIdEditando] = useState<number | null>(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [produtoParaExcluir, setProdutoParaExcluir] = useState<number | null>(null);

    const buscarProdutos = () => {
        axios.get('http://localhost:8081/produtos')
            .then(res => setProdutos(res.data))
            .catch(err => console.error(err))
    }

    const prepararEdicao = (p: Produto) => {
        setIdEditando(p.id);
        setNovoNome(p.nome);
        setNovoPreco(String(p.preco));
        setNovaQuantidade(p.quantidade);
    };

    useEffect(() => {
        buscarProdutos()
    }, [])

    const handleSalvar = () => {
        if (!novoNome || Number(novoPreco) <= 0 || novaQuantidade < 0) {
            toast.error("Preencha os dados corretamente!");
            return;
        }

        const dados = {
            nome: novoNome,
            preco: Number(novoPreco),
            quantidade: novaQuantidade
        };

        if (idEditando !== null) {
            axios.put(`http://localhost:8081/produtos/${idEditando}`, dados)
                .then(() => {
                    toast.success("Produto atualizado!");
                    limparFormulario();
                    buscarProdutos();
                })
                .catch(err => console.error("Erro ao editar:", err));
        } else {
            axios.post('http://localhost:8081/produtos', dados)
                .then(() => {
                    toast.success("Produto salvo!");
                    limparFormulario();
                    buscarProdutos();
                })
                .catch(err => console.error("Erro ao salvar:", err));
        }
    };

    const limparFormulario = () => {
        setIdEditando(null);
        setNovoNome('');
        setNovoPreco('');
        setNovaQuantidade(0);
    };

    const confirmarExclusao = () => {
        if (produtoParaExcluir === null) return;

        axios.delete(`http://localhost:8081/produtos/${produtoParaExcluir}`)
            .then(() => {
                toast.success("Item removido!");
                buscarProdutos();
            })
            .catch(() => {
                toast.error("Erro ao excluir.");
            });

        setModalAberto(false);
        setProdutoParaExcluir(null);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
            <Toaster position="top-right" />

            <h1 className="text-3xl font-bold mb-8 border-b-2 border-blue-500 pb-2">
                Estoque 📦
            </h1>

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
                        onClick={handleSalvar}
                        className="bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded transition"
                    >
                        {idEditando !== null ? 'Atualizar Produto' : 'Salvar no Estoque'}
                    </button>

                    {idEditando !== null && (
                        <button
                            onClick={limparFormulario}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
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
                    {produtos.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-750">
                            <td className="px-6 py-4">{p.nome}</td>
                            <td className="px-6 py-4">
                                R$ {Number(p.preco).toFixed(2)}
                            </td>
                            <td className="px-6 py-4 text-right">
                                {p.quantidade}
                            </td>
                            <td className="px-6 py-4 text-center space-x-2">
                                <button
                                    onClick={() => prepararEdicao(p)}
                                    className="text-blue-400 hover:text-blue-300 font-bold"
                                >
                                    <Pencil size={16} />
                                </button>

                                <button
                                    onClick={() => {
                                        setProdutoParaExcluir(p.id);
                                        setModalAberto(true);
                                    }}
                                    className="text-red-500 hover:text-red-400 font-bold"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </main>

            {modalAberto && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 w-96">

                        <h2 className="text-lg font-bold mb-4 text-red-400">
                            Confirmar exclusão
                        </h2>

                        <p className="text-gray-300 mb-6">
                            Tem certeza que deseja excluir este item?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setModalAberto(false)}
                                className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={confirmarExclusao}
                                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-bold"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default App
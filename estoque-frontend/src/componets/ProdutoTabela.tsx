import { Pencil, Trash2 } from 'lucide-react'
import type {Produto} from '../hooks/useProdutos'

type Props = {
    produtos: Produto[]
    onEditar: (p: Produto) => void
    onExcluir: (id: number) => void
}

export default function ProdutoTabela({ produtos, onEditar, onExcluir }: Props) {
    return (
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
                        <td className="px-6 py-4">R$ {Number(p.preco).toFixed(2)}</td>
                        <td className="px-6 py-4 text-right">{p.quantidade}</td>
                        <td className="px-6 py-4 text-center space-x-2">
                            <button onClick={() => onEditar(p)} className="text-blue-400 hover:text-blue-300">
                                <Pencil size={16} />
                            </button>
                            <button onClick={() => onExcluir(p.id)} className="text-red-500 hover:text-red-400">
                                <Trash2 size={16} />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </main>
    )
}
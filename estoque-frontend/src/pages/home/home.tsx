import { Toaster } from 'react-hot-toast'
import { useProdutos } from '../../hooks/useProdutos'
import ProdutoForm from '../../componets/ProdutoForm'
import ProdutoTabela from '../../componets/ProdutoTabela'
import ModalConfirmacao from '../../componets/ModalConfirmacao'

export default function Home() {
    const {
        produtos,
        novoNome, setNovoNome,
        novoPreco, setNovoPreco,
        novaQuantidade, setNovaQuantidade,
        idEditando,
        modalAberto, setModalAberto,
        setProdutoParaExcluir,
        prepararEdicao,
        limparFormulario,
        handleSalvar,
        confirmarExclusao,
    } = useProdutos()

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
            <Toaster position="top-right" />

            <h1 className="text-3xl font-bold mb-8 border-b-2 border-blue-500 pb-2">
                Estoque 📦
            </h1>

            <ProdutoForm
                novoNome={novoNome}
                setNovoNome={setNovoNome}
                novoPreco={novoPreco}
                setNovoPreco={setNovoPreco}
                novaQuantidade={novaQuantidade}
                setNovaQuantidade={setNovaQuantidade}
                idEditando={idEditando}
                onSalvar={handleSalvar}
                onCancelar={limparFormulario}
            />

            <ProdutoTabela
                produtos={produtos}
                onEditar={prepararEdicao}
                onExcluir={(id) => {
                    setProdutoParaExcluir(id)
                    setModalAberto(true)
                }}
            />

            <ModalConfirmacao
                aberto={modalAberto}
                onConfirmar={confirmarExclusao}
                onCancelar={() => setModalAberto(false)}
            />
        </div>
    )
}
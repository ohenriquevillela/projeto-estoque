import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export type Produto = {
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
}

const API = 'https://campusmap.ufpr.br/dev-test/lamir-lims/produtos'

export function useProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [novoNome, setNovoNome] = useState('')
    const [novoPreco, setNovoPreco] = useState('')
    const [novaQuantidade, setNovaQuantidade] = useState<number>(0)
    const [idEditando, setIdEditando] = useState<number | null>(null)
    const [modalAberto, setModalAberto] = useState(false)
    const [produtoParaExcluir, setProdutoParaExcluir] = useState<number | null>(null)

    const buscarProdutos = () => {
        axios.get(`${API}/produtos`)
            .then(res => setProdutos(res.data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        buscarProdutos()
    }, [])

    const prepararEdicao = (p: Produto) => {
        setIdEditando(p.id)
        setNovoNome(p.nome)
        setNovoPreco(String(p.preco))
        setNovaQuantidade(p.quantidade)
    }

    const limparFormulario = () => {
        setIdEditando(null)
        setNovoNome('')
        setNovoPreco('')
        setNovaQuantidade(0)
    }

    const handleSalvar = () => {
        if (!novoNome || Number(novoPreco) <= 0 || novaQuantidade < 0) {
            toast.error('Preencha os dados corretamente!')
            return
        }

        const dados = {
            nome: novoNome,
            preco: Number(novoPreco),
            quantidade: novaQuantidade
        }

        if (idEditando !== null) {
            axios.put(`${API}/produtos/${idEditando}`, dados)
                .then(() => { toast.success('Produto atualizado!'); limparFormulario(); buscarProdutos() })
                .catch(err => console.error('Erro ao editar:', err))
        } else {
            axios.post(`${API}/produtos`, dados)
                .then(() => { toast.success('Produto salvo!'); limparFormulario(); buscarProdutos() })
                .catch(err => console.error('Erro ao salvar:', err))
        }
    }

    const confirmarExclusao = () => {
        if (produtoParaExcluir === null) return

        axios.delete(`${API}/produtos/${produtoParaExcluir}`)
            .then(() => { toast.success('Item removido!'); buscarProdutos() })
            .catch(() => toast.error('Erro ao excluir.'))

        setModalAberto(false)
        setProdutoParaExcluir(null)
    }

    return {
        produtos,
        novoNome, setNovoNome,
        novoPreco, setNovoPreco,
        novaQuantidade, setNovaQuantidade,
        idEditando,
        modalAberto, setModalAberto,
        produtoParaExcluir, setProdutoParaExcluir,
        prepararEdicao,
        limparFormulario,
        handleSalvar,
        confirmarExclusao,
    }
}
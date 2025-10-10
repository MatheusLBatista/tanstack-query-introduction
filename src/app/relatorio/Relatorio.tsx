"use client"

import { useQueryState } from "nuqs"

export async function Relatorio() {

  const [nome, setNome] = useQueryState('nome')
  const [data, setData] = useQueryState('data')
  const [pagina, setPagina] = useQueryState('pagina')
  
  return(
    <div>
      Relatório
      <div>Nome: {nome}</div>
      <div>Data: {data}</div>
      <div>Qual é a página: {pagina}</div>

      <div>
        <input type="number" value={pagina} onChange={e => setPagina((e.target.value))} />
      </div>
    </div>
  )
}
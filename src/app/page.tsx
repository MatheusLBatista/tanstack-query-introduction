"use client";

import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { fetchData } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import Posts from "@/types/Posts";
import ErrorMessage from "@/components/errorMessage";

export default function Home() {

  const {
    data:      postsData,
    isLoading: postsIsLoading,
    isError:   postsIsError,
    error:     postsError,
    refetch:   postsRefetch  
  } = useQuery({ queryKey: ["listaPostsPaginaInicial"],
    queryFn: async () => {

      if(process.env.NEXT_PUBLIC_SIMULAR_ERRO === 'true') {
        throw new Error("Erro simulado ao carregar dados");
      }

      if(process.env.NEXT_PUBLIC_SIMULAR_LOADING === 'true') {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }

      return fetchData<Posts[]>("/posts", "GET");
    }
  })

  return (
    <div>
      <h1>Listagem de produtos</h1>
      {postsIsLoading && (<div className="bg-red-600 text-5xl p-2">Carregando...</div>)}
      {!postsIsLoading && !postsError && postsData?.length > 0 ? (
        <>
          <div>Posts encontrados: {postsData?.length}</div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Título</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {postsData?.map(p => (
                  <TableRow key={p.id}>
                    <TableCell>{p.id}</TableCell>
                    <TableCell>{p.title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </>
      ) : (
        <ErrorMessage tipo="warning">Nenhum post encontrado!</ErrorMessage>
      )}

      {postsIsError && (
        <ErrorMessage tipo="error">
          Aconteceu algum erro!
        </ErrorMessage>
      )}
    </div>
  );
}

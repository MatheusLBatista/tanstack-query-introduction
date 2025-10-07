"use client";

import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { fetchData } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import Posts from "@/types/Posts";
import ErrorMessage from "@/components/errorMessage";

interface PostProps {
  params: {
    id: string;
  };
}

export default function PostByIdPage({ params }: PostProps) {
  const { id } = params;

  const {
    data: postsData,
    isLoading: postsIsLoading,
    isError: postsIsError,
  } = useQuery({
    queryKey: ["listaPostsPorId", id],
    queryFn: async () => {
      if (process.env.NEXT_PUBLIC_SIMULAR_ERRO === "true") {
        throw new Error("Erro simulado ao carregar dados");
      }

      if (process.env.NEXT_PUBLIC_SIMULAR_LOADING === "true") {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      return await fetchData<Posts>(`/posts/${id}`, "GET");
    },
  });

  return (
    <div>
      <h1>Listagem do post</h1>

      {postsIsLoading && (
        <div className="bg-red-600 text-5xl p-2">Carregando...</div>
      )}

      {!postsIsLoading && postsIsError && (
        <ErrorMessage tipo="error">
          Aconteceu algum erro!
        </ErrorMessage>
      )}

      {!postsIsLoading && !postsIsError && postsData && (
        <>
          <div>Post encontrado:</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow key={postsData.id}>
                <TableCell>{postsData.id}</TableCell>
                <TableCell>{postsData.title}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </>
      )}

      {!postsIsLoading && !postsIsError && !postsData && (
        <ErrorMessage tipo="warning">Nenhum post encontrado!</ErrorMessage>
      )}
    </div>
  );
}

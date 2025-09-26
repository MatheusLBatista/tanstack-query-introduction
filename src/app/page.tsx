"use client";

import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { fetchData } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

interface Posts {
  userId: number,
  id:     number,
  title:  string, 
  body:   string
}

export default function Home() {

  const {
    data:      postsData,
    isLoading: postsIsLoading,
    isError:   postsIsError,
    error:     postsError,
    refetch:   postsRefetch
  } = useQuery({ queryKey: ["listaPostsPaginaInicial"],
    queryFn: async () => fetchData<Posts[]>("/posts", "GET")
  })

  return (
    <div>
      <h1>Listagem de produtos</h1>
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
    </div>
  );
}

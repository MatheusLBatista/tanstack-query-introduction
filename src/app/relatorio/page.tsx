"use client"

import { Suspense } from 'react';
import { Relatorio } from './Relatorio';

export default function RelatorioPage() {
 
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Relatorio />
    </Suspense>
  )
}
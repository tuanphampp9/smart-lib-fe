'use client'

import React from 'react'
import RenderDetailLiquidation from './_components/RenderDetailLiquidation'
import { useRouter } from 'next/navigation'
export interface ILiquidationDetailPageProps {}

export default function LiquidationDetailPage(
  props: ILiquidationDetailPageProps
) {
  const router = useRouter()
  return (
    <React.Suspense>
      <RenderDetailLiquidation />
    </React.Suspense>
  )
}

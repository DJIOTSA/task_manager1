"use client";

import { useRouter } from 'next/navigation'
import React from 'react'

export default function HomePage() {
  const router = useRouter();
  router.push("/tasks")
  return (
    <></>
  )
}

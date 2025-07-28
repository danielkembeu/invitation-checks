"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import error from "../../public/error.svg";

export default function ErrorPage() {
  let [pageLoading, setPageLoading] = useState(false);

  function onRetry() {
    setPageLoading(true);
    window.location.reload();
  }

  return (
    <section className="flex flex-col items-center text-center justify-center py-16 space-y-6">
      <Image
        src={error}
        alt="Error image"
        priority
        className="size-[500px]"
        objectFit="cover"
      />
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Une erreur est survenue</h1>
        <p className="mb-6 text-gray-600">
          Veuillez réessayer de recharger la page.
        </p>
      </div>

      <Button disabled={pageLoading} onClick={onRetry}>
        {pageLoading ? "Chargement en cours..." : "Recharger la page"}
      </Button>
    </section>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Countdown from "react-countdown";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Link from "next/link";
import hero1 from "../../public/hero1.jpg";
import Image from "next/image";

const eventDate = new Date("2025-12-15T18:00:00");

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 px-72">
      {/* Hero */}
      <section className="relative bg-primary/10 py-24 px-6 md:px-20 text-center md:text-left">
        <div className="md:w-1/2 mx-auto md:mx-0">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-primary"
          >
            Conférence Événement 2025
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-4 text-lg text-gray-700"
          >
            Rejoignez les leaders, apprenez et connectez lors de la conférence
            la plus inspirante de l’année.
          </motion.p>

          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            className="mt-6 flex space-x-4 justify-center md:justify-start"
          >
            <Link href="/auth">
              <Button className="bg-primary text-white hover:bg-primary/90">
                S’inscrire maintenant
              </Button>
            </Link>

            {/* <div className="text-gray-600 self-center">
              <Countdown
                date={eventDate}
                renderer={({ days, hours, minutes, seconds }) => (
                  <span>
                    {days}j {hours}h {minutes}m {seconds}s
                  </span>
                )}
              />
            </div> */}
          </motion.div>
        </div>

        <div className="mt-12 md:absolute md:top-0 md:right-0 md:w-1/2 h-96 md:h-full relative">
          <Image
            src={hero1}
            alt="Conférence"
            fill
            className="rounded-xl object-cover shadow-xl"
            priority
          />
        </div>
      </section>

      {/* Speakers */}
      <section className="py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">
          Nos intervenants
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Alice Dupont",
              role: "CEO XYZ",
              img: "https://source.unsplash.com/collection/888146/300x300",
            },
            {
              name: "Jean Martin",
              role: "CTO ABC",
              img: "https://source.unsplash.com/collection/888145/300x300",
            },
            {
              name: "Sophie Ng",
              role: "Designer Senior",
              img: "https://source.unsplash.com/collection/888144/300x300",
            },
          ].map((spk, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="text-center space-y-4"
            >
              <div className="relative rounded-full w-40 h-40 mx-auto overflow-hidden shadow-lg">
                <img src={spk.img} alt={spk.name} className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-primary">{spk.name}</h3>
              <p className="text-gray-600">{spk.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary/5 py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold text-primary mb-8">
          Ce qu’on dit de nous
        </h2>
        <div className="space-y-8 max-w-2xl mx-auto">
          {[
            {
              text: "L’expérience était incroyable – perte de mot!",
              author: "Marie, participante 2024",
            },
            {
              text: "Des speakers inspirants et un vrai networking.",
              author: "Karim, startup",
            },
          ].map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.3 }}
              viewport={{ once: true }}
              className="italic text-lg text-gray-800"
            >
              “{t.text}”<br />
              <strong className="text-primary">— {t.author}</strong>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          Foire aux questions
        </h2>
        <Accordion type="single" collapsible>
          {[
            {
              q: "Comment m’inscrire ?",
              a: "Cliquez sur le bouton d’inscription et remplissez le formulaire.",
            },
            {
              q: "Lieu de l’événement ?",
              a: "Paris, centre des congrès - en ligne aussi disponible.",
            },
          ].map((fa, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b">
              <AccordionTrigger className="text-lg text-primary">
                {fa.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                {fa.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Footer */}
      <footer className="bg-primary/10 py-12 px-6 md:px-20 text-center md:text-left">
        <p className="text-gray-500">
          © {new Date().getFullYear()} MonÉvénement. Tous droits réservés.
        </p>
        <div className="mt-4 space-x-4">
          <a href="/privacy" className="text-gray-500 hover:text-primary">
            Confidentialité
          </a>
          <a href="/terms" className="text-gray-500 hover:text-primary">
            CGU
          </a>
        </div>
      </footer>
    </main>
  );
}

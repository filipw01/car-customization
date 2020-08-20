import Head from "next/head";
import Car from "../components/Car";
import Summary from "../components/Summary";
import { motion } from "framer-motion";
import React from "react";

export default function Home() {
  return (
    <div className="container flex flex-col justify-center min-h-screen px-6 py-16 mx-auto text-white font-body">
      <Head>
        <title>Car customization</title>
      </Head>

      <motion.h1
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: -30, opacity: 0 }}
        className="mb-4 text-5xl leading-none lg:text-6xl font-display"
      >
        Car customization
      </motion.h1>
      <motion.p
        className="max-w-xs mb-16 text-xl"
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        initial={{ y: -30, opacity: 0 }}
      >
        Choose your car preferences and we'll summarize them for you
      </motion.p>
      <Car />
      <Summary className="mt-8 lg:mt-0" />
    </div>
  );
}

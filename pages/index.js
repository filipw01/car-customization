import Head from "next/head";
import Car from "../components/Car";

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-16 text-white min-h-screen flex flex-col justify-center">
      <Head>
        <title>Car customization</title>
      </Head>
      <h1 className="text-6xl">Car customization</h1>
      <p className="text-xl max-w-xs mb-16">
        Choose your car preferences and we'll summarize them for you
      </p>
      <Car />
    </div>
  );
}

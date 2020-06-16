import Head from "next/head";
import Car from "../components/Car";
import Summary from "../components/Summary";

export default function Home() {
  return (
    <div className="container flex flex-col justify-center min-h-screen px-6 py-16 mx-auto text-white font-body">
      <Head>
        <title>Car customization</title>
      </Head>
      <h1 className="text-6xl font-display">Car customization</h1>
      <p className="max-w-xs mb-16 text-xl">
        Choose your car preferences and we'll summarize them for you
      </p>
      <Car />
      <Summary />
    </div>
  );
}

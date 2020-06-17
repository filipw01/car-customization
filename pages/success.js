import Head from "next/head";
import { motion } from "framer-motion";
import CarImage from "../components/CarImage";
import { connect } from "react-redux";
import Link from "next/link";

const Success = ({ model, color }) => {
  return (
    <div className="container flex flex-col justify-center min-h-screen px-6 py-16 mx-auto text-white font-body">
      <Head>
        <title>Ordered successfully</title>
      </Head>

      <motion.h1
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: -30, opacity: 0 }}
        className="text-6xl text-center font-display"
      >
        Ordered successfully
      </motion.h1>
      <motion.p
        className="max-w-xs mx-auto mb-8 text-xl text-center"
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        initial={{ y: -30, opacity: 0 }}
      >
        Yay, you've just purchased your awesome car
      </motion.p>
      <motion.div
        className="w-full max-w-sm mx-auto"
        transition={{ delay: 0.2 }}
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: -30, opacity: 0 }}
      >
        <CarImage model={model} color={color} />
      </motion.div>
      <motion.div
        className="flex justify-center mt-12"
        transition={{ delay: 0.3 }}
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: -30, opacity: 0 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 1 }}
      >
        <Link href="/">
          <a className="px-12 py-3 mx-auto bg-black border border-white rounded ">
            Edit your order
          </a>
        </Link>
      </motion.div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    model: state.car.activeParts.find((part) => part.type === "model")?.name,
    color: state.car.activeParts.find((part) => part.type === "color")
      ?.hexValue,
  };
};
export default connect(mapStateToProps, null)(Success);

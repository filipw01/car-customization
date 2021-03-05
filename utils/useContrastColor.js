import { contrast } from "chroma-js";
import { useEffect, useState } from "react";

const useContrastColor = (color) => {
  const [contrastColor, setContrastColor] = useState("black");
  useEffect(() => {

    if (color) {
      if (
        contrast("#fff", color) + 1 >
        contrast("#000", color)
      ) {
        setContrastColor("white");
      } else {
        setContrastColor("black");
      }
    }
  }, [color]);

  return contrastColor;
};

export default useContrastColor;

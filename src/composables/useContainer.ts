import { useElementBounding } from "@vueuse/core";
import { useOffset } from "./useOffset";

const container = document.createElement("div");
const test = document.createElement("div");
test.style.width = "100%";

container.appendChild(test);

container.classList.add("container");
container.style.zIndex = "-99";
console.log(container);
document.body.appendChild(container);

export const useContainer = () => {
  const bounding = useElementBounding(test);
  const offset = useOffset(test);

  return {
    container,
    offset,
    bounding,
  };
};

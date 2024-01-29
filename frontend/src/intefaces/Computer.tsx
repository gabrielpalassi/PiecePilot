import Product from "./Product";
import Cpu from "./Cpu";
import Ram from "./Ram";
import Hdd from "./Hdd";
import Motherboard from "./Motherboard";

interface Computer extends Product {
    cpu: Cpu;
    motherBoard: Motherboard;
    rams: Ram[];
    hdds: Hdd[];
}

export default Computer;
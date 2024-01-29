import Cpu from "./Cpu";
import Motherboard from "./Motherboard";
import Ram from "./Ram";
import Hdd from "./Hdd";

interface ProductsResponse {
    cpu: Cpu[];
    rams: Ram[];
    motherBoards: Motherboard[];
    hdds: Hdd[];
}

export default ProductsResponse;

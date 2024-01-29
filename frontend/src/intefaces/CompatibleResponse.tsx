import Cpu from "./Cpu";
import Motherboard from "./Motherboard";
import Ram from "./Ram";
import Hdd from "./Hdd";

interface CompatibleResponse {
    cpu: Cpu[];
    ram: Ram[];
    motherBoard: Motherboard[];
    hdd: Hdd[];
}

export default CompatibleResponse;

import ComputerComponent from "./ComputerComponent";

interface Motherboard extends ComputerComponent {
    ramType: string;
    ramSlots: number;
    hddConnection: string[]
    socket: string;
}

export default Motherboard;
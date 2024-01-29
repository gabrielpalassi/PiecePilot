import Computer from "./Computer";
import ComputerComponent from "./ComputerComponent";

interface HighlightsResponse {
    highlights: ComputerComponent[] | Computer[];
}

export default HighlightsResponse;

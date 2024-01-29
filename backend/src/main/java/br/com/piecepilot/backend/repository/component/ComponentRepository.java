package br.com.piecepilot.backend.repository.component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.piecepilot.backend.entity.component.ComputerComponent;
import br.com.piecepilot.backend.entity.component.Cpu;
import br.com.piecepilot.backend.entity.component.Hdd;
import br.com.piecepilot.backend.entity.component.MotherBoard;
import br.com.piecepilot.backend.entity.component.Ram;
import br.com.piecepilot.backend.entity.component.compatibility.HddConnection;
import br.com.piecepilot.backend.entity.component.compatibility.RamType;
import br.com.piecepilot.backend.entity.component.compatibility.Socket;

@Repository
public class ComponentRepository {
    private CpuRepository cpuRepository;
    private RamRepository ramRepository;
    private HddRepository hddRepository;
    private MotherBoardRepository motherBoardRepository;

    public ComponentRepository(
        CpuRepository cpuRepository,
        RamRepository ramRepository,
        HddRepository hddRepository,
        MotherBoardRepository motherBoardRepository
    ) {
        this.cpuRepository = cpuRepository;
        this.hddRepository = hddRepository;
        this.motherBoardRepository = motherBoardRepository;
        this.ramRepository = ramRepository;
    }

    public HashMap<String, List<? extends ComputerComponent>> getComponents(){
        HashMap<String, List<? extends ComputerComponent>> computerComponents = new HashMap<>();
        computerComponents.put("cpu", getCpus(null));
        computerComponents.put("rams", getRams(null));
        computerComponents.put("hdds", getHdds(null));
        computerComponents.put("motherBoards", getMotherBoards(null, null, null, 0));
        return computerComponents;
    }

    public List<Cpu> getCpus(Socket socket) {
        List<Cpu> cpus = cpuRepository.findAll(); 
        if (socket == null) {
            return cpus; 
        }
        List<Cpu> returnedCpus = new ArrayList<>();
        for (int i = 0; i < cpus.size(); i++) {
            if (cpus.get(i).getSocket() == socket) {
                returnedCpus.add(cpus.get(i));
            }
        }
        return returnedCpus;
    }

    public List<Ram> getRams(RamType ramType) {
        List<Ram> rams = ramRepository.findAll();
        if (ramType == null) {
            return rams;
        }
        List<Ram> returnedRams = new ArrayList<>();
        for (int i = 0; i < rams.size(); i++) {
            if (rams.get(i).getRamType() == ramType) {
                returnedRams.add(rams.get(i));
            }
        }
        return returnedRams;
    }

    public List<Ram> getRamsByMaximumSticksAndRamType(int maximumSticks, RamType ramType) {
        List<Ram> rams = ramRepository.findAll();
        List<Ram> returnedRams = new ArrayList<>();
        if (ramType == null) {
            if (maximumSticks == 0) {
                return rams;
            } else {
                for (int i = 0; i < rams.size(); i++) {
                    if (rams.get(i).getSticksNumber() <= maximumSticks) {
                        returnedRams.add(rams.get(i));
                    }
                }
                return returnedRams;
            }
        } else {
            for (int i = 0; i < rams.size(); i++) {
                if (rams.get(i).getRamType() == ramType) {
                    if (maximumSticks == 0 || rams.get(i).getSticksNumber() <= maximumSticks) {
                        returnedRams.add(rams.get(i));
                    }
                }
            }
            return returnedRams;
        }
    }

    public List<Hdd> getHdds(HddConnection hddConnection) {
        List<Hdd> hdds = hddRepository.findAll();
        if (hddConnection == null) {
            return hdds;
        }
        List<Hdd> returnedHdds = new ArrayList<>();
        for (int i = 0; i < hdds.size(); i++) {
            if (hdds.get(i).getHddConnection() == hddConnection) {
                returnedHdds.add(hdds.get(i));
            }
        }
        return returnedHdds;
    }

    public List<MotherBoard> getMotherBoards(Socket socket, List<HddConnection> hddConnections, RamType ramType, int ramSlots) {
        List<MotherBoard> motherBoards = motherBoardRepository.findAll();
        if (socket == null) {
            if (ramType == null) {
                if (hddConnections == null) {
                    List<MotherBoard> returnedMotherBoard = new ArrayList<>();
                    for (int i = 0; i < motherBoards.size(); i++) {
                        if (motherBoards.get(i).getRamSlots() >= ramSlots) {
                            returnedMotherBoard.add(motherBoards.get(i));
                        }
                    }
                    return returnedMotherBoard;
                } else {
                    List<MotherBoard> returnedMotherBoard = new ArrayList<>();
                    for (int i = 0; i < motherBoards.size(); i++) {
                        if (motherBoards.get(i).getRamSlots() >= ramSlots && motherBoards.get(i).getHddConnection().containsAll(hddConnections)) {
                            returnedMotherBoard.add(motherBoards.get(i));
                        }
                    }
                    return returnedMotherBoard;
                }
            } else {
                if (hddConnections == null) {
                    List<MotherBoard> returnedMotherBoard = new ArrayList<>();
                    for (int i = 0; i < motherBoards.size(); i++) {
                        if (motherBoards.get(i).getRamSlots() >= ramSlots && motherBoards.get(i).getRamType() == ramType) {
                            returnedMotherBoard.add(motherBoards.get(i));
                        }
                    }
                    return returnedMotherBoard;
                } else {
                    List<MotherBoard> returnedMotherBoard = new ArrayList<>();
                    for (int i = 0; i < motherBoards.size(); i++) {
                        if (motherBoards.get(i).getRamSlots() >= ramSlots && motherBoards.get(i).getHddConnection().containsAll(hddConnections) && motherBoards.get(i).getRamType() == ramType) {
                            returnedMotherBoard.add(motherBoards.get(i));
                        }
                    }
                    return returnedMotherBoard;
                }
            }
        } else {
            if (ramType == null) {
                if (hddConnections == null) {
                    List<MotherBoard> returnedMotherBoard = new ArrayList<>();
                    for (int i = 0; i < motherBoards.size(); i++) {
                        if (motherBoards.get(i).getRamSlots() >= ramSlots && motherBoards.get(i).getSocket() == socket) {
                            returnedMotherBoard.add(motherBoards.get(i));
                        }
                    }
                    return returnedMotherBoard;
                } else {
                    List<MotherBoard> returnedMotherBoard = new ArrayList<>();
                    for (int i = 0; i < motherBoards.size(); i++) {
                        if (motherBoards.get(i).getRamSlots() >= ramSlots && motherBoards.get(i).getHddConnection().containsAll(hddConnections) && motherBoards.get(i).getSocket() == socket) {
                            returnedMotherBoard.add(motherBoards.get(i));
                        }
                    }
                    return returnedMotherBoard;
                }
            } else {
                if (hddConnections == null) {
                    List<MotherBoard> returnedMotherBoard = new ArrayList<>();
                    for (int i = 0; i < motherBoards.size(); i++) {
                        if (motherBoards.get(i).getRamSlots() >= ramSlots && motherBoards.get(i).getRamType() == ramType && motherBoards.get(i).getSocket() == socket) {
                            returnedMotherBoard.add(motherBoards.get(i));
                        }
                    }
                    return returnedMotherBoard;
                } else {
                    List<MotherBoard> returnedMotherBoard = new ArrayList<>();
                    for (int i = 0; i < motherBoards.size(); i++) {
                        if (motherBoards.get(i).getRamSlots() >= ramSlots && motherBoards.get(i).getHddConnection().containsAll(hddConnections) && motherBoards.get(i).getRamType() == ramType && motherBoards.get(i).getSocket() == socket) {
                            returnedMotherBoard.add(motherBoards.get(i));
                        }
                    }
                    return returnedMotherBoard;
                }
            }
        }
    }

}

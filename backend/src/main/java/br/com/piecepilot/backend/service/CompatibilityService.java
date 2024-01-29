package br.com.piecepilot.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import br.com.piecepilot.backend.entity.Computer;
import br.com.piecepilot.backend.entity.component.Cpu;
import br.com.piecepilot.backend.entity.component.Hdd;
import br.com.piecepilot.backend.entity.component.MotherBoard;
import br.com.piecepilot.backend.entity.component.Ram;
import br.com.piecepilot.backend.entity.component.compatibility.HddConnection;
import br.com.piecepilot.backend.entity.component.compatibility.RamType;
import br.com.piecepilot.backend.entity.component.compatibility.Socket;
import br.com.piecepilot.backend.repository.component.ComponentRepository;

@Service
public class CompatibilityService {

    private ComponentRepository componentsRepository;

    public CompatibilityService(ComponentRepository componentsRepository) {
        this.componentsRepository = componentsRepository;
    }

    public List<Cpu> GetCompatibleCpus(Computer computer) {
        if (computer.getCpu() == null) {
            if (computer.getMotherBoard() == null) {
                return componentsRepository.getCpus(null);
            } else {
                return componentsRepository.getCpus(computer.getMotherBoard().getSocket());
            }
        } else {
            return null;
        }
    }

    public List<Hdd> GetCompatibleHdds(Computer computer) {
        if (computer.getMotherBoard() == null) {
            return componentsRepository.getHdds(null);
        } else {
            List<HddConnection> hddConnections = computer.getMotherBoard().getHddConnection();
            List<Hdd> hdds = new ArrayList<>();
            for (int i = 0; i < hddConnections.size(); i++) {
                hdds.addAll(componentsRepository.getHdds(hddConnections.get(i)));
            }
            return hdds;
        }
    }

    public List<Ram> GetCompatibleRams(Computer computer) {
        if (computer.getMotherBoard() == null) {
            return componentsRepository.getRams(null);
        } else {
            if (computer.getRams() != null) {
                List<Ram> rams = computer.getRams();
                int totalSticks = 0;
                for (int i = 0; i < rams.size(); i++) {
                    totalSticks += rams.get(i).getSticksNumber();
                }
                if (totalSticks < computer.getMotherBoard().getRamSlots()) {
                    return componentsRepository.getRamsByMaximumSticksAndRamType(
                            computer.getMotherBoard().getRamSlots() - totalSticks,
                            computer.getMotherBoard().getRamType());
                } else {
                    return null;
                }
            } else {
                return componentsRepository.getRams(computer.getMotherBoard().getRamType());
            }
        }
    }

    public List<MotherBoard> GetCompatibleMotherBoards(Computer computer) {
        if (computer.getMotherBoard() != null) {
            return null;
        } else {
            Socket socket = null;
            List<HddConnection> hddConnections = null;
            RamType ramType = null;
            int ramSlots = 0;
            if (computer.getCpu() != null) {
                socket = computer.getCpu().getSocket();
            }
            if (computer.getHdds() != null) {
                hddConnections = new ArrayList<>();
                List<Hdd> hdds = computer.getHdds();
                for (int i = 0; i < hdds.size(); i++) {
                    hddConnections.add(hdds.get(i).getHddConnection());
                }
            }
            if (computer.getRams() != null) {
                List<Ram> rams = computer.getRams();
                ramType = rams.get(0).getRamType();
                ramSlots = 0;
                for (int i = 0; i < rams.size(); i++) {
                    ramSlots += rams.get(i).getSticksNumber();
                }
            }
            return componentsRepository.getMotherBoards(socket, hddConnections, ramType, ramSlots);
        }
    }
}

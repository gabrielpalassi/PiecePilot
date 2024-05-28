package br.com.piecepilot.backend.config;
// import java.util.ArrayList;
// import java.util.Arrays;
// import java.util.List;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// import br.com.piecepilot.backend.entity.Client;
// import br.com.piecepilot.backend.entity.Computer;
// import br.com.piecepilot.backend.entity.Item;
// import br.com.piecepilot.backend.entity.Order;
// import br.com.piecepilot.backend.entity.Seller;
// import br.com.piecepilot.backend.entity.component.Cpu;
// import br.com.piecepilot.backend.entity.component.Hdd;
// import br.com.piecepilot.backend.entity.component.MotherBoard;
// import br.com.piecepilot.backend.entity.component.Ram;
// import br.com.piecepilot.backend.entity.component.compatibility.HddConnection;
// import br.com.piecepilot.backend.entity.component.compatibility.RamType;
// import br.com.piecepilot.backend.entity.component.compatibility.Socket;
import br.com.piecepilot.backend.repository.ClientRepository;
import br.com.piecepilot.backend.repository.ComputerRepository;
import br.com.piecepilot.backend.repository.ItemRepository;
import br.com.piecepilot.backend.repository.OrderRepository;
import br.com.piecepilot.backend.repository.SellerRepository;
import br.com.piecepilot.backend.repository.component.CpuRepository;
import br.com.piecepilot.backend.repository.component.HddRepository;
import br.com.piecepilot.backend.repository.component.MotherBoardRepository;
import br.com.piecepilot.backend.repository.component.RamRepository;

@Configuration
public class DataLoader {

    @Bean
    public ApplicationRunner loadInitialData(
        ClientRepository clientRepository,
        SellerRepository sellerRepository,
        CpuRepository cpuRepository,
        RamRepository ramRepository,
        MotherBoardRepository motherBoardRepository,
        HddRepository hddRepository,
        ComputerRepository computerRepository,
        ItemRepository itemRepository,
        OrderRepository orderRepository
    ) {
        // Uncomment if you want load initial data
        return args -> {
            // // first clients
            // List<Client> clients = new ArrayList<>();
            // clients.add(new Client("Levy", "512.114.357-97"));
            // clients.add(new Client("Jorge", "222.114.357-91"));
            // for (int i = 0; i < clients.size(); i++) {
            //     clientRepository.save(clients.get(i));
            // }

            // // first sellers
            // List<Seller> sellers = new ArrayList<>();
            // sellers.add(new Seller("Tarcisio", "112.994.351-90"));
            // sellers.add(new Seller("Reginaldo", "777.714.357-91"));
            // for (int i = 0; i < sellers.size(); i++) {
            //     sellerRepository.save(sellers.get(i));
            // }

            // // first cpus
            // List<Cpu> cpus = new ArrayList<>();
            // cpus.add(new Cpu("Intel Core i9-11900K", 549.99, "https://images.kabum.com.br/produtos/fotos/113000/processador-intel-core-i9-10900k-cache-20mb-3-7ghz-5-3ghz-max-turbo-lga-1200-bx8070110900k_1637699992_original.jpg", "Powerful CPU for high-performance computing. Ideal for gaming and demanding tasks.", Socket.LGA1200));
            // cpus.add(new Cpu("AMD Ryzen 7 5800X", 449.99, "https://m.media-amazon.com/images/I/61IIbwz-+ML._AC_UF894,1000_QL80_.jpg", "A high-end CPU from AMD with excellent multi-core performance. Great for content creation and gaming.", Socket.AM4));
            // cpus.add(new Cpu("Intel Core i7-10700K", 349.99, "https://img.terabyteshop.com.br/produto/g/processador-intel-core-i7-10700k-380ghz-470ghz-turbo-10-geracao-8-cores-16-threads-lga-1200-bx8070110700k_130194.jpg", "Fast and efficient CPU for gaming and multitasking. Offers overclocking capabilities.", Socket.LGA1200));
            // cpus.add(new Cpu("AMD Ryzen 5 5600X", 269.99, "https://img.terabyteshop.com.br/produto/g/processador-amd-ryzen-5-5600x-37ghz-46ghz-turbo-6-cores-12-threads-cooler-wraith-stealth-am4_108382.jpg", "Mid-range CPU with a good balance of performance. Suitable for gaming and productivity tasks.", Socket.AM4));
            // for (int i = 0; i < cpus.size(); i++) {
            //     cpuRepository.save(cpus.get(i));
            // }

            // // first rams
            // List<Ram> rams = new ArrayList<>();
            // rams.add(new Ram("Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3200", 89.99, "https://images8.kabum.com.br/produtos/fotos/108438/memoria-corsair-vengeance-lpx-16gb-2x8gb-3200mhz-ddr4-cl16-preto-cmk16gx4m2b3200c16_1575299219_g.jpg", "High-performance RAM for gaming and multitasking. Features low-profile design and reliable Corsair quality.", RamType.DDR4, 2));
            // rams.add(new Ram("G.Skill Ripjaws V Series 32GB (2 x 16GB) DDR4-3600", 159.99, "https://m.media-amazon.com/images/I/614uJf8wccL._AC_UF1000,1000_QL80_.jpg", "Large capacity RAM for content creation and professional applications. Offers fast data transfer rates.", RamType.DDR4, 2));
            // rams.add(new Ram("Crucial Ballistix RGB 16GB (2 x 8GB) DDR4-3200", 99.99, "https://img.terabyteshop.com.br/produto/g/kit-dual-channel-16gb-2x8gb-memoria-ddr4-crucial-ballistix-8gb-3200mhz-rgb-black_108591.png", "RGB illuminated RAM for a stylish gaming setup. Reliable performance for gaming and everyday tasks.", RamType.DDR4, 2));
            // rams.add(new Ram("Kingston HyperX Fury 8GB DDR4-2666", 49.99, "https://images-americanas.b2w.io/produtos/5199448021/imagens/memoria-8gb-kingston-ddr4-2666mhz-cl16-hyperx-fury/5199448047_1_large.jpg", "Budget-friendly RAM for entry-level systems. Provides stable performance for basic computing needs.", RamType.DDR4, 1));
            // for (int i = 0; i < rams.size(); i++) {
            //     ramRepository.save(rams.get(i));
            // }

            // // first mother boards
            // List<MotherBoard> motherBoards = new ArrayList<>();
            // List<HddConnection> hddConnections1 = Arrays.asList(HddConnection.PCIe4, HddConnection.SATAIII);
            // motherBoards.add(new MotherBoard("ASUS ROG Strix Z590-E Gaming", 349.99, "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/oficinadosbits/media/uploads/produtos/foto/fnylmdth/file.png", "An advanced motherboard designed for gaming enthusiasts. Supports the latest Intel processors and features RGB lighting for a stylish look.", Socket.LGA1200, hddConnections1, RamType.DDR4, 4));
            // List<HddConnection> hddConnections2 = Arrays.asList(HddConnection.PCIe4, HddConnection.SATAIII);
            // motherBoards.add(new MotherBoard("MSI MPG B550 Gaming Edge WiFi", 189.99, "https://m.media-amazon.com/images/I/91+9A+caZ6L._AC_UF894,1000_QL80_.jpg", "A reliable motherboard with built-in WiFi and robust power delivery. Compatible with AMD Ryzen processors.", Socket.AM4, hddConnections2, RamType.DDR4, 4));
            // List<HddConnection> hddConnections3 = Arrays.asList(HddConnection.PCIe4, HddConnection.SATAIII);
            // motherBoards.add(new MotherBoard("Gigabyte Aorus X570 Elite", 279.99, "https://images.kabum.com.br/produtos/fotos/102416/placa-mae-aorus-x570-aorus-elite-amd-am4-atx-ddr4_placa-mae-aorus-x570-aorus-elite-amd-am4-atx-ddr4_1562261566_g.jpg", "A high-performance motherboard with PCIe 4.0 support and advanced thermal design. Ideal for gaming and content creation.", Socket.AM4, hddConnections3, RamType.DDR4, 4));
            // List<HddConnection> hddConnections4 = Arrays.asList(HddConnection.PCIe3, HddConnection.SATAIII);
            // motherBoards.add(new MotherBoard("ASRock B450M Steel Legend", 99.99, "https://www.asrock.com/mb/photo/B450M%20Steel%20Legend(M1).png", "A budget-friendly motherboard with solid performance. Supports AMD Ryzen processors and has a stylish steel legend design.", Socket.AM4, hddConnections4, RamType.DDR4, 4));
            // for (int i = 0; i < motherBoards.size(); i++) {
            //     motherBoardRepository.save(motherBoards.get(i));
            // }

            // // first hdds
            // List<Hdd> hdds = new ArrayList<>();
            // hdds.add(new Hdd("Samsung 970 EVO Plus 1TB NVMe M.2 Internal SSD", 149.99, "https://image-us.samsung.com/SamsungUS/home/computing/memory-and-monitors/9-27-21/mz-v7s1t0b-am-gallery/MZ-V7S1T0BW_004.jpg?$product-details-jpg$", "High-speed NVMe SSD for faster data access and improved system performance. Ideal for gaming and content creation.", HddConnection.NVMe));
            // hdds.add(new Hdd("Seagate Barracuda 2TB 7200 RPM SATA III 3.5\" Internal HDD", 79.99, "https://m.media-amazon.com/images/I/614AgguDz9L.jpg", "Large-capacity HDD for storage-intensive applications. Suitable for storing games, videos, and other data.", HddConnection.SATAIII));
            // hdds.add(new Hdd("Western Digital Blue 500GB SATA III 2.5\" Internal SSD", 69.99, "https://m.media-amazon.com/images/I/81KAp6qpEuL.jpg", "Reliable SATA SSD for faster boot times and application loading. Suitable for mainstream computing tasks.", HddConnection.SATAIII));
            // hdds.add(new Hdd("Crucial P1 500GB NVMe M.2 Internal SSD", 79.99, "https://images.kabum.com.br/produtos/fotos/100366/100366_1550523860_index_g.jpg", "Affordable NVMe SSD with high-speed data transfer. Enhances system responsiveness for a smoother user experience.", HddConnection.NVMe));
            // for (int i = 0; i < hdds.size(); i++) {
            //     hddRepository.save(hdds.get(i));
            // }
            // // -----------------computer components order---------------
            // // first items
            // List<Item> items = new ArrayList<>();
            // items.add(new Item(2, cpus.get(0)));
            // items.add(new Item(1, rams.get(0)));
            // items.add(new Item(3, motherBoards.get(0)));
            // items.add(new Item(1, hdds.get(0)));
            
            // //  first order
            // Order order = new Order(sellers.get(0), clients.get(0));
            // orderRepository.save(order);
            // // saveing items and setting order to items
            // for (int i = 0; i < items.size(); i++) {
            //     items.get(i).setOrder(order);
            //     itemRepository.save(items.get(i));
            // }
            // // setting items to order and updating order
            // order.setItems(items);
            // orderRepository.save(order);

            // // -----------------computer order---------------
            // List<Ram> chosenRams = new ArrayList<>();
            // chosenRams.add(rams.get(0));
            // List<Hdd> chosenHdds = new ArrayList<>();
            // chosenHdds.add(hdds.get(1));
            // Computer computer = new Computer("", 1069.96, "", "", cpus.get(0), chosenRams, motherBoards.get(0), chosenHdds);
            // computerRepository.save(computer);
            // Item computerItem = new Item(1, computer);
            // Order computerOrder = new Order(sellers.get(0), clients.get(1));
            // orderRepository.save(computerOrder);
            // computerItem.setOrder(computerOrder);
            // itemRepository.save(computerItem);
            // List<Item> computerItems = new ArrayList<>();
            // computerItems.add(computerItem);
            // computerOrder.setItems(computerItems);
            // orderRepository.save(computerOrder);

            // // // -----------------computer highlights---------------
            //     List<Computer> computersHighlight = new ArrayList<>();
            //     Computer hightLight1 = new Computer(
            //             "highlight1",
            //             "Performance Beast PC",
            //             1500.00,
            //             "https://img.terabyteshop.com.br/produto/g/pc-gamer-t-gamer-thorn-amd-ryzen-5-4500-nvidia-geforce-rtx-3060-8gb-ddr4-ssd-240gb_177152.jpg",
            //             "",
            //             cpus.get(0),
            //             List.of(rams.get(0), rams.get(0)),
            //             motherBoards.get(0),
            //             List.of(hdds.get(0), hdds.get(0))
            //     );
            //     computersHighlight.add(hightLight1);
            //     Computer hightLight2 = new Computer(
            //             "highlight2",
            //             "Gaming Pro PC",
            //             1800.00,
            //             "https://m.media-amazon.com/images/I/71YA4qtn2JL._AC_SY355_.jpg",
            //             "",
            //             cpus.get(1),
            //             List.of(rams.get(1), rams.get(1)),
            //             motherBoards.get(1),
            //             List.of(hdds.get(1), hdds.get(1))
            //     );
            //     computersHighlight.add(hightLight2);
            //     Computer hightLight3 = new Computer(
            //             "highlight3",
            //             "Content Creator Workstation",
            //             2200.00,
            //             "https://image.made-in-china.com/2f0j00vQSkOEGaqDqT/Segotep-Gank-360-RGB-Full-Tower-Eatx-White-Desktop-Gaming-Computer-PC-Case.webp",
            //             "",
            //             cpus.get(2),
            //             List.of(rams.get(2), rams.get(2)),
            //             motherBoards.get(2),
            //             List.of(hdds.get(2), hdds.get(2))
            //     );
            //     computersHighlight.add(hightLight3);
            //     for (int i = 0; i < computersHighlight.size(); i++) {
            //         computerRepository.save(computersHighlight.get(i));
            //     }
        };
    }
}

/** Figma asset path; raster files are served as WebP after `npm run optimize:images`. */
export const figmaImage = (name: string) => {
  if (/\.svg$/i.test(name)) {
    return `/images/figma/${name}`;
  }
  const normalized = name.replace(/\.(png|jpe?g)$/i, "");
  return `/images/figma/${normalized}.webp`;
};

/** Raster under /public (e.g. /images/get-started.png → .webp). SVG paths are unchanged. */
export const publicImage = (imagePath: string) =>
  /\.svg$/i.test(imagePath) ? imagePath : imagePath.replace(/\.(png|jpe?g)$/i, ".webp");

export const deviceCards = [
  {
    title: "SmartPOS A90 Pro",
    image: figmaImage("device-a90.png"),
    hoverImage: figmaImage("device-hover-a90.png"),
    hoverDescription:
      "Trợ thủ bán hàng di động, giúp chốt đơn nhanh chóng mọi lúc mọi nơi.",
  },
  {
    title: "POS để bàn C20 Pro",
    image: figmaImage("device-c20.png"),
    hoverImage: figmaImage("device-hover-c20.png"),
    hoverDescription:
      "Sang trọng và chuyên nghiệp. Trái tim của mọi quầy bán hàng hiện đại.",
  },
  {
    title: "Kiosk tự phục vụ Z2",
    image: figmaImage("device-kiosk.png"),
    hoverImage: figmaImage("device-hover-kiosk.png"),
    hoverDescription:
      "Trải nghiệm hiện đại, giúp khách hàng chủ động trong mọi giao dịch.",
  },
  {
    title: "Thiết bị e-KYC GRG S005",
    image: figmaImage("device-ekyc.png"),
    hoverImage: figmaImage("device-hover-base.png"),
    hoverDescription:
      "Xác thực hộ chiếu và CCCD trong vài giây tích tắc. Nâng tầm trải nghiệm dịch vụ đẳng cấp.",
  },
  {
    title: "Loa QR thông minh Q161 Pro",
    image: figmaImage("device-q161.png"),
    hoverImage: figmaImage("device-hover-base.png"),
    hoverDescription:
      "Nhận thanh toán thẻ & QR đa năng trên cùng một thiết bị. Giải pháp tối ưu chi phí cho mọi điểm bán.",
  },
  {
    title: "Soundbox QR động Q191 Pro",
    image: figmaImage("device-q191.png"),
    hoverImage: figmaImage("device-hover-base.png"),
    hoverDescription: "Hiển thị sắc nét. Âm báo to, phát âm rõ ràng. An tâm giao dịch.",
  },
];

export const solutionItems = [
  {
    title: "Chấp nhận mọi hình thức thanh toán",
    description:
      "Bán hàng tại quầy hay trực tuyến dễ dàng với nền tảng POS linh hoạt. Đa dạng phương thức: thẻ, mã QR, tới cổng online E-commerce.",
  },
  {
    title: "Mở rộng tệp khách hàng",
    description:
      "Kết nối ưu đãi, ví điện tử và kênh bán trực tuyến để khách hàng quay lại thường xuyên hơn.",
  },
  {
    title: "Quản lý kho hàng chặt chẽ",
    description:
      "Theo dõi tồn kho, đơn hàng và vận hành cửa hàng trong một luồng dữ liệu thống nhất.",
  },
];

export const solutionVisuals = [
  {
    title: "Chấp nhận mọi hình thức thanh toán",
    image: figmaImage("ecosystem-blur.png"),
  },
  {
    title: "Mở rộng tệp khách hàng",
    image: figmaImage("ecosystem-base.png"),
  },
  {
    title: "Quản lý kho hàng chặt chẽ",
    image: figmaImage("ecosystem-overlay.png"),
  },
];

export const industryCards = [
  {
    title: "Khách sạn & Lưu trú",
    sign: "Hotel",
    image: figmaImage("industry-hotel.png"),
    description:
      "Theo trọn hành trình lưu trú. Xử lý mượt mà từ check-in định danh, e-menu QR đến thanh toán tại quầy, trực tuyến hay ghi nợ phòng.",
  },
  {
    title: "Phòng khám & Y tế",
    sign: "Healthcare",
    image: figmaImage("industry-health.png"),
    description:
      "Tối ưu tiếp nhận, định danh, thu phí và đối soát cho phòng khám, nhà thuốc và cơ sở chăm sóc sức khỏe.",
  },
  {
    title: "Dịch vụ Ẩm thực",
    sign: "F&B",
    image: figmaImage("industry-fnb.png"),
    description:
      "Từ gọi món, in bếp, thanh toán tại bàn đến quản lý ca bán - mọi thao tác gọn trong một quy trình.",
  },
  {
    title: "Bán lẻ",
    sign: "Retail",
    image: figmaImage("industry-retail.png"),
    description:
      "Quản lý cửa hàng, SKU, tồn kho, hóa đơn và thanh toán đa kênh cho mô hình bán lẻ hiện đại.",
  },
  {
    title: "Dịch vụ & Spa",
    sign: "Services",
    image: figmaImage("industry-spa.png"),
    description:
      "Dễ dàng nhận lịch, quản lý gói dịch vụ, chăm sóc khách hàng và thanh toán sau mỗi liệu trình.",
  },
];

export const cardLogos = [
  figmaImage("logo-visa.svg"),
  figmaImage("logo-mastercard.svg"),
  figmaImage("logo-jcb.png"),
  figmaImage("logo-napas.png"),
];

export const bankLogos = [
  {
    name: "BVBank",
    image: figmaImage("bank-bvbank-correct.png"),
    chipWidth: 76,
    width: 52,
    height: 18,
  },
  {
    name: "Vietcombank",
    image: figmaImage("bank-vietcombank-correct.png"),
    chipWidth: 89,
    width: 71,
    height: 24,
  },
  {
    name: "BIDV",
    image: figmaImage("bank-bidv-correct.png"),
    chipWidth: 78,
    width: 62,
    height: 20,
  },
  {
    name: "VietinBank",
    image: figmaImage("bank-vietinbank-correct.png"),
    chipWidth: 90,
    width: 74,
    height: 20,
  },
  {
    name: "VietBank",
    image: figmaImage("bank-vietbank-correct.png"),
    chipWidth: 85,
    width: 61,
    height: 28,
  },
  {
    name: "MBBank",
    image: figmaImage("bank-mb-correct.png"),
    chipWidth: 80,
    width: 60,
    height: 25,
  },
  {
    name: "VIB",
    image: figmaImage("bank-vib-correct.png"),
    chipWidth: 63,
    width: 47,
    height: 20,
  },
  {
    name: "ACB",
    image: figmaImage("bank-acb-correct.png"),
    chipWidth: 90,
    width: 43,
    height: 24,
  },
  {
    name: "Nam A Bank",
    image: figmaImage("bank-nam-a-correct.svg"),
    chipWidth: 90,
    width: 74,
    height: 15,
  },
  {
    name: "HDBank",
    image: figmaImage("bank-hdbank-correct.png"),
    chipWidth: 89,
    width: 73,
    height: 20,
  },
  {
    name: "OCB",
    image: figmaImage("bank-ocb-correct.png"),
    chipWidth: 80,
    width: 56,
    height: 20,
  },
  {
    name: "VPBank",
    image: figmaImage("bank-vpbank-correct.svg"),
    chipWidth: 98,
    width: 84,
    height: 19,
  },
];

export const walletLogos = [
  { name: "MoMo", image: figmaImage("wallet-momo.png") },
  { name: "VNPAY", image: figmaImage("wallet-vnpay.png") },
  { name: "ZaloPay", image: figmaImage("wallet-zalopay.png") },
  { name: "ShopeePay", image: figmaImage("wallet-shopeepay.png") },
  { name: "Viettel Money", image: figmaImage("wallet-viettelpay.png") },
];

export const paymentVisuals = [
  {
    title: "Tổ chức thẻ",
    image: figmaImage("payment-card-correct.jpg"),
    fit: "cover",
  },
  {
    title: "Ngân hàng",
    image: figmaImage("payment-bank-correct.jpg"),
    fit: "cover",
  },
  {
    title: "Ví điện tử",
    image: figmaImage("payment-wallet-correct.jpg"),
    fit: "cover",
  },
] as const;

export const trustCards = [
  {
    title: "Hạ tầng chuẩn ngân hàng",
    description:
      "UniPay vận hành trên hạ tầng đám mây - giúp việc vận hành, quản lý, đối soát và thanh toán, sẵn sàng cho mọi quy mô.",
    image: figmaImage("trust-cloud.png"),
  },
  {
    title: "Chuẩn bảo mật quốc tế",
    description:
      "PCI-DSS Level 1, ISO 27001, ISO 22301. An toàn dữ liệu và giao dịch ở cấp độ ngân hàng.",
    image: figmaImage("trust-pci.png"),
    badges: [figmaImage("trust-iso1.png"), figmaImage("trust-iso2.png")],
  },
  {
    title: "Đối tác đồng hành",
    description: "Vietravel Airlines và nhiều doanh nghiệp đã tin chọn UniPay.",
    image: figmaImage("trust-partner.png"),
  },
];

export const pricingPlans = [
  {
    name: "Gói quầy gọn",
    description: "Shop nhỏ, ki-ốt, thời trang 1 quầy",
    features: [
      ["Thiết bị:", "Q161 Pro (2.5tr)"],
      ["Tặng HĐ điện tử", "3.000"],
      ["Thanh toán:", "QR + thẻ chạm/chip (EMVCo)"],
      ["Tùy chỉnh theo nhu cầu riêng:", "Không có"],
    ],
  },
  {
    name: "Gói Cửa hàng linh hoạt",
    description: "Thời trang / mỹ phẩm cần nhận thẻ, di chuyển trong shop",
    features: [
      ["Thiết bị:", "A90 Pro (9tr) Mini Kiosk P56 (liên hệ)"],
      ["Tặng HĐ điện tử", "10.000"],
      ["Thanh toán:", "QR + thẻ + ví NFC + in biên lai"],
      ["Tùy chỉnh theo nhu cầu riêng:", "Giới hạn (liên hệ UniPay)"],
    ],
  },
  {
    name: "Gói Quầy chuyên nghiệp",
    description: "Siêu thị mini, cửa hàng tiện lợi, nhiều SKU",
    features: [
      ["Thiết bị:", "C20 Pro (35tr), A90 Pro (9tr), Smart Stand Kiosk (Liên hệ)"],
      ["Tặng HĐ điện tử", "20.000"],
      ["Thanh toán:", "QR + in tại quầy + thẻ qua A90 + phần mềm đầy đủ"],
      ["Tùy chỉnh theo nhu cầu riêng:", "Được phép tùy chỉnh (liên hệ UniPay)"],
    ],
  },
];

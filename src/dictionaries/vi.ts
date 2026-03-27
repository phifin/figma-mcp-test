import type { Dictionary } from "@/i18n/types";

const vi = {
  locale: "vi",
  metadata: {
    title: "Unipay",
    description:
      "Giải pháp thanh toán và vận hành doanh nghiệp trên một nền tảng thống nhất.",
  },
  hero: {
    eyebrow: "• Point of Sale & Operations •",
    heroWords: ["Bán hàng", "Thanh toán"],
    titleSuffix: "thông minh hơn với Unipay",
    description:
      "UniPay tích hợp AI trực tiếp vào bán hàng, thanh toán và vận hành - giúp doanh nghiệp Việt vận hành hiệu quả hơn mỗi ngày trên một nền tảng duy nhất.",
    primaryCta: "Bắt đầu với UniPay",
    secondaryCta: "Liên hệ tư vấn",
    nav: [
      { label: "Giải pháp Unipay" },
      { label: "Giải pháp theo ngành" },
      { label: "Thiết bị" },
      { label: "Về chúng tôi" },
    ],
    login: "Đăng nhập",
    startNow: "Bắt đầu ngay",
    switchLocaleLabel: "Chuyển ngôn ngữ",
  },
  feature: {
    eyebrow: "Point of Sale & Operations",
    title: "Mọi thứ bạn cần để vận hành - kết nối trong một nền tảng.",
    description:
      "Quản lý bán hàng, thanh toán, khách hàng và báo cáo - tất cả trong một giao diện thống nhất, tối giản, dễ dàng.",
    learnMore: "Tìm hiểu thêm",
    items: [
      {
        title: "Nhận thanh toán",
        description:
          "Bán hàng tại quầy hoặc trực tuyến với nền tảng POS linh hoạt, hỗ trợ mọi phương thức thanh toán như ví, thẻ, QR, và chuyển khoản với bảo mật tuyệt đối.",
      },
      {
        title: "Kho vận thông minh",
        description:
          "Theo dõi tồn kho, xử lý đơn hàng và phân công nhân viên theo thời gian thực.",
      },
      {
        title: "Bán hàng đa kênh",
        description:
          "Đồng bộ đơn hàng từ website, sàn thương mại điện tử và POS tại quầy - bán hàng mọi nơi, quản lý một nơi.",
      },
      {
        title: "Theo dõi hiệu suất kinh doanh",
        description:
          "Báo cáo doanh thu, chi phí và hiệu suất nhân viên giúp bạn đưa ra quyết định nhanh hơn.",
      },
      {
        title: "Kết nối ứng dụng mở rộng",
        description:
          "Tích hợp với các công cụ kế toán, marketing, CRM và đơn vị vận chuyển - mở rộng khả năng vận hành mà không làm gián đoạn quy trình hiện tại.",
      },
    ],
  },
  intelligence: {
    eyebrow: "UniPay Intelligence",
    title: "Kinh doanh dựa trên dữ liệu",
    description:
      "Từ dữ liệu bán hàng đến tồn kho, hóa đơn và vận hành đa điểm bán, AI tích hợp sâu giúp doanh nghiệp đưa ra quyết định chính xác hơn mỗi ngày.",
    imageAlt: "Dữ liệu kinh doanh",
    items: [
      {
        title: "Smart Analytics / Business Intelligence",
        description:
          "Biến dữ liệu vận hành thành insight, cảnh báo và gợi ý hành động theo thời gian thực.",
      },
      {
        title: "Dự báo nhu cầu & tồn kho",
        description:
          "Chủ động dự báo để lên kế hoạch nhập hàng, giảm tồn đọng và tránh thiếu hàng trong giờ cao điểm.",
      },
      {
        title: "Thuế, hóa đơn & tuân thủ",
        description:
          "Tự động hóa quy trình xuất hóa đơn và chuẩn hóa vận hành theo quy định hiện hành.",
      },
      {
        title: "Trợ lý AI tiếng Việt",
        description:
          "Đặt câu hỏi bằng tiếng Việt để nhận báo cáo nhanh, khuyến nghị vận hành và chỉ số quan trọng.",
      },
    ],
  },
  productShowcase: {
    title: "Thiết kế bền bỉ - Chế tác tinh tế",
    description:
      "Phần cứng tối giản, vật liệu cao cấp được thiết kế cho sự chính xác trong mọi thao tác.",
    viewDetails: "Xem chi tiết",
    previousLabel: "Sản phẩm trước",
    nextLabel: "Sản phẩm tiếp theo",
    slides: [
      {
        title: "POS cầm tay",
        description:
          "Nhỏ gọn, linh hoạt, di động tuyệt đối - nhận đơn và thanh toán ngay tại bàn.",
      },
      {
        title: "POS hai màn hình All-in-One",
        description:
          "Thiết kế quầy thanh toán hiện đại với màn hình kép độ phân giải cao, tích hợp gọn trong một thiết bị.",
      },
      {
        title: "Kiosk tự phục vụ",
        description:
          "Giúp khách tự đặt hàng và thanh toán, giảm tải cho quầy khi đông khách.",
      },
      {
        title: "QR Display - Soundbox Aisino Q190",
        description:
          "QR rõ ràng, âm báo lớn giúp người bán xác nhận tiền vào ngay để an tâm bán hàng.",
      },
      {
        title: "Màn hình bếp",
        description:
          "Số hóa vận hành bếp, giúp xử lý món nhanh hơn và giảm sai sót trong quá trình phục vụ.",
      },
    ],
  },
  industries: {
    eyebrow: "Built for every industry",
    title: "Một nền tảng phù hợp với nhiều ngành nghề",
    items: [
      {
        title: "Bán lẻ",
        description:
          "Quản lý bán hàng, tồn kho, loyalty và chăm sóc khách hàng trên cùng một nền tảng.",
      },
      {
        title: "F&B",
        description:
          "Từ gọi món, thanh toán đến vận hành bếp - phục vụ nhanh hơn trong giờ cao điểm.",
      },
      {
        title: "Giáo dục & Đào tạo",
        description:
          "Quản lý lớp học, học viên và thu học phí thông minh hơn để nhà trường nhẹ gánh vận hành.",
      },
      {
        title: "Khách sạn & Lưu trú",
        description:
          "Đặt phòng, check-in, thanh toán online đến PMS trên một quy trình vận hành liền mạch.",
      },
    ],
  },
  steps: {
    title: "Chọn cách bắt đầu phù hợp với doanh nghiệp của bạn",
    description:
      "Từ cửa hàng nhỏ đến chuỗi nhiều điểm bán, UniPay giúp bạn bắt đầu nhanh, triển khai đơn giản và mở rộng theo nhu cầu thực tế.",
    previousLabel: "Bước trước",
    nextLabel: "Bước tiếp theo",
    items: [
      {
        number: "1.",
        title: "Chọn mô hình phù hợp",
        description:
          "Lựa chọn giải pháp phần mềm và thiết bị tối ưu cho quy mô và ngành hàng.",
      },
      {
        number: "2.",
        title: "Thiết lập hệ thống",
        description:
          "Kết nối phần mềm, thiết bị và phương thức thanh toán cho điểm bán của bạn.",
      },
      {
        number: "3.",
        title: "Bắt đầu vận hành",
        description:
          "Đưa cửa hàng vào hoạt động với bán hàng, quản lý và báo cáo trên cùng một nền tảng.",
      },
    ],
  },
  pricing: {
    eyebrow: "Bảng giá",
    title: "Các gói dành cho doanh nghiệp",
    featuredBadge: "PHỔ BIẾN NHẤT",
    plans: [
      {
        name: "Starter",
        description:
          "Dành cho cửa hàng mới hoặc điểm bán nhỏ cần bắt đầu nhanh với những tính năng bán hàng cốt lõi.",
        price: "0",
        unit: "VND/tháng",
        suffix: "theo từng địa điểm",
        cta: "Bắt đầu với Starter",
      },
      {
        name: "Pro",
        description:
          "Phù hợp cho doanh nghiệp đang mở rộng, cần thêm quản lý tồn kho, loyalty và vận hành đa điểm chạm.",
        price: "1,2tr",
        unit: "VND/tháng",
        suffix: "theo từng địa điểm",
        cta: "Chọn gói Pro",
        featured: true,
      },
      {
        name: "Enterprise",
        description:
          "Dành cho chuỗi, thương hiệu lớn hoặc mô hình cần tích hợp sâu, tùy chỉnh theo ngành và hỗ trợ triển khai riêng.",
        price: "4,8tr",
        unit: "VND/tháng",
        suffix: "theo từng địa điểm",
        cta: "Chọn gói Enterprise",
      },
    ],
  },
  security: {
    title: "An toàn như ngân hàng",
    description:
      "Được chứng nhận PCI DSS và ISO, hạ tầng của UniPay đảm bảo dữ liệu và thanh toán luôn an toàn, minh bạch và sẵn sàng 24/7 trên nền tảng điện toán đám mây.",
  },
  cta: {
    title: "Sẵn sàng với UniPay.",
    primaryCta: "Bắt đầu với UniPay",
    secondaryCta: "Liên hệ tư vấn",
  },
  footer: {
    companyName: "CÔNG TY CỔ PHẦN GIẢI PHÁP THANH TOÁN UNIPAY",
    address:
      "Tầng 2, Tòa nhà Saigon Paragon, Số 03 Nguyễn Lương Bằng, Phường Tân Mỹ, TP Hồ Chí Minh, Việt Nam",
    contact: "contact@unipay.net.vn · 02873096667",
    groups: [
      {
        title: "Giải pháp Unipay",
        links: [
          "Giải pháp thanh toán",
          "Giải pháp quản lý kinh doanh",
          "Giải pháp thiết bị thanh toán",
        ],
      },
      {
        title: "Giải pháp theo ngành",
        links: ["F&B", "Bán lẻ", "Dịch vụ", "Giáo dục"],
      },
      {
        title: "Thiết bị",
        links: [
          "Smart POS cầm tay",
          "Duo Screen POS",
          "Thiết bị hiển thị QR",
          "Soundbox",
        ],
      },
      {
        title: "Công ty",
        links: ["Về chúng tôi", "Liên hệ"],
      },
    ],
    legalLinks: [
      "© Unipay Ltd 2025",
      "Term & Conditions",
      "Privacy Policy",
      "Cookies Policy",
    ],
  },
} satisfies Dictionary;

export default vi;


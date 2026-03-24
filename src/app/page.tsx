"use client";

import { useEffect, useState } from "react";

const heroImage = "https://www.figma.com/api/mcp/asset/b2696088-9314-479e-ba36-5e417b72a5d4";
const featureImages = [
  "https://www.figma.com/api/mcp/asset/39c79bf0-4d90-4ece-844a-7a6af91f86fb",
  "https://www.figma.com/api/mcp/asset/088cf617-128a-45c9-b2ec-9a36c868cbcf",
  "https://www.figma.com/api/mcp/asset/47674450-5034-44c5-bd9b-6b3e6e2c515a",
  "https://www.figma.com/api/mcp/asset/1445202b-176b-4535-93ba-6aba6966490c",
  "https://www.figma.com/api/mcp/asset/1b36f7c4-3312-465d-a3be-7ef917a15339",
];
const dataImage = "https://www.figma.com/api/mcp/asset/dbd3e13d-3d49-43b8-80c1-ede12a36af45";
const productImage = "https://www.figma.com/api/mcp/asset/d1bbc547-5e80-401a-88aa-88f2c95e9f59";
const videoImage = "https://www.figma.com/api/mcp/asset/321ab20b-cd45-49e5-86d9-9efb859e3a19";
const industryImages = [
  "https://www.figma.com/api/mcp/asset/b583a73a-9968-40e9-be9e-69169a668d95",
  "https://www.figma.com/api/mcp/asset/ebfc7cec-1dd1-42d2-abb9-09e4a5f647ea",
  "https://www.figma.com/api/mcp/asset/cbb94336-a9bc-4a88-bc16-90c8350f1364",
  "https://www.figma.com/api/mcp/asset/636fb6f4-f917-426b-908d-003430019485",
];
const stepImages = [
  "https://www.figma.com/api/mcp/asset/906a1163-7fdd-49a0-9dcd-29087bfcd31d",
  "https://www.figma.com/api/mcp/asset/c09d26ec-b23a-428e-aeca-984d0ba4bd3d",
  "https://www.figma.com/api/mcp/asset/ea07f705-7a0f-4fc6-a7fd-a7b8889718a1",
];
const bottomCtaImage = "https://www.figma.com/api/mcp/asset/e0545c49-7cfb-4c41-87e8-73410a99a164";
const trustLogos = [
  { name: "PCI DSS", src: "certs/pci-dss.svg" },
  { name: "ISO 27001", src: "certs/iso-27001.svg" },
  { name: "ISO 22301", src: "certs/iso-22301.svg" },
  { name: "ISO 20000", src: "certs/iso-20000.svg" },
];

const featureList = [
  ["Nhận thanh toán", "Bán hàng tại quầy hoặc trực tuyến với nền tảng POS linh hoạt, hỗ trợ mọi phương thức thanh toán như ví, thẻ, QR, và chuyển khoản với bảo mật tuyệt đối."],
  ["Kho vận thông minh", "Theo dõi tồn kho, xử lý đơn hàng và phân công nhân viên theo thời gian thực."],
  ["Bán hàng đa kênh", "Đồng bộ đơn hàng từ website, sàn thương mại điện tử và POS tại quầy - bán hàng mọi nơi, quản lý một nơi."],
  ["Theo dõi hiệu suất kinh doanh", "Báo cáo doanh thu, chi phí và hiệu suất nhân viên giúp bạn đưa ra quyết định nhanh hơn."],
  ["Kết nối ứng dụng mở rộng", "Tích hợp với các công cụ kế toán, marketing, CRM và đơn vị vận chuyển - mở rộng khả năng vận hành mà không làm gián đoạn quy trình hiện tại."],
];

const accordionItems = [
  ["Smart Analytics / Business Intelligence", "Biến dữ liệu vận hành thành insight, cảnh báo và gợi ý hành động theo thời gian thực."],
  ["Dự báo nhu cầu & tồn kho", "Chủ động dự báo để lên kế hoạch nhập hàng, giảm tồn đọng và tránh thiếu hàng trong giờ cao điểm."],
  ["Thuế, hóa đơn & tuân thủ", "Tự động hóa quy trình xuất hóa đơn và chuẩn hóa vận hành theo quy định hiện hành."],
  ["Trợ lý AI tiếng Việt", "Đặt câu hỏi bằng tiếng Việt để nhận báo cáo nhanh, khuyến nghị vận hành và chỉ số quan trọng."],
];

const productSlides = [
  ["POS cầm tay", "Nhỏ gọn, linh hoạt, di động tuyệt đối - nhận đơn và thanh toán ngay tại bàn."],
  ["POS hai màn hình All-in-One", "Thiết kế quầy thanh toán hiện đại với màn hình kép độ phân giải cao, tích hợp gọn trong một thiết bị."],
  ["Kiosk tự phục vụ", "Giúp khách tự đặt hàng và thanh toán, giảm tải cho quầy khi đông khách."],
  ["QR Display - Soundbox Aisino Q190", "QR rõ ràng, âm báo lớn giúp người bán xác nhận tiền vào ngay để an tâm bán hàng."],
  ["Màn hình bếp", "Số hóa vận hành bếp, giúp xử lý món nhanh hơn và giảm sai sót trong quá trình phục vụ."],
];

const industries = [
  ["Bán lẻ", "Quản lý bán hàng, tồn kho, loyalty và chăm sóc khách hàng trên cùng một nền tảng."],
  ["F&B", "Từ gọi món, thanh toán đến vận hành bếp - phục vụ nhanh hơn trong giờ cao điểm."],
  ["Giáo dục & Đào tạo", "Quản lý lớp học, học viên và thu học phí thông minh hơn để nhà trường nhẹ gánh vận hành."],
  ["Khách sạn & Lưu trú", "Đặt phòng, check-in, thanh toán online đến PMS trên một quy trình vận hành liền mạch."],
];

const steps = [
  ["1.", "Chọn mô hình phù hợp", "Lựa chọn giải pháp phần mềm và thiết bị tối ưu cho quy mô và ngành hàng."],
  ["2.", "Thiết lập hệ thống", "Kết nối phần mềm, thiết bị và phương thức thanh toán cho điểm bán của bạn."],
  ["3.", "Bắt đầu vận hành", "Đưa cửa hàng vào hoạt động với bán hàng, quản lý và báo cáo trên cùng một nền tảng."],
];

const pricing = [
  ["Starter", "Dành cho cửa hàng mới hoặc điểm bán nhỏ cần bắt đầu nhanh với những tính năng bán hàng cốt lõi.", "0", "VND/tháng", "theo từng địa điểm", "Bắt đầu với Starter"],
  ["Pro", "Phù hợp cho doanh nghiệp đang mở rộng, cần thêm quản lý tồn kho, loyalty và vận hành đa điểm chạm.", "1,2tr", "VND/tháng", "theo từng địa điểm", "Chọn gói Pro"],
  ["Enterprise", "Dành cho chuỗi, thương hiệu lớn hoặc mô hình cần tích hợp sâu, tùy chỉnh theo ngành và hỗ trợ triển khai riêng.", "4,8tr", "VND/tháng", "theo từng địa điểm", "Chọn gói Enterprise"],
];

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const [openAccordion, setOpenAccordion] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const [industryIndex, setIndustryIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const prevProduct = () => setProductIndex((p) => (p - 1 + productSlides.length) % productSlides.length);
  const nextProduct = () => setProductIndex((p) => (p + 1) % productSlides.length);
  const prevStep = () => setStepIndex((s) => (s - 1 + steps.length) % steps.length);
  const nextStep = () => setStepIndex((s) => (s + 1) % steps.length);

  return (
    <main className="bg-white text-[#060606]">
      <section className="relative min-h-[92vh] overflow-hidden">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative mx-auto flex min-h-[92vh] w-full max-w-7xl flex-col justify-center px-5 py-24 text-center text-white md:px-8">
          <h1 className="text-5xl leading-[0.95] tracking-tight md:text-7xl">Bán hàng thông minh hơn với Unipay</h1>
          <p className="mx-auto mt-8 max-w-3xl text-base text-white/90 md:text-lg">UniPay tích hợp AI trực tiếp vào bán hàng, thanh toán và vận hành - giúp doanh nghiệp Việt vận hành hiệu quả hơn mỗi ngày trên một nền tảng duy nhất.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button className="rounded-full bg-white px-8 py-3 text-base font-semibold text-[#006aff]">Bắt đầu với UniPay</button>
            <button className="rounded-full bg-[#006aff] px-8 py-3 text-base font-semibold text-white">Liên hệ tư vấn</button>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-24 md:px-8 md:py-32">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Point of Sale & Operations</p>
          <h2 className="mt-3 text-4xl leading-tight tracking-tight md:text-5xl">Mọi thứ bạn cần để vận hành - kết nối trong một nền tảng.</h2>
          <p className="mt-4 text-lg text-zinc-600">Quản lý bán hàng, thanh toán, khách hàng và báo cáo - tất cả trong một giao diện thống nhất, tối giản, dễ dàng.</p>
        </div>
        <div className="space-y-16">
          {featureList.map(([title, desc], idx) => (
            <div key={title} className="grid gap-10 border-t border-zinc-200 pt-10 md:grid-cols-[minmax(0,480px)_minmax(0,1fr)] md:gap-20">
              <img src={featureImages[idx]} alt={title} className="h-72 w-full rounded-lg object-cover md:h-80" />
              <div className="max-w-xl">
                <div className="flex items-start justify-between">
                  <span className="text-3xl font-semibold">{title}</span>
                  <span className="text-xs tracking-[0.2em] text-zinc-500">{String(idx + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-4 text-lg text-zinc-700">{desc}</p>
                <button className="mt-5 text-sm font-semibold underline">Tìm hiểu thêm</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-16 px-5 py-24 md:grid-cols-[minmax(0,1fr)_minmax(0,600px)] md:px-8 md:py-32">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">UniPay Intelligence</p>
          <h2 className="mt-3 text-4xl leading-tight tracking-tight md:text-5xl">Kinh doanh dựa trên dữ liệu</h2>
          <p className="mt-4 text-lg text-zinc-600">Từ dữ liệu bán hàng đến tồn kho, hóa đơn và vận hành đa điểm bán, AI tích hợp sâu giúp doanh nghiệp đưa ra quyết định chính xác hơn mỗi ngày.</p>
          <div className="mt-10 divide-y divide-zinc-200">
            {accordionItems.map(([title, desc], idx) => {
              const open = idx === openAccordion;
              return (
                <div key={title} className="py-5">
                  <button className="flex w-full items-start justify-between gap-4 text-left" onClick={() => setOpenAccordion(open ? -1 : idx)}>
                    <span className="text-2xl font-semibold">{title}</span>
                    <span className="text-2xl">{open ? "−" : "+"}</span>
                  </button>
                  <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}>
                    <p className="overflow-hidden text-base text-zinc-600">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="relative flex items-center justify-center rounded-xl bg-zinc-100 p-3">
          <img src={dataImage} alt="Dữ liệu kinh doanh" className="h-auto w-full rounded-md object-cover" />
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl leading-tight tracking-tight md:text-5xl">Thiết kế bền bỉ - Chế tác tinh tế</h2>
          <p className="mt-4 text-lg text-zinc-600">Phần cứng tối giản, vật liệu cao cấp được thiết kế cho sự chính xác trong mọi thao tác.</p>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-zinc-200 p-4">
          <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${productIndex * 100}%)` }}>
            {productSlides.map(([title, desc]) => (
              <div key={title} className="grid min-w-full gap-8 md:grid-cols-[minmax(0,1fr)_487px] md:gap-12">
                <div className={`rounded-xl bg-zinc-50 p-6 transition-all duration-500 ${productSlides[productIndex][0] === title ? "translate-y-0 opacity-100" : "translate-y-3 opacity-50"}`}>
                  <h3 className="text-3xl font-semibold">{title}</h3>
                  <p className="mt-4 text-zinc-700">{desc}</p>
                  <button className="mt-6 text-sm font-medium underline">Xem chi tiết</button>
                </div>
                <img src={productImage} alt={title} className="h-[390px] w-full rounded-xl object-cover" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 rounded-t-full bg-white shadow">
            <button onClick={prevProduct} className="h-9 w-12 rounded-tl-full text-xl">←</button>
            <button onClick={nextProduct} className="h-9 w-12 rounded-tr-full text-xl">→</button>
          </div>
        </div>
      </section>

      <section className="relative flex h-[720px] items-center justify-center overflow-hidden">
        <img src={videoImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <button className="relative z-10 rounded-full border border-white/40 bg-black/40 p-8 text-4xl text-white">▶</button>
      </section>

      <section className="bg-zinc-50 py-24 md:py-32">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 md:px-8">
          <div className="flex items-end justify-between gap-8">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Built for every industry</p>
              <h2 className="mt-3 text-4xl leading-tight tracking-tight md:text-5xl">Một nền tảng phù hợp với nhiều ngành nghề</h2>
            </div>
            <span className="text-5xl">✱</span>
          </div>
          <div className="flex h-[420px] gap-4">
            {industries.map(([title, desc], idx) => {
              const active = idx === industryIndex;
              return (
                <div key={title} onMouseEnter={() => setIndustryIndex(idx)} className={`relative overflow-hidden rounded-lg transition-all duration-500 ${active ? "flex-4" : "flex-1"}`}>
                  <img src={industryImages[idx]} alt={title} className="absolute inset-0 h-full w-full object-cover" />
                  <div className={`absolute inset-0 bg-linear-to-t from-black/70 to-black/20 transition-opacity duration-300 ${active ? "opacity-100" : "opacity-80"}`} />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className={`font-medium tracking-tight transition-all duration-300 ${active ? "text-5xl" : "text-3xl text-white/70"}`}>{title}</h3>
                    <p className={`mt-3 max-w-xl text-sm text-white/90 transition-all duration-300 ${active ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"}`}>{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-24 md:px-8 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl leading-tight tracking-tight md:text-5xl">Chọn cách bắt đầu phù hợp với doanh nghiệp của bạn</h2>
            <p className="mt-4 text-lg text-zinc-600">Từ cửa hàng nhỏ đến chuỗi nhiều điểm bán, UniPay giúp bạn bắt đầu nhanh, triển khai đơn giản và mở rộng theo nhu cầu thực tế.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={prevStep} className="h-12 w-12 rounded-full border border-zinc-300 text-xl">←</button>
            <button onClick={nextStep} className="h-12 w-12 rounded-full border border-zinc-300 text-xl">→</button>
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${stepIndex * 100}%)` }}>
            {steps.map(([no, title, desc], idx) => (
              <div key={title} className="min-w-full">
                <article className="grid h-[500px] items-end gap-12 rounded-2xl bg-zinc-100 px-8 py-10 md:grid-cols-[minmax(0,1fr)_400px] md:px-20 md:py-16">
                  <div className={`pb-6 transition-all duration-500 ${idx === stepIndex ? "translate-y-0 opacity-100" : "translate-y-2 opacity-70"}`}>
                    <p className="text-7xl font-bold">{no}</p>
                    <h3 className="mt-16 text-4xl font-semibold">{title}</h3>
                    <p className="mt-3 max-w-xl text-zinc-700">{desc}</p>
                  </div>
                  <img src={stepImages[idx]} alt={title} className="h-[376px] w-full rounded-t-3xl object-cover" />
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Bảng giá</p>
          <h2 className="mt-3 text-4xl leading-tight tracking-tight md:text-5xl">Các gói dành cho doanh nghiệp</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {pricing.map(([name, desc, price, unit, suffix, cta], idx) => (
              <article key={name} className={`flex h-[520px] flex-col rounded-3xl border bg-white p-6 ${idx === 1 ? "border-[#006aff] shadow-xl" : "border-zinc-200"}`}>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-4xl font-semibold">{name}</h3>
                    {idx === 1 ? <span className="rounded bg-blue-50 px-2 py-1 text-xs font-semibold text-[#335cff]">PHỔ BIẾN NHẤT</span> : null}
                  </div>
                  <p className="mt-4 text-zinc-600">{desc}</p>
                </div>
                <div className="my-6 border-t border-zinc-200" />
                <div className="flex-1">
                  <p className="text-6xl leading-none tracking-tight">{price} <span className="text-4xl text-zinc-500">{unit}</span></p>
                  <p className="mt-4 text-xl font-semibold">{suffix}</p>
                </div>
                <button className={`h-14 w-full rounded-full text-lg font-medium ${idx === 1 ? "bg-[#006aff] text-white" : "border border-[#0056eb] text-[#0056eb]"}`}>{cta}</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-24 md:py-32">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-16 px-5 md:px-8">
          <div className="text-center text-white">
            <h2 className="text-4xl leading-tight tracking-tight md:text-5xl">An toàn như ngân hàng</h2>
            <p className="mx-auto mt-4 max-w-4xl text-lg text-zinc-300">Được chứng nhận PCI DSS và ISO, hạ tầng của UniPay đảm bảo dữ liệu và thanh toán luôn an toàn, minh bạch và sẵn sàng 24/7 trên nền tảng điện toán đám mây.</p>
          </div>
          <div className="grid w-full gap-8 md:grid-cols-4">
            {trustLogos.map((logo) => (
              <div key={logo.name} className="flex h-64 items-center justify-center rounded-3xl bg-white p-6">
                <img src={`${basePath}/${logo.src}`} alt={logo.name} className="h-20 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-5 pb-24 md:px-8 md:pb-32">
        <div className="mx-auto w-full max-w-7xl rounded-[40px] p-8 text-center text-white md:p-16" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${bottomCtaImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <h2 className="text-5xl md:text-7xl">Sẵn sàng với UniPay.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="rounded-full bg-[#006aff] px-8 py-3 text-lg font-medium text-white">Bắt đầu với UniPay</button>
            <button className="rounded-full bg-white px-8 py-3 text-lg font-medium text-[#060606]">Liên hệ tư vấn</button>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white">
        <div className="mx-auto w-full max-w-7xl px-5 pb-6 pt-10 md:px-8">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
            <div>
              <p className="text-xl font-semibold">CÔNG TY CỔ PHẦN GIẢI PHÁP THANH TOÁN UNIPAY</p>
              <p className="mt-3 text-sm text-white/60">Tầng 2, Tòa nhà Saigon Paragon, Số 03 Nguyễn Lương Bằng, Phường Tân Mỹ, TP Hồ Chí Minh, Việt Nam</p>
              <p className="mt-4 text-sm">contact@unipay.net.vn · 02873096667</p>
            </div>
            <div><p className="text-white/60">Giải pháp Unipay</p><p className="mt-3 text-sm">Giải pháp thanh toán</p><p className="mt-2 text-sm">Giải pháp quản lý kinh doanh</p><p className="mt-2 text-sm">Giải pháp thiết bị thanh toán</p></div>
            <div><p className="text-white/60">Giải pháp theo ngành</p><p className="mt-3 text-sm">F&B</p><p className="mt-2 text-sm">Bán lẻ</p><p className="mt-2 text-sm">Dịch vụ</p><p className="mt-2 text-sm">Giáo dục</p></div>
            <div><p className="text-white/60">Thiết bị</p><p className="mt-3 text-sm">Smart POS cầm tay</p><p className="mt-2 text-sm">Duo Screen POS</p><p className="mt-2 text-sm">Thiết bị hiển thị QR</p><p className="mt-2 text-sm">Soundbox</p></div>
            <div><p className="text-white/60">Công ty</p><p className="mt-3 text-sm">Về chúng tôi</p><p className="mt-2 text-sm">Liên hệ</p></div>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-6 text-sm text-white/80">
            <div className="flex flex-wrap gap-5"><span>© Unipay Ltd 2025</span><span>Term & Conditions</span><span>Privacy Policy</span><span>Cookies Policy</span></div>
            <div className="flex gap-3"><span className="grid size-8 place-items-center rounded-full bg-white/15">f</span><span className="grid size-8 place-items-center rounded-full bg-white/15">x</span><span className="grid size-8 place-items-center rounded-full bg-white/15">in</span></div>
          </div>
        </div>
      </footer>
    </main>
  );
}

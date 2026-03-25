import Image from "next/image";

import { withBasePath } from "@/lib/base-path";
import { sectionContainer } from "@/lib/landing-content";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className={`${sectionContainer} pb-6 pt-12`}>
        <div className="grid gap-12 md:grid-cols-[minmax(680px,1.7fr)_minmax(0,0.85fr)] md:items-start md:gap-14 lg:gap-18">
          <div className="max-w-none">
            <Image
              src={withBasePath("/unipay-logo.svg")}
              alt="Unipay logo"
              width={100}
              height={40}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-[620px] text-[22px] font-semibold leading-tight">
              CÔNG TY CỔ PHẦN GIẢI PHÁP THANH TOÁN UNIPAY
            </p>
            <p className="mt-4 w-full max-w-none text-sm leading-6 text-white/60">
              Tầng 2, Tòa nhà Saigon Paragon, Số 03 Nguyễn Lương Bằng, Phường
              Tân Mỹ, TP Hồ Chí Minh, Việt Nam
            </p>
            <p className="mt-5 text-sm text-white/85">
              contact@unipay.net.vn · 02873096667
            </p>
          </div>
          <div className="grid gap-x-14 gap-y-10 sm:grid-cols-2 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-20">
            <div>
              <p className="text-base font-semibold text-white/60">
                Giải pháp Unipay
              </p>
              <p className="mt-4 text-sm text-white/90">Giải pháp thanh toán</p>
              <p className="mt-2.5 text-sm text-white/90">
                Giải pháp quản lý kinh doanh
              </p>
              <p className="mt-2.5 text-sm text-white/90">
                Giải pháp thiết bị thanh toán
              </p>
            </div>
            <div>
              <p className="text-base font-semibold text-white/60">
                Giải pháp theo ngành
              </p>
              <p className="mt-4 text-sm text-white/90">F&B</p>
              <p className="mt-2.5 text-sm text-white/90">Bán lẻ</p>
              <p className="mt-2.5 text-sm text-white/90">Dịch vụ</p>
              <p className="mt-2.5 text-sm text-white/90">Giáo dục</p>
            </div>
            <div>
              <p className="text-base font-semibold text-white/60">Thiết bị</p>
              <p className="mt-4 text-sm text-white/90">Smart POS cầm tay</p>
              <p className="mt-2.5 text-sm text-white/90">Duo Screen POS</p>
              <p className="mt-2.5 text-sm text-white/90">
                Thiết bị hiển thị QR
              </p>
              <p className="mt-2.5 text-sm text-white/90">Soundbox</p>
            </div>
            <div>
              <p className="text-base font-semibold text-white/60">Công ty</p>
              <p className="mt-4 text-sm text-white/90">Về chúng tôi</p>
              <p className="mt-2.5 text-sm text-white/90">Liên hệ</p>
            </div>
          </div>
        </div>
        <div className="mt-10 grid gap-4 border-t border-white/14 pt-6 text-sm text-white/80 md:grid-cols-[minmax(680px,1.7fr)_minmax(0,0.85fr)] md:items-center">
          <div className="flex flex-wrap gap-5">
            <span>© Unipay Ltd 2025</span>
            <span>Term & Conditions</span>
            <span>Privacy Policy</span>
            <span>Cookies Policy</span>
          </div>
          <div className="flex gap-3 md:justify-self-end">
            <span className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/10 transition hover:-translate-y-0.5 hover:bg-white/16">
              f
            </span>
            <span className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/10 transition hover:-translate-y-0.5 hover:bg-white/16">
              x
            </span>
            <span className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/10 transition hover:-translate-y-0.5 hover:bg-white/16">
              in
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

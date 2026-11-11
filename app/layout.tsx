import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "샬롬자유학교 | 1년 흐름 안내",
  description: "하나님의 형상을 회복하고 삶의 힘을 기르는 교육 - 샬롬자유학교 소개 웹사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#faf7f2] text-[#2c2623]">
        <Header />

        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
          {children}
        </main>

        <footer className="mt-auto border-t border-[#e6dfd5] bg-[#f3ede2] py-6 text-center text-xs text-[#5c5046] sm:text-sm">
          <div className="mx-auto max-w-4xl px-4">
            <p className="font-medium">
              학생 실습으로 만든 사이트예요 (공식 홈페이지 아님) · 공식 홈페이지:{" "}
              <a
                href="https://www.shalomfree.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#2e5a44] underline underline-offset-4 hover:text-[#c87d4b]"
              >
                shalomfree.kr
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

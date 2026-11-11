import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "학교생활 | 샬롬자유학교",
  description: "샬롬자유학교의 5가지 학교생활 활동 안내",
};

// [직접 채우기 안내] 아래 description의 [ ] 빈칸을 실제 학교생활 한 줄 설명으로 바꾸어 주세요.
const ACTIVITIES = [
  {
    emoji: "🪙",
    name: "학교화폐·기본소득·콩앗이",
    description: "[학교화폐·기본소득·콩앗이 한 줄 설명]",
    tag: "활동 01",
  },
  {
    emoji: "🌅",
    name: "아침묵상",
    description: "[아침묵상 한 줄 설명]",
    tag: "활동 02",
  },
  {
    emoji: "🧹",
    name: "마을 청소",
    description: "[마을 청소 한 줄 설명]",
    tag: "활동 03",
  },
  {
    emoji: "🏠",
    name: "기숙사 생활",
    description: "[기숙사 생활 한 줄 설명]",
    tag: "활동 04",
  },
  {
    emoji: "🤝",
    name: "마을과 함께",
    description: "[마을과 함께 한 줄 설명]",
    tag: "활동 05",
  },
];

export default function SchoolLifePage() {
  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 상단 소개 영역 */}
      <section className="rounded-3xl border border-[#e6dfd5] bg-white p-6 shadow-xs sm:p-8">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf1ed] px-3 py-1 text-xs font-bold text-[#2e5a44] sm:text-sm">
            <span>🌿</span>
            <span>학교생활 안내</span>
          </span>
          <h1 className="text-2xl font-extrabold text-[#2c2623] sm:text-3xl">
            샬롬자유학교의 학교생활
          </h1>
          <p className="text-sm font-medium leading-relaxed text-[#5c5046] sm:text-base">
            1학기 삶의 기초를 세우는 학기 → 2학기 삶의 방향을 탐색하는 학기 → 3학기 삶의 대안을 모색하는 학기 속에서 함께하는 5가지 학교생활입니다.
          </p>
        </div>
      </section>

      {/* 활동 카드 5개 (이름 · 한 줄 설명 · 이모지) */}
      <section aria-label="학교생활 활동 카드 5개" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ACTIVITIES.map((activity, idx) => (
          <article
            key={activity.name}
            className={`flex flex-col justify-between rounded-2xl border border-[#e6dfd5] bg-white p-5 shadow-xs transition hover:border-[#2e5a44]/40 sm:p-6 ${
              idx === ACTIVITIES.length - 1 ? "sm:col-span-2" : ""
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                aria-hidden="true"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#cfe0d6] bg-[#eaf1ed] text-3xl"
              >
                {activity.emoji}
              </div>

              <div className="min-w-0 flex-1 space-y-1.5">
                <span className="inline-block rounded-md bg-[#fbf0e6] px-2 py-0.5 text-xs font-bold text-[#a85f2e]">
                  {activity.tag}
                </span>
                <h2 className="text-lg font-extrabold text-[#2c2623] sm:text-xl">
                  {activity.name}
                </h2>
                <p className="rounded-xl border border-dashed border-[#d7cfc2] bg-[#faf7f2] px-3 py-2 text-sm font-medium text-[#5c5046]">
                  {activity.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* 방명록 이동 배너 */}
      <section className="flex flex-col gap-3 rounded-3xl border border-[#d7cfc2] bg-[#efe9df] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="text-sm font-bold text-[#2c2623] sm:text-base">
          💌 샬롬자유학교를 향한 따뜻한 응원 글을 방명록에 남겨보세요!
        </p>
        <Link
          href="/guestbook"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#2e5a44] px-4 py-2.5 text-sm font-bold text-white shadow-xs transition hover:bg-[#234735]"
        >
          <span>💌</span>
          <span>방명록으로 이동</span>
        </Link>
      </section>
    </div>
  );
}

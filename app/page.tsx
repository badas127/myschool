import Image from "next/image";
import Link from "next/link";

const CORE_VALUES = [
  {
    emoji: "🌱",
    title: "자유의 맛",
    description: "선택하고 책임지는 연습",
    badgeClass: "bg-[#eaf1ed] text-[#2e5a44] border-[#cfe0d6]",
  },
  {
    emoji: "💛",
    title: "사랑의 멋",
    description: "하나님, 나와 이웃, 자연 사랑",
    badgeClass: "bg-[#fbf0e6] text-[#a85f2e] border-[#edd5c0]",
  },
  {
    emoji: "🧭",
    title: "대안의 삶",
    description: "앎과 삶의 일치",
    badgeClass: "bg-[#eaf1ed] text-[#2e5a44] border-[#cfe0d6]",
  },
];

const YEAR_FLOW = [
  {
    term: "1학기",
    emoji: "🌿",
    title: "삶의 기초를 세우는 학기",
    accent: "border-[#2e5a44] bg-[#eaf1ed] text-[#2e5a44]",
  },
  {
    term: "2학기",
    emoji: "🔭",
    title: "삶의 방향을 탐색하는 학기",
    accent: "border-[#c87d4b] bg-[#fbf0e6] text-[#a85f2e]",
  },
  {
    term: "3학기",
    emoji: "🌾",
    title: "삶의 대안을 모색하는 학기",
    accent: "border-[#2e5a44] bg-[#eaf1ed] text-[#2e5a44]",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10 sm:space-y-14">
      {/* 환영 배너 & 한 줄 소개 */}
      <section className="relative overflow-hidden rounded-3xl border border-[#e6dfd5] bg-white p-6 shadow-sm sm:p-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf1ed] px-3.5 py-1.5 text-sm font-bold text-[#2e5a44]">
              <span>👋</span>
              <span>샬롬~</span>
            </span>
            <h1 className="text-2xl font-extrabold leading-snug tracking-tight text-[#2c2623] sm:text-4xl">
              샬롬자유학교
            </h1>
            <p className="text-base font-medium leading-relaxed text-[#4a4039] sm:text-xl">
              하나님의 형상을 회복하고 삶의 힘을 기르는 교육
            </p>
          </div>

          <div className="relative h-20 w-44 shrink-0 overflow-hidden rounded-2xl border border-[#e6dfd5] bg-[#faf7f2] p-2 sm:h-24 sm:w-52">
            <Image
              src="/logo.jpg"
              alt="샬롬자유학교 로고"
              fill
              sizes="(max-width: 640px) 176px, 208px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-[#faf7f2] px-4 py-3 text-xs font-medium text-[#5c5046] sm:text-sm">
          🌲 입학을 고민하는 학생·학부모님께 샬롬자유학교의 핵심 가치와 1년 흐름을 안내합니다.
        </div>
      </section>

      {/* 1년 흐름 (세로 타임라인 · 여정형 카드 배치) */}
      <section className="space-y-5">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#c87d4b] sm:text-sm">
            1년의 배움 여정
          </span>
          <h2 className="text-xl font-extrabold text-[#2c2623] sm:text-2xl">
            🗺️ 한눈에 보는 1년 흐름
          </h2>
        </div>

        <div className="relative pl-4 sm:pl-6">
          {/* 세로 연결선 */}
          <div
            aria-hidden="true"
            className="absolute top-6 bottom-6 left-7 w-1 rounded-full bg-gradient-to-b from-[#2e5a44] via-[#c87d4b] to-[#2e5a44] sm:left-9"
          />

          <ol className="space-y-5">
            {YEAR_FLOW.map((step, index) => (
              <li key={step.term} className="relative flex items-stretch gap-4 sm:gap-6">
                {/* 타임라인 원형 마커 */}
                <div
                  className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 text-xl shadow-xs ${step.accent}`}
                >
                  <span aria-hidden="true">{step.emoji}</span>
                </div>

                {/* 학기 여정 카드 */}
                <div className="flex flex-1 flex-col justify-center rounded-2xl border border-[#e6dfd5] bg-white p-5 shadow-xs transition hover:border-[#2e5a44]/40 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-block rounded-lg bg-[#2e5a44] px-2.5 py-0.5 text-xs font-bold text-white">
                        {step.term}
                      </span>
                      {index < YEAR_FLOW.length - 1 && (
                        <span className="text-xs font-semibold text-[#8c7e72]">
                          다음 여정으로 이어짐 ↓
                        </span>
                      )}
                    </div>
                    <h3 className="pt-1 text-lg font-extrabold text-[#2c2623] sm:text-xl">
                      {step.title}
                    </h3>
                  </div>

                  <div className="mt-3 text-right text-xs font-bold text-[#c87d4b] sm:mt-0 sm:text-sm">
                    STEP 0{index + 1}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 핵심 가치 3가지 */}
      <section className="space-y-5">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2e5a44] sm:text-sm">
            교육의 중심
          </span>
          <h2 className="text-xl font-extrabold text-[#2c2623] sm:text-2xl">
            🌳 샬롬자유학교의 핵심 가치
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CORE_VALUES.map((item) => (
            <div
              key={item.title}
              className="flex flex-col justify-between rounded-2xl border border-[#e6dfd5] bg-white p-5 shadow-xs sm:p-6"
            >
              <div className="space-y-3">
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border text-2xl ${item.badgeClass}`}
                  aria-hidden="true"
                >
                  {item.emoji}
                </span>
                <h3 className="text-lg font-extrabold text-[#2c2623] sm:text-xl">
                  {item.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-[#4a4039] sm:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 다음 페이지 이동 안내 */}
      <section className="flex flex-col gap-3 rounded-3xl border border-[#d7cfc2] bg-[#efe9df] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="space-y-0.5">
          <p className="text-base font-extrabold text-[#2c2623]">
            🌿 학교생활과 응원의 공간도 둘러보세요
          </p>
          <p className="text-xs font-medium text-[#5c5046] sm:text-sm">
            5가지 학교생활 활동 카드와 모두 함께 보는 방명록이 준비되어 있습니다.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/school-life"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#2e5a44] px-4 py-2.5 text-sm font-bold text-white shadow-xs transition hover:bg-[#234735] sm:flex-initial"
          >
            <span>🌿</span>
            <span>학교생활 보기</span>
          </Link>
          <Link
            href="/guestbook"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#c87d4b] px-4 py-2.5 text-sm font-bold text-white shadow-xs transition hover:bg-[#b0693a] sm:flex-initial"
          >
            <span>💌</span>
            <span>방명록 남기기</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

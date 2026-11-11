"use client";

import { FormEvent, useEffect, useState } from "react";
import type { GuestbookEntry } from "../api/guestbook/route";

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function fetchEntries() {
    try {
      setLoading(true);
      const res = await fetch("/api/guestbook", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries ?? []);
      }
    } catch {
      setErrorMsg("방명록 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEntries();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    if (!nickname.trim() || !message.trim()) {
      setErrorMsg("닉네임과 응원 글을 모두 입력해 주세요.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: nickname.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "등록에 실패했습니다.");
        return;
      }

      setEntries(data.entries ?? []);
      setNickname("");
      setMessage("");
    } catch {
      setErrorMsg("서버와 통신하는 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 상단 안내 */}
      <section className="rounded-3xl border border-[#e6dfd5] bg-white p-6 shadow-xs sm:p-8">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fbf0e6] px-3 py-1 text-xs font-bold text-[#a85f2e] sm:text-sm">
            <span>💌</span>
            <span>모두 함께 보는 방명록</span>
          </span>
          <h1 className="text-2xl font-extrabold text-[#2c2623] sm:text-3xl">
            샬롬~ 따뜻한 응원 글을 남겨주세요
          </h1>
          <p className="text-sm font-medium leading-relaxed text-[#5c5046] sm:text-base">
            작성한 닉네임과 응원 글은 서버 메모리에 저장되어 방문한 모두가 함께 볼 수 있습니다.
          </p>
        </div>
      </section>

      {/* 응원 글 작성 폼 */}
      <section className="rounded-3xl border border-[#e6dfd5] bg-white p-5 shadow-xs sm:p-7">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1.5 sm:col-span-1">
              <label
                htmlFor="nickname"
                className="block text-sm font-bold text-[#2c2623]"
              >
                👤 닉네임
              </label>
              <input
                id="nickname"
                type="text"
                maxLength={20}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="예: 샬롬친구"
                className="w-full rounded-xl border border-[#d7cfc2] bg-[#faf7f2] px-3.5 py-2.5 text-sm font-medium text-[#2c2623] placeholder:text-[#9c8e80] focus:border-[#2e5a44] focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-bold text-[#2c2623]"
              >
                💬 응원 글
              </label>
              <input
                id="message"
                type="text"
                maxLength={200}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="샬롬자유학교를 향한 따뜻한 인사나 응원 한마디를 남겨주세요"
                className="w-full rounded-xl border border-[#d7cfc2] bg-[#faf7f2] px-3.5 py-2.5 text-sm font-medium text-[#2c2623] placeholder:text-[#9c8e80] focus:border-[#2e5a44] focus:bg-white focus:outline-none"
                required
              />
            </div>
          </div>

          {errorMsg && (
            <p className="rounded-xl bg-[#fbf0e6] px-3.5 py-2 text-xs font-bold text-[#a85f2e] sm:text-sm">
              ⚠️ {errorMsg}
            </p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#2e5a44] px-5 py-2.5 text-sm font-bold text-white shadow-xs transition hover:bg-[#234735] disabled:opacity-60 sm:w-auto"
            >
              <span>🌱</span>
              <span>{submitting ? "저장 중..." : "응원 글 남기기"}</span>
            </button>
          </div>
        </form>
      </section>

      {/* 응원 글 목록 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[#2c2623] sm:text-xl">
            📬 남겨진 응원 글 ({entries.length}개)
          </h2>
          <button
            type="button"
            onClick={fetchEntries}
            className="rounded-xl border border-[#d7cfc2] bg-white px-3 py-1.5 text-xs font-bold text-[#4a4039] transition hover:border-[#2e5a44] hover:text-[#2e5a44]"
          >
            🔄 새로고침
          </button>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-[#e6dfd5] bg-white p-8 text-center text-sm font-medium text-[#6b5e54]">
            응원 글을 불러오는 중입니다...
          </div>
        ) : entries.length === 0 ? (
          <div className="rounded-2xl border border-[#e6dfd5] bg-white p-8 text-center text-sm font-medium text-[#6b5e54]">
            아직 남겨진 응원 글이 없습니다. 첫 번째 응원 글을 남겨보세요!
          </div>
        ) : (
          <ul className="space-y-3">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="rounded-2xl border border-[#e6dfd5] bg-white p-5 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#eaf1ed] px-2.5 py-1 text-xs font-extrabold text-[#2e5a44] sm:text-sm">
                    <span>🌿</span>
                    <span>{entry.nickname}</span>
                  </span>
                  <span className="text-xs font-medium text-[#8c7e72]">
                    {entry.createdAt}
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium leading-relaxed text-[#2c2623] sm:text-base">
                  {entry.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

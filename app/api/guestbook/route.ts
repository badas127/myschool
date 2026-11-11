import { NextResponse } from "next/server";

export interface GuestbookEntry {
  id: number;
  nickname: string;
  message: string;
  createdAt: string;
}

// 서버 메모리(서버의 변수)에 방명록 목록을 저장합니다. (localStorage나 DB 미사용)
const globalForGuestbook = globalThis as unknown as {
  guestbookEntries?: GuestbookEntry[];
  guestbookNextId?: number;
};

if (!globalForGuestbook.guestbookEntries) {
  globalForGuestbook.guestbookEntries = [
    {
      id: 1,
      nickname: "샬롬 방문객",
      message: "샬롬~ 샬롬자유학교의 1년 배움 여정을 응원합니다!",
      createdAt: "첫 응원 글",
    },
  ];
  globalForGuestbook.guestbookNextId = 2;
}

export async function GET() {
  const entries = globalForGuestbook.guestbookEntries ?? [];
  return NextResponse.json(
    { entries },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nickname = typeof body.nickname === "string" ? body.nickname.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!nickname || !message) {
      return NextResponse.json(
        { error: "닉네임과 응원 글을 모두 입력해 주세요." },
        { status: 400 }
      );
    }

    if (nickname.length > 20 || message.length > 200) {
      return NextResponse.json(
        { error: "닉네임은 20자 이내, 응원 글은 200자 이내로 작성해 주세요." },
        { status: 400 }
      );
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(
      2,
      "0"
    )}:${String(now.getMinutes()).padStart(2, "0")}`;

    const nextId = globalForGuestbook.guestbookNextId ?? 1;
    const newEntry: GuestbookEntry = {
      id: nextId,
      nickname,
      message,
      createdAt: formattedDate,
    };

    globalForGuestbook.guestbookNextId = nextId + 1;
    globalForGuestbook.guestbookEntries = [
      newEntry,
      ...(globalForGuestbook.guestbookEntries ?? []),
    ];

    return NextResponse.json(
      { entry: newEntry, entries: globalForGuestbook.guestbookEntries },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "응원 글을 저장하는 중 문제가 발생했습니다." },
      { status: 500 }
    );
  }
}

import { Memo } from "../models/memo";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
};

export async function fetchMemos(): Promise<Memo[]> {
    const response = await fetchData("/api/memos", { method: "GET" });
    return response.json();
};

export interface MemoInput {
    title: string,
    text?: string,
} 

export async function createMemo(memo: MemoInput): Promise<Memo> {
    const response = await fetchData ("api/memos", 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(memo),
    });
    return response.json();
};

export async function updateMemo(memoId: string, memo: MemoInput): Promise<Memo> {
    const response = await fetchData("/api/memos/" + memoId, 
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(memo), 
        });
    return response.json();
}

export async function deleteMemo(memoId: string) {
    await fetchData("/api/memos/" + memoId, { method: "DELETE" });
}
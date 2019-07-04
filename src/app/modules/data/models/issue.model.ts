export interface FirebaseDate {
    seconds: number;
    nanoseconds: number;
}

export interface Issue {
    title: string;
    description?: string;
    createdAt: FirebaseDate;
    done: boolean;
}

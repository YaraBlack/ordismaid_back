export interface ApiResponse<T> {
    success: boolean;
    httpCode: number;
    message: string;
    timestamp: string;
    data: T | null;
}
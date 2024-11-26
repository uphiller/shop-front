import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // API 기본 URL

interface LoginResponse {
    access_token: string;
}

interface LoginCredentials {
    email: string;
    password: string;
}

/**
 * 로그인 API 호출
 * @param credentials 이메일과 비밀번호
 * @returns 성공 시 토큰 반환
 */
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
        const params = new URLSearchParams();
        params.append("username", credentials.email);
        params.append("password", credentials.password);
        params.append("client_id", "shop-front");
        params.append("client_secret", "6XAvDdo5l9m5IHKzWGT6lQ9zGFvDJ83o");
        params.append("grant_type", "password");
        params.append("realm", "shop");

        // Axios 요청
        const response = await axios.post<LoginResponse>(
            `${API_BASE_URL}/realms/shop/protocol/openid-connect/token`,
            params, // URL 인코딩된 데이터 전송
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded", // 헤더 설정
                },
            }
        );

        return response.data;
    } catch (err: any) {
        if (err.response && err.response.data) {
            throw new Error(err.response.data.message || "Login failed.");
        }
        throw new Error("An error occurred. Please try again.");
    }
};

const USER_ID = "user_id";
const USERNAME = "username";
const EMAIL = "email";
const ROLE = "role";

export function setUserId(id: any) {
    localStorage.setItem(USER_ID, id);
}

export function setUsername(username: string) {
    localStorage.setItem(USERNAME, username);
}

export function setUserEmail(email: string) {
    localStorage.setItem(EMAIL, email);
}

export function setUserRole(role: string) {
    localStorage.setItem(ROLE, role);
}

export function getUserId() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(USER_ID);
}

export function getUsername() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(USERNAME);
}

export function getUserEmail() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(EMAIL);
}

export function getUserRole() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ROLE);
}
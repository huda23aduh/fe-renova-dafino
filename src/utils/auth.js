import { jwtDecode } from 'jwt-decode';

export function getAuth() {
  const data =
    JSON.parse(localStorage.getItem('auth')) ||
    JSON.parse(sessionStorage.getItem('auth'));

  if (!data?.token) return null;

  try {
    const decoded = jwtDecode(data.token);

    // token expired
    if (decoded.exp * 1000 < Date.now()) {
      logout();
      return null;
    }

    return {
      token: data.token,
      user: decoded
    };
  } catch {
    logout();
    return null;
  }
}

export function logout() {
  localStorage.removeItem('auth');
  sessionStorage.removeItem('auth');
  window.location.hash = '#login';
  window.location.reload();
}

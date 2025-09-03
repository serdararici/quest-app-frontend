
import { RefreshToken } from "../services/HttpService";

export const logout = () => {
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("refreshKey");
    localStorage.removeItem("userName");
    window.location.href = '/auth'; // Sayfayı yenilemek için
  };

export async function callWithAuth(apiFunc, payload, isRetry = false) {
  try {
    let res;
    
    // API fonksiyonuna göre parametreleri farklı şekilde geç
    if (payload.body !== undefined) {
      // POST, PUT gibi body gereken metodlar için
      res = await apiFunc(payload.url, payload.body);
    } else {
      // GET, DELETE gibi sadece url gereken metodlar için
      res = await apiFunc(payload.url);
    }

    if (!res.ok) {
      if (isRetry) {
        console.log("Retry başarısız, logout yapılıyor");
        logout();
        return { success: false, error: "Token yenileme başarısız" };
      }

      console.log("Token yenileniyor...");
      const refreshRes = await RefreshToken();
      
      if (!refreshRes.ok) {
        console.log("RefreshToken başarısız:", refreshRes.status);
        logout();
        return { success: false, error: "Refresh token geçersiz" };
      }

      const tokens = await refreshRes.json();
      console.log("Yeni token alındı");
      localStorage.setItem("tokenKey", tokens.accessToken);

      return await callWithAuth(apiFunc, payload, true);
    }

    let data = null;
    const contentType = res.headers.get("content-type");
    
    if (contentType && contentType.includes("application/json")) {
      try {
        const text = await res.text();
        if (text.trim()) {
          data = JSON.parse(text);
        }
      } catch (parseError) {
        console.warn("JSON parse hatası, boş response olabilir:", parseError);
      }
    }
    
    return { success: true, data };
    
  } catch (err) {
    console.error("API çağrısı hatası:", err);
    return { success: false, error: err };
  }
}

import { AUTH_BASE_URL, AUTH_CONFIG_PROBLEM } from "@/config/api";
import { authRequest, isRecord } from "@/services/api";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

export type SocialProvider = "google" | "apple";
export type SocialResult =
  | { status: "success"; accessToken: string }
  | { status: "cancelled" }
  | { status: "error"; message: string };

const decode = (s: string) => {
  try {
    return decodeURIComponent(s.replace(/\+/g, " "));
  } catch {
    return s;
  }
};

// Baca parameter ?query dan #fragment (token ada di #fragment)
function readParams(url: string): Record<string, string> {
  const out: Record<string, string> = {};
  const hashAt = url.indexOf("#");
  const beforeHash = hashAt >= 0 ? url.slice(0, hashAt) : url;
  const queryAt = beforeHash.indexOf("?");
  const parts = [
    queryAt >= 0 ? beforeHash.slice(queryAt + 1) : "",
    hashAt >= 0 ? url.slice(hashAt + 1) : "",
  ];
  for (const part of parts) {
    for (const pair of part.split("&")) {
      if (!pair) continue;
      const eq = pair.indexOf("=");
      out[decode(eq >= 0 ? pair.slice(0, eq) : pair)] =
        eq >= 0 ? decode(pair.slice(eq + 1)) : "";
    }
  }
  return out;
}

// Alur implicit; URL redirect berisi token, jangan dicatat ke log
export async function signInWithProvider(
  provider: SocialProvider,
): Promise<SocialResult> {
  if (!AUTH_BASE_URL) {
    return {
      status: "error",
      message: AUTH_CONFIG_PROBLEM ?? "Supabase belum dikonfigurasi.",
    };
  }
  const label = provider === "google" ? "Google" : "Apple";

  // Provider harus aktif di Supabase
  const settings = await authRequest("GET", "/settings");
  if (!settings.ok) return { status: "error", message: settings.error.message };
  const external =
    isRecord(settings.data) && isRecord(settings.data.external)
      ? settings.data.external
      : null;
  if (external && external[provider] !== true) {
    return {
      status: "error",
      message: `Login ${label} belum diaktifkan di Supabase (Authentication > Sign In / Providers > ${label}).`,
    };
  }

  const redirectUrl = Linking.createURL("auth-callback");
  if (__DEV__) console.log("Redirect URL untuk Supabase:", redirectUrl); // tanpa token
  const startUrl = `${AUTH_BASE_URL}/authorize?provider=${provider}&redirect_to=${encodeURIComponent(redirectUrl)}`;

  try {
    const result = await WebBrowser.openAuthSessionAsync(startUrl, redirectUrl);
    if (result.type !== "success") return { status: "cancelled" };

    const params = readParams(result.url);
    if (params.error || params.error_code) {
      return {
        status: "error",
        message: `Login ${label} ditolak atau gagal diproses. Coba lagi.`,
      };
    }
    const accessToken = params.access_token;
    if (!accessToken)
      return {
        status: "error",
        message: `Supabase tidak mengembalikan token login ${label}.`,
      };

    // Verifikasi token ke Supabase
    const user = await authRequest("GET", "/user", undefined, accessToken);
    if (!user.ok || !isRecord(user.data)) {
      return {
        status: "error",
        message: "Server tidak dapat memverifikasi login. Coba lagi.",
      };
    }
    return { status: "success", accessToken };
  } catch {
    return {
      status: "error",
      message: "Tidak dapat membuka halaman login. Coba lagi.",
    };
  }
}

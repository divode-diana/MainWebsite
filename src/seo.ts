export const SITE_URL = "https://www.divode.pt";
export const PAGE_PATHS = ["/", "/rgpd/", "/termos/", "/acessibilidade/"];

export function canonicalPath(pathname: string) {
    const path = pathname.replace(/\/index\.html$/, "/").replace(/\/+$/, "") + "/";
    return PAGE_PATHS.includes(path) ? path : null;
}

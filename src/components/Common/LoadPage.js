function LoadPage(url, browser, isLogin) {
    url = url.indexOf("http") !== -1 ? url : location.protocol + url
    if (browser == "zhuzhan") {
        if (isLogin) {
            window.WBAPP && WBAPP.isLogin((data) => {
                var state = data["state"];
                if (state) {
                    WBAPP.loadPage("link", url, "")
                } else {
                    WBAPP.login(url, "", "link", true, true)
                }
            });
            return
        }
        window.WBAPP && WBAPP.loadPage("link", url, "")
        return
    }
    location.href = url
}
export default LoadPage
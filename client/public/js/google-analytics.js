function setUpGoogleAnalytics() {
  // const ga_id = "G-0P9DYXL4TK";
  if (ga_id) {
    const s = document.createElement("script");
    s.setAttribute("async", true);
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ga_id}`;
    document.body.append(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", ga_id);
  }
}
document.addEventListener("DOMContentLoaded", setUpGoogleAnalytics);

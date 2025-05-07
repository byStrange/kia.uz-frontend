export default defineNuxtPlugin(() => {
  const liveTexId = 180049;
  if (typeof window !== 'undefined') {
    window['liveTex'] = true;
    window['liveTexID'] = liveTexId;
    window['liveTex_object'] = true;

    const liveTexScript = document.createElement('script');
    liveTexScript.type = 'text/javascript';
    liveTexScript.async = true;
    liveTexScript.src = '//cs15.livetex.ru/js/client.js';
    document.head.appendChild(liveTexScript);
  }
});

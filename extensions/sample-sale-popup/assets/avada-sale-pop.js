(function() {
  const baseUrl = 'https://localhost:3000/scripttag';

  const scriptElement = document.createElement('script');
  scriptElement.type = 'text/javascript';
  scriptElement.async = !0;
  scriptElement.src = `${baseUrl}/avada-sale-pop.min.js?v=${new Date().getTime()}`;
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(scriptElement, firstScript);
})();

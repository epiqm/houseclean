(function($){

  var request = new XMLHttpRequest();
  var url =  "https://secure.houseclean.online/website_details";

  function onAnalyticsReady() {
    if (window.amplitude) {
  HouseCleanAnalytics.register(new HouseCleanAnalytics.AmplitudeWrapper());
}



  }

  function setupIntercom(data){
    window.intercomSettings = data.intercom_settings;
    window.success_operators_available = data.success_operators_available;
      (function(){var w=window;var ic=w.Intercom;if(typeof ic==='function'){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/mq44cv6t';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()
  }

  function setGlobals(data){
    window.cookies_domain = data.cookies_domain;
    if (data.current_user_name){
      window.current_user_name = data.current_user_name;
      window.current_user_id = data.current_user_id;
      window.current_account_name = data.current_account_name;
      window.current_account_industry = data.current_account_industry;
      window.current_account_addons = data.current_account_addons;
      window.logout_url = data.logout_url;
      $(document).trigger('authentication:logged-in');
    }
    else {
      $(document).trigger('authentication:logged-out');
    }
    setupIntercom(data);
  }

  function dataReceived(data){
    setGlobals(data);
  }

  function fetchDetailsFromAPI(){
    if(request) { //Preflight request
      request.open('GET', url, true);
      request.withCredentials = true;
      request.onreadystatechange = function(){
        if (request.responseText){
          data = {}
          try {
            data = JSON.parse(request.responseText);
          }
          catch(error){
            console.log("JSON parse error: " + request.responseText);
          }
          dataReceived(data);
        }
      }
      request.send();
    }
  }

  /* ======================  HouseClean Analytics ====================== */

      (function(e,t){var n=e.amplitude||{_q:[],_iq:{}};var r=t.createElement("script");r.type="text/javascript";
    r.async=true;r.src="https://d24n15hnbwhuhn.cloudfront.net/libs/amplitude-3.4.1-min.gz.js";
    r.onload=function(){if(e.amplitude.runQueuedFunctions){e.amplitude.runQueuedFunctions();
    }else{console.log("[Amplitude] Error: could not load SDK")}};var i=t.getElementsByTagName("script")[0];
    i.parentNode.insertBefore(r,i);function o(e,t){e.prototype[t]=function(){this._q.push([t].concat(Array.prototype.slice.call(arguments,0)));
    return this}}var s=function(){this._q=[];return this};var a=["add","append","clearAll","prepend","set","setOnce","unset"];
    for(var u=0;u<a.length;u++){o(s,a[u])}n.Identify=s;var c=function(){this._q=[];return this;
    };var l=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"];
    for(var p=0;p<l.length;p++){o(c,l[p])}n.Revenue=c;var d=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId","setGlobalUserProperties","identify","clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId","logEventWithTimestamp","logEventWithGroups"];
    function v(e){function t(t){e[t]=function(){e._q.push([t].concat(Array.prototype.slice.call(arguments,0)));
    }}for(var n=0;n<d.length;n++){t(d[n])}}v(n);n.getInstance=function(e){e=(!e||e.length===0?"$default_instance":e).toLowerCase();
    if(!n._iq.hasOwnProperty(e)){n._iq[e]={_q:[]};v(n._iq[e])}return n._iq[e]};e.amplitude=n;
    })(window,document);

    amplitude.getInstance().init("06c82be41569c62e178f3501c2fa61a1", null, {
      includeUtm: true,
      includeReferrer: true
    });


  if (window.HouseCleanAnalytics == null) {
    var analytics_script = document.createElement('script');
    analytics_script.onload = onAnalyticsReady;
    analytics_script.src = "//d3ey4dbjkt2f6s.cloudfront.net/assets/shared/analytics-9ea0a724ff43ce5ddeb98862895721b3.js";
    document.head.appendChild(analytics_script);
  } else {
    onAnalyticsReady();
  }

  /* ==================== Load and Configure GA ==================== */

    // very helpful - http://misterphilip.com/universal-analytics/migration/

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  var ga_client_id = "";
  var ga_options = {cookieDomain: 'auto'};

      ga_client_id = "UA-19381044-3";


  ga('create', ga_client_id, ga_options);



  // Optimizely Universal Analytics Integration - Won't break anything if optimizely is not present.
  window.optimizely = window.optimizely || [];
  window.optimizely.push("activateUniversalAnalytics");

  ga('send', 'pageview');




  /* ================== Record cookies if present ================== */

  function qs(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
  }
  function setCookie(name, index, array) {
    cookie_name = qs(name[0]);
    cookie_duration = name[2];
    if(cookie_name !== null && cookie_name.length > 0) {
      if($.cookie != null) {
        $.cookie(name[1], cookie_name, { expires: cookie_duration, path: '/', domain: '.houseclean.online' } );
      } else {
        console.error("Missing jquery-cookie");
      }
    }
  }

  [['thank', 'thank', 364],
   ['promo', 'discount', 364],
   ['discount', 'discount', 364],
   ['am', '_HouseClean_am_referral', 60]].forEach(setCookie);


  fetchDetailsFromAPI();
})(jQuery);

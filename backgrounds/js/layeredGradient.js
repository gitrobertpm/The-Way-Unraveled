// LAYERED-GRADIENT JS

/**
 * StyleFix 1.0.3 & PrefixFree 1.0.7
 * @author Lea Verou
 * MIT license
 */(function(){function t(e,t){return[].slice.call((t||document).querySelectorAll(e))}if(!window.addEventListener)return;var e=window.StyleFix={link:function(t){try{if(t.rel!=="stylesheet"||t.hasAttribute("data-noprefix"))return}catch(n){return}var r=t.href||t.getAttribute("data-href"),i=r.replace(/[^\/]+$/,""),s=(/^[a-z]{3,10}:/.exec(i)||[""])[0],o=(/^[a-z]{3,10}:\/\/[^\/]+/.exec(i)||[""])[0],u=/^([^?]*)\??/.exec(r)[1],a=t.parentNode,f=new XMLHttpRequest,l;f.onreadystatechange=function(){f.readyState===4&&l()};l=function(){var n=f.responseText;if(n&&t.parentNode&&(!f.status||f.status<400||f.status>600)){n=e.fix(n,!0,t);if(i){n=n.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(e,t,n){return/^([a-z]{3,10}:|#)/i.test(n)?e:/^\/\//.test(n)?'url("'+s+n+'")':/^\//.test(n)?'url("'+o+n+'")':/^\?/.test(n)?'url("'+u+n+'")':'url("'+i+n+'")'});var r=i.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1");n=n.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+r,"gi"),"$1")}var l=document.createElement("style");l.textContent=n;l.media=t.media;l.disabled=t.disabled;l.setAttribute("data-href",t.getAttribute("href"));a.insertBefore(l,t);a.removeChild(t);l.media=t.media}};try{f.open("GET",r);f.send(null)}catch(n){if(typeof XDomainRequest!="undefined"){f=new XDomainRequest;f.onerror=f.onprogress=function(){};f.onload=l;f.open("GET",r);f.send(null)}}t.setAttribute("data-inprogress","")},styleElement:function(t){if(t.hasAttribute("data-noprefix"))return;var n=t.disabled;t.textContent=e.fix(t.textContent,!0,t);t.disabled=n},styleAttribute:function(t){var n=t.getAttribute("style");n=e.fix(n,!1,t);t.setAttribute("style",n)},process:function(){t('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);t("style").forEach(StyleFix.styleElement);t("[style]").forEach(StyleFix.styleAttribute)},register:function(t,n){(e.fixers=e.fixers||[]).splice(n===undefined?e.fixers.length:n,0,t)},fix:function(t,n,r){for(var i=0;i<e.fixers.length;i++)t=e.fixers[i](t,n,r)||t;return t},camelCase:function(e){return e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()}).replace("-","")},deCamelCase:function(e){return e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()})}};(function(){setTimeout(function(){t('link[rel="stylesheet"]').forEach(StyleFix.link)},10);document.addEventListener("DOMContentLoaded",StyleFix.process,!1)})()})();(function(e){function t(e,t,r,i,s){e=n[e];if(e.length){var o=RegExp(t+"("+e.join("|")+")"+r,"gi");s=s.replace(o,i)}return s}if(!window.StyleFix||!window.getComputedStyle)return;var n=window.PrefixFree={prefixCSS:function(e,r,i){var s=n.prefix;n.functions.indexOf("linear-gradient")>-1&&(e=e.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig,function(e,t,n,r){return t+(n||"")+"linear-gradient("+(90-r)+"deg"}));e=t("functions","(\\s|:|,)","\\s*\\(","$1"+s+"$2(",e);e=t("keywords","(\\s|:)","(\\s|;|\\}|$)","$1"+s+"$2$3",e);e=t("properties","(^|\\{|\\s|;)","\\s*:","$1"+s+"$2:",e);if(n.properties.length){var o=RegExp("\\b("+n.properties.join("|")+")(?!:)","gi");e=t("valueProperties","\\b",":(.+?);",function(e){return e.replace(o,s+"$1")},e)}if(r){e=t("selectors","","\\b",n.prefixSelector,e);e=t("atrules","@","\\b","@"+s+"$1",e)}e=e.replace(RegExp("-"+s,"g"),"-");e=e.replace(/-\*-(?=[a-z]+)/gi,n.prefix);return e},property:function(e){return(n.properties.indexOf(e)>=0?n.prefix:"")+e},value:function(e,r){e=t("functions","(^|\\s|,)","\\s*\\(","$1"+n.prefix+"$2(",e);e=t("keywords","(^|\\s)","(\\s|$)","$1"+n.prefix+"$2$3",e);n.valueProperties.indexOf(r)>=0&&(e=t("properties","(^|\\s|,)","($|\\s|,)","$1"+n.prefix+"$2$3",e));return e},prefixSelector:function(e){return e.replace(/^:{1,2}/,function(e){return e+n.prefix})},prefixProperty:function(e,t){var r=n.prefix+e;return t?StyleFix.camelCase(r):r}};(function(){var e={},t=[],r={},i=getComputedStyle(document.documentElement,null),s=document.createElement("div").style,o=function(n){if(n.charAt(0)==="-"){t.push(n);var r=n.split("-"),i=r[1];e[i]=++e[i]||1;while(r.length>3){r.pop();var s=r.join("-");u(s)&&t.indexOf(s)===-1&&t.push(s)}}},u=function(e){return StyleFix.camelCase(e)in s};if(i.length>0)for(var a=0;a<i.length;a++)o(i[a]);else for(var f in i)o(StyleFix.deCamelCase(f));var l={uses:0};for(var c in e){var h=e[c];l.uses<h&&(l={prefix:c,uses:h})}n.prefix="-"+l.prefix+"-";n.Prefix=StyleFix.camelCase(n.prefix);n.properties=[];for(var a=0;a<t.length;a++){var f=t[a];if(f.indexOf(n.prefix)===0){var p=f.slice(n.prefix.length);u(p)||n.properties.push(p)}}n.Prefix=="Ms"&&!("transform"in s)&&!("MsTransform"in s)&&"msTransform"in s&&n.properties.push("transform","transform-origin");n.properties.sort()})();(function(){function i(e,t){r[t]="";r[t]=e;return!!r[t]}var e={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"}};e["repeating-linear-gradient"]=e["repeating-radial-gradient"]=e["radial-gradient"]=e["linear-gradient"];var t={initial:"color","zoom-in":"cursor","zoom-out":"cursor",box:"display",flexbox:"display","inline-flexbox":"display",flex:"display","inline-flex":"display",grid:"display","inline-grid":"display","min-content":"width"};n.functions=[];n.keywords=[];var r=document.createElement("div").style;for(var s in e){var o=e[s],u=o.property,a=s+"("+o.params+")";!i(a,u)&&i(n.prefix+a,u)&&n.functions.push(s)}for(var f in t){var u=t[f];!i(f,u)&&i(n.prefix+f,u)&&n.keywords.push(f)}})();(function(){function s(e){i.textContent=e+"{}";return!!i.sheet.cssRules.length}var t={":read-only":null,":read-write":null,":any-link":null,"::selection":null},r={keyframes:"name",viewport:null,document:'regexp(".")'};n.selectors=[];n.atrules=[];var i=e.appendChild(document.createElement("style"));for(var o in t){var u=o+(t[o]?"("+t[o]+")":"");!s(u)&&s(n.prefixSelector(u))&&n.selectors.push(o)}for(var a in r){var u=a+" "+(r[a]||"");!s("@"+u)&&s("@"+n.prefix+u)&&n.atrules.push(a)}e.removeChild(i)})();n.valueProperties=["transition","transition-property"];e.className+=" "+n.prefix;StyleFix.register(n.prefixCSS)})(document.documentElement);

var a = Math.floor(Math.random() * 255);
var b = Math.floor(Math.random() * 255);
var c = Math.floor(Math.random() * 255);
var d = Math.floor(Math.random() * 255);
var e = Math.floor(Math.random() * 255);
var f = Math.floor(Math.random() * 255);
var g = Math.floor(Math.random() * 255);
var h = Math.floor(Math.random() * 255);
var i = Math.floor(Math.random() * 255);
var j = Math.floor(Math.random() * 255);
var k = Math.floor(Math.random() * 255);
var l = Math.floor(Math.random() * 255);
var m = Math.floor(Math.random() * 255);
var n = Math.floor(Math.random() * 255);
var o = Math.floor(Math.random() * 255);
var p = Math.floor(Math.random() * 255);
var q = Math.floor(Math.random() * 255);
var r = Math.floor(Math.random() * 255);
var s = Math.floor(Math.random() * 255);
var t = Math.floor(Math.random() * 255);
var u = Math.floor(Math.random() * 255);
var v = Math.floor(Math.random() * 255);
var w = Math.floor(Math.random() * 255);
var x = Math.floor(Math.random() * 255);

setInterval(function(){ randomBackgroundGradient(); }, 100);

function randomBackgroundGradient() {
	document.getElementById("wrapper").style.background = "repeating-linear-gradient(rgba(" + a + "," + b + "," + c + ", 1), rgba(" + d + "," + e + "," + f + ", 1), rgba(" + g + "," + h + "," + i + ", 1), rgba(" + j + "," + k + "," + l + ", 1), rgba(" + m + "," + n + "," + o + ", 1), rgba(" + p + "," + q + "," + r + ", 1), rgba(" + s + "," + t + "," + u + ", 1), rgba(" + v + "," + w + "," + x + ", 1))";
	document.getElementById("pageTitle").style.background = "repeating-linear-gradient(to right, rgba(" + a + "," + b + "," + c + ", 1), rgba(" + d + "," + e + "," + f + ", 1), rgba(" + g + "," + h + "," + i + ", 1), rgba(" + j + "," + k + "," + l + ", 1), rgba(" + m + "," + n + "," + o + ", 1), rgba(" + p + "," + q + "," + r + ", 1), rgba(" + s + "," + t + "," + u + ", 1), rgba(" + v + "," + w + "," + x + ", 1))";
	document.getElementById("firstDimensionDiv").style.background = "repeating-radial-gradient(rgba(" + a + "," + b + "," + c + ", 1), rgba(" + d + "," + e + "," + f + ", 1), rgba(" + g + "," + h + "," + i + ", 1), rgba(" + j + "," + k + "," + l + ", 1))";
	document.getElementById("secondDimensionDiv").style.background = "repeating-radial-gradient(rgba(" + a + "," + b + "," + c + ", 0.6), rgba(" + d + "," + e + "," + f + ", 0.6), rgba(" + g + "," + h + "," + i + ", 0.6), rgba(" + j + "," + k + "," + l + ", 0.6), rgba(" + m + "," + n + "," + o + ", 0.6), rgba(" + p + "," + q + "," + r + ", 0.6), rgba(" + s + "," + t + "," + u + ", 0.6), rgba(" + v + "," + w + "," + x + ", 0.6))";
	document.getElementById("thirdDimensionDiv").style.background = "repeating-radial-gradient(rgba(" + a + "," + b + "," + c + ", 0.4), rgba(" + d + "," + e + "," + f + ", 0.4), rgba(" + g + "," + h + "," + i + ", 0.4), rgba(" + j + "," + k + "," + l + ", 0.4))";
	document.getElementById("fourthDimensionDiv").style.background = "repeating-radial-gradient(rgba(" + a + "," + b + "," + c + ", 0.1), rgba(" + d + "," + e + "," + f + ", 0.1), rgba(" + g + "," + h + "," + i + ", 0.1), rgba(" + j + "," + k + "," + l + ", 0.1), rgba(" + m + "," + n + "," + o + ", 0.1), rgba(" + p + "," + q + "," + r + ", 0.1), rgba(" + s + "," + t + "," + u + ", 0.1), rgba(" + v + "," + w + "," + x + ", 0.1))";
	
	if (a < 255) {
		a += 1;
	} else if (a > 254) {
		a = Math.floor(Math.random() * 255);
	}
	
	if (b < 255) {
		b += 1;
	} else if (b > 254) {
		b = Math.floor(Math.random() * 255);
	}
	
	if (c < 255) {
		c += 1;
	} else if (c > 254) {
		c = Math.floor(Math.random() * 255);
	}
	
	if (d < 256 && d > 0) {
		d -= 1;
	} else if (d < 1) {
		d = Math.floor(Math.random() * 255);
	}
	
	if (e < 256 && e > 0) {
		e -= 1;
	} else if (e < 1) {
		e = Math.floor(Math.random() * 255);
	}
	
	if (f < 256 && f > 0) {
		f -= 1;
	} else if (f < 1) {
		f = Math.floor(Math.random() * 255);
	}
	
	if (g < 255) {
		g += 1;
	} else if (g > 254) {
		g = Math.floor(Math.random() * 255);
	}
	
	if (h < 255) {
		h += 1;
	} else if (h > 254) {
		h = Math.floor(Math.random() * 255);
	}
	
	if (i < 255) {
		i += 1;
	} else if (i > 254) {
		i = Math.floor(Math.random() * 255);
	}
	
	if (j < 256 && j > 0) {
		j -= 1;
	} else if (j < 1) {
		j = Math.floor(Math.random() * 255);
	}
	
	if (k < 256 && k > 0) {
		k -= 1;
	} else if (k < 1) {
		k = Math.floor(Math.random() * 255);
	}
	
	if (l < 256 && l > 0) {
		l -= 1;
	} else if (l < 1) {
		l = Math.floor(Math.random() * 255);
	}
	
	if (m < 255) {
		m += 1;
	} else if (m > 254) {
		m = Math.floor(Math.random() * 255);
	}
	
	if (n < 255) {
		n += 1;
	} else if (n > 254) {
		n = Math.floor(Math.random() * 255);
	}
	
	if (o < 255) {
		o += 1;
	} else if (o > 254) {
		o = Math.floor(Math.random() * 255);
	}
	
	if (p < 256 && p > 0) {
		p -= 1;
	} else if (p < 1) {
		p = Math.floor(Math.random() * 255);
	}
	
	if (q < 256 && q > 0) {
		q -= 1;
	} else if (q < 1) {
		q = Math.floor(Math.random() * 255);
	}
	
	if (r < 256 && r > 0) {
		r -= 1;
	} else if (r < 1) {
		r = Math.floor(Math.random() * 255);
	}
	
	if (s < 255) {
		s += 1;
	} else if (s > 254) {
		s = Math.floor(Math.random() * 255);
	}
	
	if (t < 255) {
		t += 1;
	} else if (t > 254) {
		t = Math.floor(Math.random() * 255);
	}
	
	if (u < 255) {
		u += 1;
	} else if (u > 254) {
		u = Math.floor(Math.random() * 255);
	}
	
	if (v < 256 && v > 0) {
		v -= 1;
	} else if (v < 1) {
		v = Math.floor(Math.random() * 255);
	}
	
	if (w < 256 && w > 0) {
		w -= 1;
	} else if (w < 1) {
		w = Math.floor(Math.random() * 255);
	}
	
	if (x < 256 && x > 0) {
		x -= 1;
	} else if (x < 1) {
		x = Math.floor(Math.random() * 255);
	}
	
};
	
// ADD BACKGROUNDIMAGES TO SOCIAL MEDIA ICONS
document.getElementById("linkedin").style.backgroundImage= "url('img/social_icons/linkedin.png')";
document.getElementById("github").style.backgroundImage= "url('img/social_icons/github.png')";
document.getElementById("treehouse").style.backgroundImage= "url('img/social_icons/treehouse.png')";
document.getElementById("codepen").style.backgroundImage= "url('img/social_icons/codepen.png')";
document.getElementById("behance").style.backgroundImage= "url('img/social_icons/behance.png')";

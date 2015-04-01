// INDEX JS

/**
 * StyleFix 1.0.3 & PrefixFree 1.0.7
 * @author Lea Verou
 * MIT license
 */(function(){function t(e,t){return[].slice.call((t||document).querySelectorAll(e))}if(!window.addEventListener)return;var e=window.StyleFix={link:function(t){try{if(t.rel!=="stylesheet"||t.hasAttribute("data-noprefix"))return}catch(n){return}var r=t.href||t.getAttribute("data-href"),i=r.replace(/[^\/]+$/,""),s=(/^[a-z]{3,10}:/.exec(i)||[""])[0],o=(/^[a-z]{3,10}:\/\/[^\/]+/.exec(i)||[""])[0],u=/^([^?]*)\??/.exec(r)[1],a=t.parentNode,f=new XMLHttpRequest,l;f.onreadystatechange=function(){f.readyState===4&&l()};l=function(){var n=f.responseText;if(n&&t.parentNode&&(!f.status||f.status<400||f.status>600)){n=e.fix(n,!0,t);if(i){n=n.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(e,t,n){return/^([a-z]{3,10}:|#)/i.test(n)?e:/^\/\//.test(n)?'url("'+s+n+'")':/^\//.test(n)?'url("'+o+n+'")':/^\?/.test(n)?'url("'+u+n+'")':'url("'+i+n+'")'});var r=i.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1");n=n.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+r,"gi"),"$1")}var l=document.createElement("style");l.textContent=n;l.media=t.media;l.disabled=t.disabled;l.setAttribute("data-href",t.getAttribute("href"));a.insertBefore(l,t);a.removeChild(t);l.media=t.media}};try{f.open("GET",r);f.send(null)}catch(n){if(typeof XDomainRequest!="undefined"){f=new XDomainRequest;f.onerror=f.onprogress=function(){};f.onload=l;f.open("GET",r);f.send(null)}}t.setAttribute("data-inprogress","")},styleElement:function(t){if(t.hasAttribute("data-noprefix"))return;var n=t.disabled;t.textContent=e.fix(t.textContent,!0,t);t.disabled=n},styleAttribute:function(t){var n=t.getAttribute("style");n=e.fix(n,!1,t);t.setAttribute("style",n)},process:function(){t('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);t("style").forEach(StyleFix.styleElement);t("[style]").forEach(StyleFix.styleAttribute)},register:function(t,n){(e.fixers=e.fixers||[]).splice(n===undefined?e.fixers.length:n,0,t)},fix:function(t,n,r){for(var i=0;i<e.fixers.length;i++)t=e.fixers[i](t,n,r)||t;return t},camelCase:function(e){return e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()}).replace("-","")},deCamelCase:function(e){return e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()})}};(function(){setTimeout(function(){t('link[rel="stylesheet"]').forEach(StyleFix.link)},10);document.addEventListener("DOMContentLoaded",StyleFix.process,!1)})()})();(function(e){function t(e,t,r,i,s){e=n[e];if(e.length){var o=RegExp(t+"("+e.join("|")+")"+r,"gi");s=s.replace(o,i)}return s}if(!window.StyleFix||!window.getComputedStyle)return;var n=window.PrefixFree={prefixCSS:function(e,r,i){var s=n.prefix;n.functions.indexOf("linear-gradient")>-1&&(e=e.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig,function(e,t,n,r){return t+(n||"")+"linear-gradient("+(90-r)+"deg"}));e=t("functions","(\\s|:|,)","\\s*\\(","$1"+s+"$2(",e);e=t("keywords","(\\s|:)","(\\s|;|\\}|$)","$1"+s+"$2$3",e);e=t("properties","(^|\\{|\\s|;)","\\s*:","$1"+s+"$2:",e);if(n.properties.length){var o=RegExp("\\b("+n.properties.join("|")+")(?!:)","gi");e=t("valueProperties","\\b",":(.+?);",function(e){return e.replace(o,s+"$1")},e)}if(r){e=t("selectors","","\\b",n.prefixSelector,e);e=t("atrules","@","\\b","@"+s+"$1",e)}e=e.replace(RegExp("-"+s,"g"),"-");e=e.replace(/-\*-(?=[a-z]+)/gi,n.prefix);return e},property:function(e){return(n.properties.indexOf(e)>=0?n.prefix:"")+e},value:function(e,r){e=t("functions","(^|\\s|,)","\\s*\\(","$1"+n.prefix+"$2(",e);e=t("keywords","(^|\\s)","(\\s|$)","$1"+n.prefix+"$2$3",e);n.valueProperties.indexOf(r)>=0&&(e=t("properties","(^|\\s|,)","($|\\s|,)","$1"+n.prefix+"$2$3",e));return e},prefixSelector:function(e){return e.replace(/^:{1,2}/,function(e){return e+n.prefix})},prefixProperty:function(e,t){var r=n.prefix+e;return t?StyleFix.camelCase(r):r}};(function(){var e={},t=[],r={},i=getComputedStyle(document.documentElement,null),s=document.createElement("div").style,o=function(n){if(n.charAt(0)==="-"){t.push(n);var r=n.split("-"),i=r[1];e[i]=++e[i]||1;while(r.length>3){r.pop();var s=r.join("-");u(s)&&t.indexOf(s)===-1&&t.push(s)}}},u=function(e){return StyleFix.camelCase(e)in s};if(i.length>0)for(var a=0;a<i.length;a++)o(i[a]);else for(var f in i)o(StyleFix.deCamelCase(f));var l={uses:0};for(var c in e){var h=e[c];l.uses<h&&(l={prefix:c,uses:h})}n.prefix="-"+l.prefix+"-";n.Prefix=StyleFix.camelCase(n.prefix);n.properties=[];for(var a=0;a<t.length;a++){var f=t[a];if(f.indexOf(n.prefix)===0){var p=f.slice(n.prefix.length);u(p)||n.properties.push(p)}}n.Prefix=="Ms"&&!("transform"in s)&&!("MsTransform"in s)&&"msTransform"in s&&n.properties.push("transform","transform-origin");n.properties.sort()})();(function(){function i(e,t){r[t]="";r[t]=e;return!!r[t]}var e={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"}};e["repeating-linear-gradient"]=e["repeating-radial-gradient"]=e["radial-gradient"]=e["linear-gradient"];var t={initial:"color","zoom-in":"cursor","zoom-out":"cursor",box:"display",flexbox:"display","inline-flexbox":"display",flex:"display","inline-flex":"display",grid:"display","inline-grid":"display","min-content":"width"};n.functions=[];n.keywords=[];var r=document.createElement("div").style;for(var s in e){var o=e[s],u=o.property,a=s+"("+o.params+")";!i(a,u)&&i(n.prefix+a,u)&&n.functions.push(s)}for(var f in t){var u=t[f];!i(f,u)&&i(n.prefix+f,u)&&n.keywords.push(f)}})();(function(){function s(e){i.textContent=e+"{}";return!!i.sheet.cssRules.length}var t={":read-only":null,":read-write":null,":any-link":null,"::selection":null},r={keyframes:"name",viewport:null,document:'regexp(".")'};n.selectors=[];n.atrules=[];var i=e.appendChild(document.createElement("style"));for(var o in t){var u=o+(t[o]?"("+t[o]+")":"");!s(u)&&s(n.prefixSelector(u))&&n.selectors.push(o)}for(var a in r){var u=a+" "+(r[a]||"");!s("@"+u)&&s("@"+n.prefix+u)&&n.atrules.push(a)}e.removeChild(i)})();n.valueProperties=["transition","transition-property"];e.className+=" "+n.prefix;StyleFix.register(n.prefixCSS)})(document.documentElement);

// COLOR THEMES
var coloredBlocks = '<div class="blocks"><div class="red top right"></div><div class="red top left"></div><div class="red bottom right"></div><div class="red bottom left"></div><div class="purple top"></div><div class="purpleSides right"></div><div class="purple bottom"></div><div class="purpleSides left"></div><div class="orange or_right or_first"></div><div class="orange or_left or_second"></div><div class="orange or_right or_third"></div><div class="orange or_left or_fourth"></div><div class="yellow y_left y_first"></div><div class="yellow y_right y_second"></div><div class="yellow y_left y_third"></div><div class="yellow y_right y_fourth"></div></div>';

var blueLightSaber = '<div class="innerColumn"></div>';
var greenEyesLeft = '<div class="smileLeft"></div><div class="greenEyes"><div class="greenEyesPupil"></div></div>';
var greenEyesRight = '<div class="smileRight"></div><div class="greenEyes"><div class="greenEyesPupil"></div></div>';

// BRIGHT BORDERS AND MESAGE WINDOWS
var border1 = document.getElementById("border_1").style;
var border3 = document.getElementById("border_3").style;
var border4 = document.getElementById("border_4").style;
var message1 = document.getElementById("message_1").style;
var message2 = document.getElementById("message_2").style;
var message3 = document.getElementById("message_3").style;
var message4 = document.getElementById("message_4").style;


// COLOR THEME FUNCTIONS
function redTheme() {
	document.getElementById('col_L').innerHTML = coloredBlocks;
	document.getElementById('col_R').innerHTML = coloredBlocks;
	document.getElementById('col_L').style.background = "black";
	document.getElementById('col_R').style.background = "black";
	document.getElementById('cr1').style.color = "red";
	document.getElementById('cr2').style.color = "red";
	border1.background = "rgba(255,0,0,0.5)";
	border1.boxShadow = "0px 2px 3px red inset, 0px -2px 3px red inset";
	border3.background = "rgba(255,0,0,0.5)";
	border3.boxShadow = "0px 2px 3px red inset, 0px -2px 3px red inset";
	border4.background = "rgba(255,0,0,0.5)";
	border4.boxShadow = "0px 2px 3px red inset, 0px -2px 3px red inset";
	message1.background = "rgba(128, 0, 0, 0.5)";
	message1.boxShadow = "2px 2px 3px black inset, 0px -2px 3px black inset";
	message2.background = "rgba(255, 0, 0, 0.5)";
	message2.boxShadow = "2px 2px 3px black inset, 0px -2px 3px black inset";
	message3.background = "rgba(255, 140, 0, 0.5)";
	message3.boxShadow = "2px 2px 3px black inset, 0px -2px 3px black inset";
	message4.background = "rgba(255, 255, 0, 0.5)";
	message4.boxShadow = "2px 2px 3px black inset, 0px -2px 3px black inset";
};

function smallRedTheme() {
	border1.background = "rgba(255,0,0,0.5)";
	border1.boxShadow = "0px 2px 3px red inset, 0px -2px 3px red inset";
	border3.background = "rgba(255,0,0,0.5)";
	border3.boxShadow = "0px 2px 3px red inset, 0px -2px 3px red inset";
	border4.background = "rgba(255,0,0,0.5)";
	border4.boxShadow = "0px 2px 3px red inset, 0px -2px 3px red inset";
	message1.background = "rgba(100, 0, 0, 0.5)";
	message1.boxShadow = "2px 2px 3px red inset, 0px -2px 3px red inset";
	message2.background = "rgba(150, 0, 0, 0.5)";
	message2.boxShadow = "2px 2px 3px red inset, 0px -2px 3px red inset";
	message3.background = "rgba(200, 0, 0, 0.5)";
	message3.boxShadow = "2px 2px 3px red inset, 0px -2px 3px red inset";
	message4.background = "rgba(255, 0, 0, 0.5)";
	message4.boxShadow = "2px 2px 3px red inset, 0px -2px 3px red inset";
	document.getElementById('cr1').style.color = "red";
	document.getElementById('cr2').style.color = "red";
};

function greenTheme() {
	document.getElementById('col_L').innerHTML = greenEyesLeft;
	document.getElementById('col_R').innerHTML = greenEyesRight;
	document.getElementById('col_L').style.background = "linear-gradient(black, darkgreen, green, lightgreen, lightgreen, lightgreen, white)";
	document.getElementById('col_R').style.background = "linear-gradient(black, darkgreen, green, lightgreen, lightgreen, lightgreen, white)";
	document.getElementById('cr1').style.color = "green";
	document.getElementById('cr2').style.color = "green";
	border1.background = "rgba(0,255,0,0.3)";
	border1.boxShadow = "0px 2px 3px lawngreen inset, 0px -2px 3px lawngreen inset";
	border3.background = "rgba(0,255,0,0.3)";
	border3.boxShadow = "0px 2px 3px lawngreen inset, 0px -2px 3px lawngreen inset";
	border4.background = "rgba(0,255,0,0.3)";
	border4.boxShadow = "0px 2px 3px lawngreen inset, 0px -2px 3px lawngreen inset";
	message1.background = "rgba(0, 255, 0, 0.3)";
	message1.boxShadow = "0px 2px 3px black inset, 0px -2px 3px black inset";
	message2.background = "rgba(0, 185, 0, 0.3)";
	message2.boxShadow = "2px 2px 3px black inset, 2px -2px 3px black inset";
	message3.background = "rgba(0, 125, 0, 0.3)";
	message3.boxShadow = "0px 2px 3px black inset, 0px -2px 3px black inset";
	message4.background = "rgba(0, 75, 0, 0.3)";
	message4.boxShadow = "2px 2px 3px black inset, 2px -2px 3px black inset";
};

function smallGreenTheme() {
	border1.background = "rgba(0,255,0,0.3)";
	border1.boxShadow = "0px 2px 3px lawngreen inset, 0px -2px 3px lawngreen inset";
	border3.background = "rgba(0,255,0,0.3)";
	border3.boxShadow = "0px 2px 3px lawngreen inset, 0px -2px 3px lawngreen inset";
	border4.background = "rgba(0,255,0,0.3)";
	border4.boxShadow = "0px 2px 3px lawngreen inset, 0px -2px 3px lawngreen inset";
	message1.background = "rgba(0, 255, 0, 0.3)";
	message1.boxShadow = "0px 2px 3px green inset, 0px -2px 3px green inset";
	message2.background = "rgba(0, 185, 0, 0.3)";
	message2.boxShadow = "2px 2px 3px green inset, 2px -2px 3px green inset";
	message3.background = "rgba(0, 125, 0, 0.3)";
	message3.boxShadow = "0px 2px 3px green inset, 0px -2px 3px green inset";
	message4.background = "rgba(0, 75, 0, 0.3)";
	message4.boxShadow = "2px 2px 3px green inset, 2px -2px 3px green inset";
	document.getElementById('cr1').style.color = "green";
	document.getElementById('cr2').style.color = "green";
};

function blueTheme() {
	document.getElementById('col_L').innerHTML = blueLightSaber;
	document.getElementById('col_R').innerHTML = blueLightSaber;
	document.getElementById('col_L').style.background = "black";
	document.getElementById('col_R').style.background = "black";
	document.getElementById('cr1').style.color = "blue";
	document.getElementById('cr2').style.color = "blue";
	border1.background = "rgba(0,0,255,0.5)";
	border1.boxShadow = "0px 2px 3px blue inset, 0px -2px 3px blue inset";
	border3.background = "rgba(0,0,255,0.5)";
	border3.boxShadow = "0px 2px 3px blue inset, 0px -2px 3px blue inset";
	border4.background = "rgba(0,0,255,0.5)";
	border4.boxShadow = "0px 2px 3px blue inset, 0px -2px 3px blue inset";
	message1.background = "rgba(0, 235, 255, 0.5)";
	message1.boxShadow = "2px 2px 3px deepskyblue inset, 0px -2px 3px deepskyblue inset";
	message2.background = "rgba(0, 200, 255, 0.5)";
	message2.boxShadow = "2px 2px 3px deepskyblue inset, 0px -2px 3px deepskyblue inset";
	message3.background = "rgba(0, 165, 255, 0.5)";
	message3.boxShadow = "2px 2px 3px deepskyblue inset, 0px -2px 3px deepskyblue inset";
	message4.background = "rgba(0, 125, 255, 0.5)";
	message4.boxShadow = "2px 2px 3px deepskyblue inset, 0px -2px 3px deepskyblue inset";
};

function smallBlueTheme() {
	border1.background = "rgba(0,0,255,0.5)";
	border1.boxShadow = "0px 2px 3px blue inset, 0px -2px 3px blue inset";
	border3.background = "rgba(0,0,255,0.5)";
	border3.boxShadow = "0px 2px 3px blue inset, 0px -2px 3px blue inset";
	border4.background = "rgba(0,0,255,0.5)";
	border4.boxShadow = "0px 2px 3px blue inset, 0px -2px 3px blue inset";
	message1.background = "rgba(0, 235, 255, 0.5)";
	message1.boxShadow = "2px 2px 3px deepskyblue inset, 0px -2px 3px deepskyblue inset";
	message2.background = "rgba(0, 200, 255, 0.5)";
	message2.boxShadow = "2px 2px 3px deepskyblue inset, 0px -2px 3px deepskyblue inset";
	message3.background = "rgba(0, 165, 255, 0.5)";
	message3.boxShadow = "2px 2px 3px deepskyblue inset, 0px -2px 3px deepskyblue inset";
	message4.background = "rgba(0, 125, 255, 0.5)";
	message4.boxShadow = "2px 2px 3px deepskyblue inset, 0px -2px 3px deepskyblue inset";
	document.getElementById('cr1').style.color = "blue";
	document.getElementById('cr2').style.color = "blue";
};

// GET RANDOM NUMBERS
var randomTheme = Math.floor(Math.random() * 12);

// GET WINDOW WIDTH
var width = window.innerWidth;

// SET PAGE COLOR THEME
setInterval(function(){ backgroundShift(); }, 1000);

function backgroundShift() {
	if (randomTheme < 5 && width > 1199) {
		redTheme();
		if (randomTheme < 12) {
			randomTheme += 1;
		} else if (randomTheme > 11) {
			randomTheme = Math.floor(Math.random() * 12);
		}
	} else if (randomTheme > 4 && randomTheme < 9 && width > 1199) {
		blueTheme();
		if (randomTheme < 12) {
			randomTheme += 1;
		} else if (randomTheme > 11) {
			randomTheme = Math.floor(Math.random() * 12);
		}
	} else if (randomTheme > 8 && width > 1199) {
		greenTheme();
		if (randomTheme < 12) {
			randomTheme += 1;
		} else if (randomTheme > 11) {
			randomTheme = Math.floor(Math.random() * 12);
		}
	} else if (randomTheme < 4 && width < 1200) {
		smallRedTheme();
		if (randomTheme < 12) {
			randomTheme += 1;
		} else if (randomTheme > 11) {
			randomTheme = Math.floor(Math.random() * 12);
		}
	} else if (randomTheme > 3 && randomTheme < 9 && width < 1200) {
		smallBlueTheme();
		if (randomTheme < 12) {
			randomTheme += 1;
		} else if (randomTheme > 11) {
			randomTheme = Math.floor(Math.random() * 12);
		}
	} else if (randomTheme > 8 && width < 1200) {
		smallGreenTheme();
		if (randomTheme < 12) {
			randomTheme += 1;
		} else if (randomTheme > 11) {
			randomTheme = Math.floor(Math.random() * 12);
		}
	}
};

 // ADD BACKGROUNDIMAGES TO SOCIAL MEDIA ICONS
document.getElementById("linkedin").style.backgroundImage= "url('img/social_icons/linkedin.png')";
document.getElementById("github").style.backgroundImage= "url('img/social_icons/github.png')";
document.getElementById("treehouse").style.backgroundImage= "url('img/social_icons/treehouse.png')";
document.getElementById("codepen").style.backgroundImage= "url('img/social_icons/codepen.png')";
document.getElementById("behance").style.backgroundImage= "url('img/social_icons/behance.png')";

// INDEX JS

/**
 * StyleFix 1.0.3 & PrefixFree 1.0.7
 * @author Lea Verou
 * MIT license
 */(function(){function t(e,t){return[].slice.call((t||document).querySelectorAll(e))}if(!window.addEventListener)return;var e=window.StyleFix={link:function(t){try{if(t.rel!=="stylesheet"||t.hasAttribute("data-noprefix"))return}catch(n){return}var r=t.href||t.getAttribute("data-href"),i=r.replace(/[^\/]+$/,""),s=(/^[a-z]{3,10}:/.exec(i)||[""])[0],o=(/^[a-z]{3,10}:\/\/[^\/]+/.exec(i)||[""])[0],u=/^([^?]*)\??/.exec(r)[1],a=t.parentNode,f=new XMLHttpRequest,l;f.onreadystatechange=function(){f.readyState===4&&l()};l=function(){var n=f.responseText;if(n&&t.parentNode&&(!f.status||f.status<400||f.status>600)){n=e.fix(n,!0,t);if(i){n=n.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(e,t,n){return/^([a-z]{3,10}:|#)/i.test(n)?e:/^\/\//.test(n)?'url("'+s+n+'")':/^\//.test(n)?'url("'+o+n+'")':/^\?/.test(n)?'url("'+u+n+'")':'url("'+i+n+'")'});var r=i.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1");n=n.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+r,"gi"),"$1")}var l=document.createElement("style");l.textContent=n;l.media=t.media;l.disabled=t.disabled;l.setAttribute("data-href",t.getAttribute("href"));a.insertBefore(l,t);a.removeChild(t);l.media=t.media}};try{f.open("GET",r);f.send(null)}catch(n){if(typeof XDomainRequest!="undefined"){f=new XDomainRequest;f.onerror=f.onprogress=function(){};f.onload=l;f.open("GET",r);f.send(null)}}t.setAttribute("data-inprogress","")},styleElement:function(t){if(t.hasAttribute("data-noprefix"))return;var n=t.disabled;t.textContent=e.fix(t.textContent,!0,t);t.disabled=n},styleAttribute:function(t){var n=t.getAttribute("style");n=e.fix(n,!1,t);t.setAttribute("style",n)},process:function(){t('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);t("style").forEach(StyleFix.styleElement);t("[style]").forEach(StyleFix.styleAttribute)},register:function(t,n){(e.fixers=e.fixers||[]).splice(n===undefined?e.fixers.length:n,0,t)},fix:function(t,n,r){for(var i=0;i<e.fixers.length;i++)t=e.fixers[i](t,n,r)||t;return t},camelCase:function(e){return e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()}).replace("-","")},deCamelCase:function(e){return e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()})}};(function(){setTimeout(function(){t('link[rel="stylesheet"]').forEach(StyleFix.link)},10);document.addEventListener("DOMContentLoaded",StyleFix.process,!1)})()})();(function(e){function t(e,t,r,i,s){e=n[e];if(e.length){var o=RegExp(t+"("+e.join("|")+")"+r,"gi");s=s.replace(o,i)}return s}if(!window.StyleFix||!window.getComputedStyle)return;var n=window.PrefixFree={prefixCSS:function(e,r,i){var s=n.prefix;n.functions.indexOf("linear-gradient")>-1&&(e=e.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig,function(e,t,n,r){return t+(n||"")+"linear-gradient("+(90-r)+"deg"}));e=t("functions","(\\s|:|,)","\\s*\\(","$1"+s+"$2(",e);e=t("keywords","(\\s|:)","(\\s|;|\\}|$)","$1"+s+"$2$3",e);e=t("properties","(^|\\{|\\s|;)","\\s*:","$1"+s+"$2:",e);if(n.properties.length){var o=RegExp("\\b("+n.properties.join("|")+")(?!:)","gi");e=t("valueProperties","\\b",":(.+?);",function(e){return e.replace(o,s+"$1")},e)}if(r){e=t("selectors","","\\b",n.prefixSelector,e);e=t("atrules","@","\\b","@"+s+"$1",e)}e=e.replace(RegExp("-"+s,"g"),"-");e=e.replace(/-\*-(?=[a-z]+)/gi,n.prefix);return e},property:function(e){return(n.properties.indexOf(e)>=0?n.prefix:"")+e},value:function(e,r){e=t("functions","(^|\\s|,)","\\s*\\(","$1"+n.prefix+"$2(",e);e=t("keywords","(^|\\s)","(\\s|$)","$1"+n.prefix+"$2$3",e);n.valueProperties.indexOf(r)>=0&&(e=t("properties","(^|\\s|,)","($|\\s|,)","$1"+n.prefix+"$2$3",e));return e},prefixSelector:function(e){return e.replace(/^:{1,2}/,function(e){return e+n.prefix})},prefixProperty:function(e,t){var r=n.prefix+e;return t?StyleFix.camelCase(r):r}};(function(){var e={},t=[],r={},i=getComputedStyle(document.documentElement,null),s=document.createElement("div").style,o=function(n){if(n.charAt(0)==="-"){t.push(n);var r=n.split("-"),i=r[1];e[i]=++e[i]||1;while(r.length>3){r.pop();var s=r.join("-");u(s)&&t.indexOf(s)===-1&&t.push(s)}}},u=function(e){return StyleFix.camelCase(e)in s};if(i.length>0)for(var a=0;a<i.length;a++)o(i[a]);else for(var f in i)o(StyleFix.deCamelCase(f));var l={uses:0};for(var c in e){var h=e[c];l.uses<h&&(l={prefix:c,uses:h})}n.prefix="-"+l.prefix+"-";n.Prefix=StyleFix.camelCase(n.prefix);n.properties=[];for(var a=0;a<t.length;a++){var f=t[a];if(f.indexOf(n.prefix)===0){var p=f.slice(n.prefix.length);u(p)||n.properties.push(p)}}n.Prefix=="Ms"&&!("transform"in s)&&!("MsTransform"in s)&&"msTransform"in s&&n.properties.push("transform","transform-origin");n.properties.sort()})();(function(){function i(e,t){r[t]="";r[t]=e;return!!r[t]}var e={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"}};e["repeating-linear-gradient"]=e["repeating-radial-gradient"]=e["radial-gradient"]=e["linear-gradient"];var t={initial:"color","zoom-in":"cursor","zoom-out":"cursor",box:"display",flexbox:"display","inline-flexbox":"display",flex:"display","inline-flex":"display",grid:"display","inline-grid":"display","min-content":"width"};n.functions=[];n.keywords=[];var r=document.createElement("div").style;for(var s in e){var o=e[s],u=o.property,a=s+"("+o.params+")";!i(a,u)&&i(n.prefix+a,u)&&n.functions.push(s)}for(var f in t){var u=t[f];!i(f,u)&&i(n.prefix+f,u)&&n.keywords.push(f)}})();(function(){function s(e){i.textContent=e+"{}";return!!i.sheet.cssRules.length}var t={":read-only":null,":read-write":null,":any-link":null,"::selection":null},r={keyframes:"name",viewport:null,document:'regexp(".")'};n.selectors=[];n.atrules=[];var i=e.appendChild(document.createElement("style"));for(var o in t){var u=o+(t[o]?"("+t[o]+")":"");!s(u)&&s(n.prefixSelector(u))&&n.selectors.push(o)}for(var a in r){var u=a+" "+(r[a]||"");!s("@"+u)&&s("@"+n.prefix+u)&&n.atrules.push(a)}e.removeChild(i)})();n.valueProperties=["transition","transition-property"];e.className+=" "+n.prefix;StyleFix.register(n.prefixCSS)})(document.documentElement);

// ARRAYS
var quotes = ['<p class=\"quote\">&ldquo;The bad news is you&rsquo;re falling through the air&#44; nothing to hang on to&#44; no parachute.  The good news is there&rsquo;s no ground.&rdquo;</p><p class=\"quoted\">Chogyam Trungpa Rinpoche</p>', '<p class=\"quote\">&ldquo;Only a life lived for others is a life worthwhile.&rdquo;</p><p class=\"quoted\">Albert Einstein</p>', '<p class=\"quote\">&ldquo;True knowledge exists in knowing that you know nothing.&rdquo;</p><p class=\"quoted\">Socrates</p>', '<p class=\"quote\">&ldquo;When you rise in the morning&#44 give thanks for the light&#44 for your life&#44 for your strength.  Give thanks for your food and for the joy of living.  If you see no reason to give thanks&#44 the fault lies in yourself.&rdquo;</p><p class=\"quoted\">Tecumseh</p>', '<p class=\"quote\">&ldquo;True happiness is to enjoy the present&#44 without anxious dependence upon the future, not to amuse ourselves with either hopes or fears&#44 but to rest satisfied with what we have&#44 which is sufficient&#44 for he that is so&#44 wants nothing.  The greatest blessings of mankind are within us and within our reach.  A wise man is content with his lot&#44 whatever it may be&#44 without wishing for what he has not.&rdquo;</p><p class=\"quoted\">Seneca</p>', '<p class=\"quote\">&ldquo;It takes as much energy to wish as it does to plan.&rdquo;</p><p class=\"quoted\">Eleanor Roosevelt</p>', '<p class=\"quote\">&ldquo;I long to accomplish a great and noble task&#44 but it is my chief duty to accomplish humble tasks as though they were great and noble. The world is moved along&#44 not only by the mighty shoves of its heroes&#44 but also by the aggregate of the tiny pushes of each honest worker.&rdquo;</p><p class=\"quoted\">Helen Keller</p>', '<p class=\"quote\">&ldquo;It&rsquo;s hard to beat a person who never gives up.&rdquo;</p><p class=\"quoted\">Babe Ruth</p>', '<p class=\"quote\">&ldquo;Kindness is the language which the deaf can hear and the blind can see.&rdquo;</p><p class=\"quoted\">Mark Twain</p>', '<p class=\"quote\">&ldquo;The people who are trying to make the world worse never take a day off&#44 why should I. Light up the darkness.&rdquo;</p><p class=\"quoted\">Bob Marley</p>', '<p class=\"quote\">&ldquo;And those who were seen dancing were thought to be insane by those who could not hear the music.&rdquo;</p><p class=\"quoted\">Friedrich Nietzsche</p>', '<p class=\"quote\">&ldquo;The gift of learning to meditate is the greatest gift you can give yourself in this lifetime.&rdquo;</p><p class=\"quoted\">Sogyal Rinpoche</p>', '<p class=\"quote\">&ldquo;By three methods we may learn wisdom. First&#44 by reflection&#44 which is noblest.  Second&#44 by imitation&#44 which is easiest.  And third&#44 by experience&#44 which is the bitterest.&rdquo;</p><p class=\"quoted\">Confucious</p>', '<p class=\"quote\">&ldquo;The unexamined life is not worth living.&rdquo;</p><p class=\"quoted\">Socrates</p>', '<p class=\"quote\">&ldquo;Like water which can clearly mirror the sky and the trees only so long as its surface is undisturbed&#44 the mind can only reflect the true image of the self when it is tranquil and wholly relaxed.&rdquo;</p><p class=\"quoted\">Indra Devi</p>', '<p class=\"quote\">&ldquo;Watch your thoughts&#44 they become words. Watch your words&#44 they become actions.  Watch your actions&#44 they become habits. Watch your habits&#44 they become character.  Watch your character&#44 it becomes your destiny.&rdquo;</p><p class=\"quoted\">Lao Tzu</p>', '<p class=\"quote\">&ldquo;...The smallest sprout shows that there is really no death&#44 and if ever there was&#44 it led forward life&#44 and does not wait at the end to arrest it&#44 and ceas&rsquo;d the moment life appear&rsquo;d.  All goes onward and outward&#44 nothing collapses&#44 and to die is different from what anyone supposed&#44 and luckier.&rdquo;</p><p class=\"quoted\">Walt Whitman</p>', '<p class=\"quote\">&ldquo;The world is a dangerous place to live&#44 not because of the people who are evil&#44 but because of the people who don&rsquo;t do anything about it.&rdquo;</p><p class=\"quoted\">Albert Einstein</p>', '<p class=\"quote\">&ldquo;At the end of the day&#44 people won&rsquo;t remember what you said or did&#44 they will remember how you made them feel.&rdquo;</p><p class=\"quoted\">Maya Angelou</p>', '<p class=\"quote\">&ldquo;Life is a series of natural and spontaneous changes.  Don&rsquo;t resist them &mdash; that only creates sorrow.  Let reality be reality.  Let things flow naturally forward in whatever way they like.&rdquo;</p><p class=\"quoted\">Lao Tzu</p>'];

var haveYou = ['said thank you to anyone', 'made a list of the things you want to do', 'worked on something', 'exercised at least a little', 'learned anything', 'done a good deed', 'had at least a little fun', 'taken the time to relax', 'taken the time to reflect on your life&#44 how you are living it&#44 and what you might like to do differently', 'admitted your mistakes so that you may learn from them'];

var affirmative = ['<p>Awesome!</p>', '<p>Well done!</p>', '<p>Way to go!</p>', '<p>Nice Work!</p>', '<p>Keep up the good work!</p>'];

// COLOR THEMES
var coloredBlocks = '<div class="blocks"><div class="red top right"></div><div class="red top left"></div><div class="red bottom right"></div><div class="red bottom left"></div><div class="purple top"></div><div class="purpleSides right"></div><div class="purple bottom"></div><div class="purpleSides left"></div><div class="orange or_right or_first"></div><div class="orange or_left or_second"></div><div class="orange or_right or_third"></div><div class="orange or_left or_fourth"></div><div class="yellow y_left y_first"></div><div class="yellow y_right y_second"></div><div class="yellow y_left y_third"></div><div class="yellow y_right y_fourth"></div></div>';

var blueLightSaber = '<div class="innerColumn"></div>';
var greenEyes = '<div class="greenEyes"><div class="greenEyesPupil"></div></div>';

// BRIGHT BORDERS AND MISSION STATEMENT MESAGES
var border1 = document.getElementById("border_1").style;
var border3 = document.getElementById("border_3").style;
var border4 = document.getElementById("border_4").style;
var message1 = document.getElementById("message_1").style;
var message2 = document.getElementById("message_2").style;
var message3 = document.getElementById("message_3").style;
var message4 = document.getElementById("message_4").style;

function redTheme() {
	document.getElementById('col_L').innerHTML = coloredBlocks;
	document.getElementById('col_R').innerHTML = coloredBlocks;
	document.getElementById('col_L').style.background = "black";
	document.getElementById('col_R').style.background = "black";
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

function greenTheme() {
	document.getElementById('col_L').innerHTML = greenEyes;
	document.getElementById('col_R').innerHTML = greenEyes;
	document.getElementById('col_L').style.background = "linear-gradient(black, darkgreen, green, white, lightgreen, lightgreen, lightgreen, white)";
	document.getElementById('col_R').style.background = "linear-gradient(black, darkgreen, green, white, lightgreen, lightgreen, lightgreen, white)";
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

function blueTheme() {
	document.getElementById('col_L').innerHTML = blueLightSaber;
	document.getElementById('col_R').innerHTML = blueLightSaber;
	document.getElementById('col_L').style.background = "black";
	document.getElementById('col_R').style.background = "black";
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

// GET RANDOM NUMBERS
var randomQuotes = Math.floor(Math.random() * quotes.length);
var i = randomQuotes;

var randomHaveYou = Math.floor(Math.random() * haveYou.length);
var ii = randomHaveYou;

var randomAffirmative = Math.floor(Math.random() * affirmative.length);
var iii = randomAffirmative;

var randomTheme = Math.floor(Math.random() * 12);

// alert(window.innerWidth);

// USE RANDOM NUMBERS
document.getElementById('quoteDiv').innerHTML = quotes[i];
document.getElementById('haveYouDiv').innerHTML = "<p>No pressure.<br>No  judgement.<br>Just looking out for your life.<br>Have you " + haveYou[ii] + " today?</p>";

var width = window.innerWidth;

if (randomTheme < 4 && width > 1199) {
	redTheme();
} else if (randomTheme > 3 && randomTheme < 9 && width > 1199) {
	blueTheme();
} else if (randomTheme > 8 && width > 1199) {
	greenTheme();
}

// INITIAL BUTTON STATES
document.getElementById('yes').disabled = false;
document.getElementById('no').disabled = false;

// BUTTONS
function yes() {
	document.getElementById('haveYouDiv').innerHTML = affirmative[iii];
	document.getElementById('yes').disabled = true;
	document.getElementById('no').disabled = true;
};

function no() {
	document.getElementById('haveYouDiv').innerHTML = "<p>It&rsquo;s okay.  Don&rsquo;t feel bad.  Just try again tomorrow.  And hopefully you will have a wonderful day.</p>";
	document.getElementById('yes').disabled = true;
	document.getElementById('no').disabled = true;
};
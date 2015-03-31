// DECIDER JS

/**
 * StyleFix 1.0.3 & PrefixFree 1.0.7
 * @author Lea Verou
 * MIT license
 */(function(){function t(e,t){return[].slice.call((t||document).querySelectorAll(e))}if(!window.addEventListener)return;var e=window.StyleFix={link:function(t){try{if(t.rel!=="stylesheet"||t.hasAttribute("data-noprefix"))return}catch(n){return}var r=t.href||t.getAttribute("data-href"),i=r.replace(/[^\/]+$/,""),s=(/^[a-z]{3,10}:/.exec(i)||[""])[0],o=(/^[a-z]{3,10}:\/\/[^\/]+/.exec(i)||[""])[0],u=/^([^?]*)\??/.exec(r)[1],a=t.parentNode,f=new XMLHttpRequest,l;f.onreadystatechange=function(){f.readyState===4&&l()};l=function(){var n=f.responseText;if(n&&t.parentNode&&(!f.status||f.status<400||f.status>600)){n=e.fix(n,!0,t);if(i){n=n.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(e,t,n){return/^([a-z]{3,10}:|#)/i.test(n)?e:/^\/\//.test(n)?'url("'+s+n+'")':/^\//.test(n)?'url("'+o+n+'")':/^\?/.test(n)?'url("'+u+n+'")':'url("'+i+n+'")'});var r=i.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1");n=n.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+r,"gi"),"$1")}var l=document.createElement("style");l.textContent=n;l.media=t.media;l.disabled=t.disabled;l.setAttribute("data-href",t.getAttribute("href"));a.insertBefore(l,t);a.removeChild(t);l.media=t.media}};try{f.open("GET",r);f.send(null)}catch(n){if(typeof XDomainRequest!="undefined"){f=new XDomainRequest;f.onerror=f.onprogress=function(){};f.onload=l;f.open("GET",r);f.send(null)}}t.setAttribute("data-inprogress","")},styleElement:function(t){if(t.hasAttribute("data-noprefix"))return;var n=t.disabled;t.textContent=e.fix(t.textContent,!0,t);t.disabled=n},styleAttribute:function(t){var n=t.getAttribute("style");n=e.fix(n,!1,t);t.setAttribute("style",n)},process:function(){t('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);t("style").forEach(StyleFix.styleElement);t("[style]").forEach(StyleFix.styleAttribute)},register:function(t,n){(e.fixers=e.fixers||[]).splice(n===undefined?e.fixers.length:n,0,t)},fix:function(t,n,r){for(var i=0;i<e.fixers.length;i++)t=e.fixers[i](t,n,r)||t;return t},camelCase:function(e){return e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()}).replace("-","")},deCamelCase:function(e){return e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()})}};(function(){setTimeout(function(){t('link[rel="stylesheet"]').forEach(StyleFix.link)},10);document.addEventListener("DOMContentLoaded",StyleFix.process,!1)})()})();(function(e){function t(e,t,r,i,s){e=n[e];if(e.length){var o=RegExp(t+"("+e.join("|")+")"+r,"gi");s=s.replace(o,i)}return s}if(!window.StyleFix||!window.getComputedStyle)return;var n=window.PrefixFree={prefixCSS:function(e,r,i){var s=n.prefix;n.functions.indexOf("linear-gradient")>-1&&(e=e.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig,function(e,t,n,r){return t+(n||"")+"linear-gradient("+(90-r)+"deg"}));e=t("functions","(\\s|:|,)","\\s*\\(","$1"+s+"$2(",e);e=t("keywords","(\\s|:)","(\\s|;|\\}|$)","$1"+s+"$2$3",e);e=t("properties","(^|\\{|\\s|;)","\\s*:","$1"+s+"$2:",e);if(n.properties.length){var o=RegExp("\\b("+n.properties.join("|")+")(?!:)","gi");e=t("valueProperties","\\b",":(.+?);",function(e){return e.replace(o,s+"$1")},e)}if(r){e=t("selectors","","\\b",n.prefixSelector,e);e=t("atrules","@","\\b","@"+s+"$1",e)}e=e.replace(RegExp("-"+s,"g"),"-");e=e.replace(/-\*-(?=[a-z]+)/gi,n.prefix);return e},property:function(e){return(n.properties.indexOf(e)>=0?n.prefix:"")+e},value:function(e,r){e=t("functions","(^|\\s|,)","\\s*\\(","$1"+n.prefix+"$2(",e);e=t("keywords","(^|\\s)","(\\s|$)","$1"+n.prefix+"$2$3",e);n.valueProperties.indexOf(r)>=0&&(e=t("properties","(^|\\s|,)","($|\\s|,)","$1"+n.prefix+"$2$3",e));return e},prefixSelector:function(e){return e.replace(/^:{1,2}/,function(e){return e+n.prefix})},prefixProperty:function(e,t){var r=n.prefix+e;return t?StyleFix.camelCase(r):r}};(function(){var e={},t=[],r={},i=getComputedStyle(document.documentElement,null),s=document.createElement("div").style,o=function(n){if(n.charAt(0)==="-"){t.push(n);var r=n.split("-"),i=r[1];e[i]=++e[i]||1;while(r.length>3){r.pop();var s=r.join("-");u(s)&&t.indexOf(s)===-1&&t.push(s)}}},u=function(e){return StyleFix.camelCase(e)in s};if(i.length>0)for(var a=0;a<i.length;a++)o(i[a]);else for(var f in i)o(StyleFix.deCamelCase(f));var l={uses:0};for(var c in e){var h=e[c];l.uses<h&&(l={prefix:c,uses:h})}n.prefix="-"+l.prefix+"-";n.Prefix=StyleFix.camelCase(n.prefix);n.properties=[];for(var a=0;a<t.length;a++){var f=t[a];if(f.indexOf(n.prefix)===0){var p=f.slice(n.prefix.length);u(p)||n.properties.push(p)}}n.Prefix=="Ms"&&!("transform"in s)&&!("MsTransform"in s)&&"msTransform"in s&&n.properties.push("transform","transform-origin");n.properties.sort()})();(function(){function i(e,t){r[t]="";r[t]=e;return!!r[t]}var e={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"}};e["repeating-linear-gradient"]=e["repeating-radial-gradient"]=e["radial-gradient"]=e["linear-gradient"];var t={initial:"color","zoom-in":"cursor","zoom-out":"cursor",box:"display",flexbox:"display","inline-flexbox":"display",flex:"display","inline-flex":"display",grid:"display","inline-grid":"display","min-content":"width"};n.functions=[];n.keywords=[];var r=document.createElement("div").style;for(var s in e){var o=e[s],u=o.property,a=s+"("+o.params+")";!i(a,u)&&i(n.prefix+a,u)&&n.functions.push(s)}for(var f in t){var u=t[f];!i(f,u)&&i(n.prefix+f,u)&&n.keywords.push(f)}})();(function(){function s(e){i.textContent=e+"{}";return!!i.sheet.cssRules.length}var t={":read-only":null,":read-write":null,":any-link":null,"::selection":null},r={keyframes:"name",viewport:null,document:'regexp(".")'};n.selectors=[];n.atrules=[];var i=e.appendChild(document.createElement("style"));for(var o in t){var u=o+(t[o]?"("+t[o]+")":"");!s(u)&&s(n.prefixSelector(u))&&n.selectors.push(o)}for(var a in r){var u=a+" "+(r[a]||"");!s("@"+u)&&s("@"+n.prefix+u)&&n.atrules.push(a)}e.removeChild(i)})();n.valueProperties=["transition","transition-property"];e.className+=" "+n.prefix;StyleFix.register(n.prefixCSS)})(document.documentElement);

var score = 0;
var counter = 0;
var scoreMessage = "";

// 5 QUESTIONS
var question1 = "<p>Overall, will it have a positive or negative effect on you?</p>";
var question2 = "<p>Overall, will it have a positive or negative effect on others?</p>";
var question3 = "<p>What effect will it have on the great effort to make the world a safer, easier, and more enjoyable place to live for all?</p>";
var question4 = "<p>What effect would it have on the way caring people might feel about you?</p>";
var question5 = "<p>What effect do you think it would have on the way your future self might think about your current self?</p>";

// SET CONTENT OF COMMENT DIV
function commentPrint(commentMessage) {
	var comment = document.getElementById("comment");
	comment.innerHTML = commentMessage;
};

// SET CONTENT OF QUESTION DIV
function questionPrint(questionMessage) {
	var question = document.getElementById("question");
	question.innerHTML = questionMessage;
};

// OPENING COMMENT
function opener() {
	commentPrint("<h2>WELCOME</h2><p>If you're ready, click the <b>\"Initialize\"</b> button <b>&uarr;</b>above<b>&uarr;</b> to begin.</p>");
};
opener();

// INSTRUCTIONS
var howToProceed = function() {
	questionPrint("<p>Click the <b>\"Continue\"</b> button <b>&darr;</b>below<b>&darr;</b> to see the first of five questions that are designed to reveal if a thing should be done, or better left undone.</p>");
	commentPrint("<h3><b>&darr;</b> Instructions <b>&darr;</b></h3><ul id=\"instructionList\"><li>1. Think of something you are considering doing.</li><li>2. Now, try to clear your mind of all your opinions.</li><li>3. Try to be completely objective in your thinking.</li><li>4. And when answering the questions below, try to be brutally honest.</li></ul><p id=\"goodLuck\">&#9786; Good Luck! &#9786;</p>");
};

// SET BUTTON STATES
function beginButtonOff(state) {
	var beginButton = document.getElementById("beginButton");
	beginButton.disabled = state;
};

function continueButtonOff(state) {
	var continueButton = document.getElementById("continueButton");
	continueButton.disabled = (state)
};

function affirmativeButtonOff(state) {
	var affirmativeButton = document.getElementById("affirmativeButton");
	affirmativeButton.disabled = (state);
};

function negativeButtonOff(state) {
	var negativeButton = document.getElementById("negativeButton");
	negativeButton.disabled = (state);
};

function neitherButtonOff(state) {
	var neitherButton = document.getElementById("neitherButton");
	neitherButton.disabled = (state);
};

// INITIAL STATE SETTINGS
redLinePos("left: 50%");
beginButtonOff(false);
continueButtonOff(true);
affirmativeButtonOff(true);
negativeButtonOff(true);
neitherButtonOff(true);

// BEGIN BUTTON
function begin() {
	continueButtonOff(false);
	beginButtonOff(true);
	howToProceed();
};

// SET POSITION OF RED LINE ON SCALE
function redLinePos(position) {
	var redLine = document.getElementById("redLine");
	redLine.style = position;
};

// MATCHES SCORE AND RED LINE POSITION
function redSlider() {
	if (score > 9) {
		redLinePos("left: 5%");
	} else if (score === 8) {
		redLinePos("left: 10%");
	} else if (score === 6) {
		redLinePos("left: 20%");
	} else if (score === 4) {
		redLinePos("left: 30%");
	} else if (score === 2) {
		redLinePos("left: 40%");
	} else if (score === 0) {
		redLinePos("left: 50%");
	} else if (score === -2) {
		dredLinePos("left: 60%");
	} else if (score === -4) {
		redLinePos("left: 70%");
	} else if (score === -6) {
		redLinePos("left: 80%");
	} else if (score === -8) {
		redLinePos("left: 90%");
	} else if (score < -9) {
		redLinePos("left: 95%");
	}
};

// POSITIVE BUTTON
function affirmative() {
	continueButtonOff(false);
	negativeButtonOff(true);
	neitherButtonOff(true);
	affirmativeButtonOff(true);
	score += 2;
	redSlider();
	// COMMENT AND PROMPT
	if (score > 0  && score < 6) {
		commentPrint("<p>It's looking good.<br><br><br>Click <b>\"Continue\"</b></p>");
	} else if ( score > 5) {
		commentPrint("<p>This one's looking really good.<br><br><br>Click <b>\"Continue\"</b></p>");
	} else if (score < 1 && score > -3) {
		commentPrint("<p>This one might be making a turn for the better.<br><br><br>Click <b>\"Continue\"</b></p>");
	} else if (score < -2) {
		commentPrint("<p>This one might be a lost cause.<br><br><br>Click <b>\"Continue\"</b></p>");
	}
};

// NEGATIVE BUTTON
function negative() {
	continueButtonOff(false);
	affirmativeButtonOff(true);
	negativeButtonOff(true);
	neitherButtonOff(true);
	score -= 2;
	redSlider();
	// COMMENT AND PROMPT
	if (score > 0  && score < 6) {
		commentPrint("<p>This one might be making a turn for the worse.<br><br><br>Click <b>\"Continue\"</b></p>");
	} else if ( score > 5) {
		commentPrint("<p>This one still might be a good idea.<br><br><br>Click <b>\"Continue\"</b></p>");
	} else if (score < 1 && score > -3) {
		commentPrint("<p>It's not looking so good.<br><br><br>Click <b>\"Continue\"</b></p>");
	} else if (score < -2) {
		commentPrint("<p>This one is probably a lost cause.<br><br><br>Click <b>\"Continue\"</b></p>");
	}
};

// NEITHER BUTTON
function neither() {
	continueButtonOff(false);
	affirmativeButtonOff(true);
	negativeButtonOff(true);
	neitherButtonOff(true);
	commentPrint("<p>No effect isn't necessarily a bad thing, but it could be.<br><br><br>Click <b>\"Continue\"</b></p>");
}

// NEXT QUESTION BUTTON
function continueBtn() {
	affirmativeButtonOff(false);
	negativeButtonOff(false);
	neitherButtonOff(false);
	continueButtonOff(true);
	counter += 1;
	var questionsAnswered = counter - 1;
	commentPrint("<p><br>Current score = " + score + "<br><br>Questions answered = " + questionsAnswered + " of 5</p>");
	// DISPLAY QUESTIONS
	if (counter === 1) {
		questionPrint(question1);
	} else if (counter === 2) {
		questionPrint(question2);
	} else if (counter === 3) {
		questionPrint(question3);
	} else if (counter === 4) {
		questionPrint(question4);
	} else if (counter === 5) {
		questionPrint(question5);
	} else if (counter === 6) {
		questionPrint("");
		if (score < -3) {
			// SETS RESULTS
			scoreMessage += "is a total piece of garbage";
		} else if (score > -4 && score < 1) {
			scoreMessage += "reeks of potential problems";
		} else if (score > 0 && score < 3) {
			scoreMessage += "isn't anything special";
		} else if (score > 2 && score < 8) {
			scoreMessage += "is probably a win";
		} else if (score > 7) {
			scoreMessage += "is a real gem";
		}
		affirmativeButtonOff(true);
		negativeButtonOff(true);
		neitherButtonOff(true);
		commentPrint("<p><b>All done</b>.<br><br>You scored a " + score + ", which " + scoreMessage + " on the scale of good ideas.</p>");
		questionPrint("<p>If you have another question, let's go again.</p><br><button type=button\" onclick=\"reset()\"> Reset </button>");
	}
};

// RESET BUTTON
function reset() {
	opener();
	questionPrint("<div id=\"nightRider\"></div>");
	redLinePos("left: 50%");
	beginButtonOff(false);
	score = 0;
	counter = 0;
	scoreMessage = "";
};

// ADD BACKGROUNDIMAGES TO SOCIAL MEDIA ICONS
document.getElementById("linkedin").style.backgroundImage= "url('img/social_icons/linkedin.png')";
document.getElementById("github").style.backgroundImage= "url('img/social_icons/github.png')";
document.getElementById("treehouse").style.backgroundImage= "url('img/social_icons/treehouse.png')";
document.getElementById("codepen").style.backgroundImage= "url('img/social_icons/codepen.png')";
document.getElementById("behance").style.backgroundImage= "url('img/social_icons/behance.png')";

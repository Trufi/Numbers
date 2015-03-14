!function e(t,i,n){function s(o,a){if(!i[o]){if(!t[o]){var c="function"==typeof require&&require;if(!a&&c)return c(o,!0);if(l)return l(o,!0);var h=new Error("Cannot find module '"+o+"'");throw h.code="MODULE_NOT_FOUND",h}var r=i[o]={exports:{}};t[o][0].call(r.exports,function(e){var i=t[o][1][e];return s(i?i:e)},r,r.exports,e,t,i,n)}return i[o].exports}for(var l="function"==typeof require&&require,o=0;o<n.length;o++)s(n[o]);return s}({1:[function(e){var t=e("./state.js"),i=e("./util.js");i.isMobile||i.addClass(document.body,"no-touch");var n=document.getElementById("game"),s=new t;n.appendChild(s.element),s.runMainMenu()},{"./state.js":14,"./util.js":15}],2:[function(e,t){function i(e,t,i){this.id=++o,this.field=i,this.config=i.config,this.x=e,this.y=t,this.value=null,this.element=null,this.width=500/this.config.field.size[0],this.height=500/this.config.field.size[1],this._setRandomValue(),this._createElement(),this._bindEvents()}var n=e("./colors.js"),s=e("../util.js"),l=[1,2,3,5,7,11,13],o=0,a={};i.prototype._createElement=function(){var e=document.createElement("div");e.className="block",e.style.left=Math.floor(this.x*this.width)+"px",e.style.bottom=Math.floor(this.y*this.height)+"px";var t=document.createElement("div");t.className="block__inner",t.innerHTML=this.value,e.appendChild(t);var i=document.createElement("div");i.className="block__active",e.appendChild(i),this.innerElement=t,this.activeElement=i,this.element=e,this._updateColors()},i.prototype._setRandomValue=function(){var e=0,t=this.config.numbers.possibleValues;t.forEach(function(t){e+=t[1]});for(var i=0,n=t.map(function(t){var n=t[1]/e+i;return i=n,n}),s=Math.random(),l=0,o=0;o<n.length;o++)if(s<=n[o]){l=t[o][0];break}this.value=l},i.prototype._bindEvents=function(){s.isMobile?s.on(this.element,"touchstart",this._mouseDownHandler.bind(this)):(s.on(this.element,"mousedown",this._mouseDownHandler.bind(this)),s.on(this.activeElement,"mouseover",this._mouseOverHandler.bind(this)))},i.prototype._mouseDownHandler=function(e){e.preventDefault(),this.field.blockMouseDown(this.id)},i.prototype._mouseOverHandler=function(){this.field.blockMouseOver(this.id)},i.prototype._mouseOutHandler=function(){this.field.blockMouseOut(this.id)},i.prototype.changePosition=function(e,t){this.x=e,this.y=t,this.element.style.left=Math.floor(e*this.width)+"px",this.element.style.bottom=Math.floor(t*this.height)+"px"},i.prototype._updateColors=function(){if(!a[this.value]){var e,t=[];for(e=l.length-1;e>0;e--)this.value%l[e]===0&&t.push({value:l[e],rgb:n[e].rgb,ratio:this.value/l[e]});var i;i=t.length?s.rgbSum(t):n[0].rgb,a[this.value]="rgb("+i.join(",")+")"}this.innerElement.style.backgroundColor=a[this.value]},i.prototype.changeValue=function(e){this.value=e,this.innerElement.innerHTML=e,this._updateColors()},i.prototype.select=function(){s.addClass(this.element,"_selected")},i.prototype.unselect=function(){s.removeClass(this.element,"_selected")},i.prototype.animateCreate=function(){var e=this;s.addClass(this.element,"_blink"),setTimeout(function(){s.removeClass(e.element,"_blink")},0)},t.exports=i},{"../util.js":15,"./colors.js":3}],3:[function(e,t){t.exports=[{web:"#99b433",rgb:[154,180,51]},{web:"#DA532C",rgb:[218,83,44]},{web:"#1e7145",rgb:[30,113,69]},{web:"#2C89A0",rgb:[44,137,160]},{web:"#00AA88",rgb:[0,170,136]},{web:"#00d455",rgb:[0,212,85]},{web:"#ff2a2a",rgb:[255,42,42]},{web:"#CB5000",rgb:[203,80,0]}]},{}],4:[function(e,t){function i(e){this.game=e,this.config=e.store,this.blocks={},this._blocksXY={},this.size=this.config.field.size,this.selectedBlocks=[],this.selectedMode=!1,this.element=null,this._init(),this._createElement(),this._bindEvents()}var n=e("./block.js"),s=e("../util"),l=e("../gameConfig");i.prototype._init=function(){for(var e=0;e<this.size[0];e++){this._blocksXY[e]={};for(var t=0;t<this.size[1];t++)this.createBlock(e,t,!0)}},i.prototype.createBlock=function(e,t,i){var s=new n(e,t,this);this.blocks[s.id]=s,this._blocksXY[e][t]=s.id,i||(this.element.appendChild(s.element),s.animateCreate())},i.prototype._createElement=function(){var e=document.createDocumentFragment();this.canvas=document.createElement("canvas"),this.canvas.className="field__canvas",this.ctx=this.canvas.getContext("2d"),this.canvas.width=l.field.width,this.canvas.height=l.field.height,e.appendChild(this.canvas),s.forEach(this.blocks,function(t){e.appendChild(t.element)}),this.element=document.createElement("div"),this.element.className="field _width_"+this.size[0]+" _height_"+this.size[1],this.element.appendChild(e)},i.prototype._bindEvents=function(){s.isMobile?(s.on(document.body,"touchend",this._mouseUpHandler.bind(this)),s.on(document.body,"touchmove",this._touchMoveHandler.bind(this))):s.on(document.body,"mouseup",this._mouseUpHandler.bind(this))},i.prototype._touchMoveHandler=function(e){var t,i,n,s,l,o,a,c=this.blocks;for(o=0;o<e.changedTouches.length;o++)if(s=e.changedTouches[o],l=document.elementFromPoint(s.clientX,s.clientY),l&&-1!=l.className.indexOf("block__active")){for(n=Object.keys(c),a=0;a<n.length;a++)if(i=c[n[a]],i.activeElement===l){this.blockMouseOver(i.id),t=!0;break}if(t)break}},i.prototype._mouseUpHandler=function(){this.selectedMode&&(this.selectedMode=!1,this._runSelected(),s.forEach(this.blocks,function(e){e.unselect()}),this.game.updateChainSum(),this._clearPath())},i.prototype.blockMouseDown=function(e){this.selectedMode=!0,this.selectedBlocks=[e],this.blocks[e].select(),this.game.updateChainSum()},i.prototype._checkWithLast=function(e){var t=this.blocks[this.selectedBlocks[this.selectedBlocks.length-1]],i=this.blocks[e];return t.value==i.value&&Math.abs(t.x-i.x)<=1&&Math.abs(t.y-i.y)<=1},i.prototype.blockMouseOver=function(e){if(this.selectedMode){var t=this.selectedBlocks;if(-1==t.indexOf(e))this._checkWithLast(e)&&(t.push(e),this.blocks[e].select(),this.game.updateChainSum(),this._updatePath());else if(t[t.length-2]==e){var i=t.pop();this.blocks[i].unselect(),this.game.updateChainSum(),this._updatePath()}}},i.prototype._updatePath=function(){var e=this.ctx,t=l.field.height;this._clearPath(),e.beginPath(),e.strokeStyle=l.path.color,e.lineWidth=l.path.width,this.selectedBlocks.forEach(function(i,n){var s=this.blocks[i],l=(s.x+.5)*s.width,o=t-(s.y+.5)*s.height;0===n?e.moveTo(l,o):e.lineTo(l,o)},this),e.stroke()},i.prototype._clearPath=function(){this.ctx.clearRect(0,0,l.field.width,l.field.height)},i.prototype.blockMouseOut=function(){},i.prototype._blockRemove=function(e){var t=this.blocks[e];this.element.removeChild(t.element),this._blocksXY[t.x][t.y]=null,delete this.blocks[e]},i.prototype._runSelected=function(){if(!(this.selectedBlocks.length<this.config.chain.minLength)){this.game.updateScore();var e=this.selectedBlocks.pop(),t=this.blocks[e],i=t.value*(this.selectedBlocks.length+1);t.changeValue(i),this.selectedBlocks.forEach(this._blockRemove,this),this._checkPositions()}},i.prototype._checkPositions=function(){var e=this,t=this._blocksXY,i=this.blocks;s.forEach(t,function(t){var n=[];s.forEach(t,function(e){e&&n.push(e)}),n.length!=e.size[1]&&n&&(n.sort(function(e,t){return i[e].y>i[t].y}),n.forEach(function(e,n){var s=i[e];s.y!=n&&(t[s.y]=null,s.changePosition(s.x,n),t[n]=e)}))}),this._addNewBlocks()},i.prototype._addNewBlocks=function(){for(var e=this._blocksXY,t=0;t<this.size[0];t++)for(var i=0;i<this.size[1];i++)e[t][i]||this.createBlock(t,i)},t.exports=i},{"../gameConfig":6,"../util":15,"./block.js":2}],5:[function(e,t){function i(e,t){this.name=e,this.state=t,this.store=n.get(e),this.score=0,this.field=new s(this),this._createElement(),this._bindEvents()}var n=e("../levelStore.js"),s=e("./field.js"),l=e("../util");i.prototype._createElement=function(){var e=document.createElement("div");e.className="game";var t='<div class="game__header"><div class="game__levelName">Level: {{name}}</div><div class="game__score">0</div><div class="game__chainSum"></div><div class="game__goal">{{goal}}</div></div><div class="game__body"></div><div class="game__footer"><div class="game__backButton">Menu</div><div class="game__restartButton">Restart</div><div class="game__nextButton">Next</div></div>';e.innerHTML=t.replace("{{goal}}",this._getGoalText()).replace("{{name}}",this.name),this.store.currentGoal>0&&l.addClass(e,"_win"),this.backButton=e.getElementsByClassName("game__backButton")[0],this.restartButton=e.getElementsByClassName("game__restartButton")[0],this.nextButton=e.getElementsByClassName("game__nextButton")[0],this.goalElement=e.getElementsByClassName("game__goal")[0],this.scoreElement=e.getElementsByClassName("game__score")[0],this.chainSumElement=e.getElementsByClassName("game__chainSum")[0],this.bodyElement=e.getElementsByClassName("game__body")[0],this.bodyElement.appendChild(this.field.element),this.element=e},i.prototype._bindEvents=function(){l.on(this.restartButton,"click",this.restart.bind(this)),l.on(this.backButton,"click",this._backToMenu.bind(this)),l.on(this.nextButton,"click",this._nextLevel.bind(this))},i.prototype._getGoalText=function(){return this.store.currentGoal<3?this.store.goals[this.store.currentGoal]:""},i.prototype._nextLevel=function(){this.state.runLevelMenu()},i.prototype.restart=function(){var e=new s(this);this.bodyElement.replaceChild(e.element,this.field.element),this.score=0,this.scoreElement.innerHTML=0,this.field=e},i.prototype._backToMenu=function(){this.state.backFromLevel()},i.prototype.updateChainSum=function(){if(!this.field.selectedMode)return void l.removeClass(this.chainSumElement,"_showed");var e=this.field,t=e.blocks[e.selectedBlocks[0]].value||0;this.chainSumElement.innerHTML=t*e.selectedBlocks.length,l.addClass(this.chainSumElement,"_showed")},i.prototype.updateScore=function(){var e=this.field,t=e.blocks[e.selectedBlocks[0]].value||0,i=1+.2*(e.selectedBlocks.length-3);this.score+=Math.round(t*e.selectedBlocks.length*i),this.scoreElement.innerHTML=this.score,this._checkGoal()},i.prototype._checkGoal=function(){if(3!=this.store.currentGoal){var e=this.store;this.score>=e.winConditions[e.currentGoal]&&(e.currentGoal=Math.min(e.currentGoal+1,3),1==e.currentGoal&&this._win(),this.goalElement.innerHTML=this._getGoalText())}},i.prototype._win=function(){l.addClass(this.element,"_win"),n.checkOpenLevels()},t.exports=i},{"../levelStore.js":9,"../util":15,"./field.js":4}],6:[function(e,t){t.exports={field:{width:500,height:500},path:{color:"rgba(255, 255, 255, 0.25)",width:10},levels:[1,2,3,4,5,6,7,8],minOpenLevels:5}},{}],7:[function(e,t){function i(e,t,i){this.levelMenu=e,this.name=t,this.store=l.get(this.name),this.element=document.createElement("div"),this.element.className="levelMenu__levelBlock _level_"+i%2;var n='<div class="levelMenu__levelBlockGoalState"></div><div class="levelMenu__levelBlockText">{{name}}</div>';this.element.innerHTML=n.replace("{{name}}",t),this.goal=null,this.isOpen=!1,o.on(this.element,"click",this._onClick.bind(this))}function n(e){this.state=e,this.levels={},this._createElement(),this._bindEvents()}var s=e("../gameConfig.js"),l=e("../levelStore.js"),o=e("../util.js");i.prototype._onClick=function(){this.levelMenu.runLevel(this.name)},i.prototype.update=function(){var e=this.store.currentGoal;this.goal!==e&&(o.removeClass(this.element,"_goal_"+this.goal),o.addClass(this.element,"_goal_"+e),this.goal=e);var t=this.store.isOpen;this.isOpen!==t&&o.addClass(this.element,"_open")},n.prototype._createElement=function(){var e=document.createElement("div");e.className="levelMenu";var t=document.createElement("div");t.className="levelMenu__header",e.appendChild(t);var n=document.createElement("div");n.className="levelMenu__headerLevels",n.innerHTML="Levels:",t.appendChild(n);var l=document.createElement("div");l.className="levelMenu__body",e.appendChild(l);var o=document.createDocumentFragment();s.levels.forEach(function(e,t){var n=new i(this,e,t);this.levels[e]=n,o.appendChild(n.element)},this),l.appendChild(o);var a=document.createElement("div");a.className="levelMenu__footer",e.appendChild(a);var c=document.createElement("div");c.className="levelMenu__backButton",c.innerHTML="Back",a.appendChild(c),this.backButton=c,this.element=e},n.prototype._bindEvents=function(){o.on(this.backButton,"click",function(){this.state.runMainMenu()}.bind(this))},n.prototype.update=function(){o.forEach(this.levels,function(e){e.update()},this)},n.prototype.runLevel=function(e){l.get(e).isOpen&&this.state.runLevel(e)},t.exports=n},{"../gameConfig.js":6,"../levelStore.js":9,"../util.js":15}],8:[function(e,t){t.exports={1:e("./levels/1"),2:e("./levels/2"),3:e("./levels/2"),4:e("./levels/2"),5:e("./levels/2"),6:e("./levels/2"),7:e("./levels/2"),8:e("./levels/2")}},{"./levels/1":10,"./levels/2":11}],9:[function(e,t){function i(){s.levels.forEach(function(e){var t=l[e];t.name=e,t.currentGoal=o.currentGoal||0,t.maxScore=o.maxScore||0,c[e]=t})}var n=(e("./util.js"),e("./saves.js")),s=e("./gameConfig.js"),l=config.levels,o=n.getLevels(),a={},c={};a.get=function(e){return c[e]},a.checkOpenLevels=function(){var e=0;s.levels.forEach(function(t,i){var n=c[t];n.currentGoal>0&&e++,n.isOpen=i<e+s.minOpenLevels})},i(),a.checkOpenLevels(),t.exports=a},{"./gameConfig.js":6,"./saves.js":13,"./util.js":15}],10:[function(e,t){function i(e,t){n.call(this,e,t)}var n=e("../game/game.js");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,t.exports=i},{"../game/game.js":5}],11:[function(e,t){var i=e("../game/game.js");t.exports=i},{"../game/game.js":5}],12:[function(e,t){function i(e){this.state=e,this._isResumeActive=!1,this._createElement(),this._bindEvents()}var n=e("../util.js");i.prototype._createElement=function(){var e=document.createElement("div");e.className="mainMenu",e.innerHTML='<div class="mainMenu__header"><div class="mainMenu__title">Chainumber</div></div><div class="mainMenu__body"><div class="mainMenu__newGame">New game</div><div class="mainMenu__resumeGame">Resume game</div></div><div class="mainMenu__footer"><div class="mainMenu__version">v0.0.1</div></div>',this.element=e,this.newGameButton=e.getElementsByClassName("mainMenu__newGame")[0],this.resumeGameButton=e.getElementsByClassName("mainMenu__resumeGame")[0]},i.prototype._bindEvents=function(){n.on(this.newGameButton,"click",function(){this.state.runLevelMenu()}.bind(this)),n.on(this.resumeGameButton,"click",function(){this.state.resumeLevel()}.bind(this))},i.prototype.resumeLevelActive=function(){this._isResumeActive||(this._isResumeActive=!0,n.addClass(this.element,"_activeLevel"))},t.exports=i},{"../util.js":15}],13:[function(e,t){var i={};i.getLevels=function(){var e,t=localStorage.getItem("levels");if(t)try{e=JSON.parse(t)}catch(i){e={}}else e={};return e},t.exports=i},{}],14:[function(e,t){function i(){this._activeElement=null,this._activeLevel=null,this.levelMenu=new n(this),this.mainMenu=new s(this),this._createElement()}var n=e("./levelMenu/levelMenu"),s=e("./mainMenu/mainMenu"),l=e("./levelModules"),o=e("./util");i.prototype._createElement=function(){this.element=document.createElement("div"),this.element.className="state",this.element.innerHTML='<div class="state__mainMenu"></div><div class="state__levelMenu"></div><div class="state__activeLevel"></div>',this.mainMenuElement=this.element.getElementsByClassName("state__mainMenu")[0],this.mainMenuElement.appendChild(this.mainMenu.element),this.levelMenuElement=this.element.getElementsByClassName("state__levelMenu")[0],this.levelMenuElement.appendChild(this.levelMenu.element),this.activeLevelElement=this.element.getElementsByClassName("state__activeLevel")[0]},i.prototype._activate=function(e){this._activeElement!==e&&(this._activeElement&&o.removeClass(this._activeElement,"_showed"),o.addClass(e,"_showed"),this._activeElement=e)},i.prototype.runLevelMenu=function(){this.levelMenu.update(),this._activate(this.levelMenuElement)},i.prototype.runMainMenu=function(){this._activate(this.mainMenuElement)},i.prototype.runLevel=function(e){if(this._activeLevel&&this._activeLevel.name==e)return this.resumeLevel();this.mainMenu.resumeLevelActive();var t=new l[e](e,this);this._activeLevel?this.activeLevelElement.replaceChild(t.element,this._activeLevel.element):this.activeLevelElement.appendChild(t.element),this._activeLevel=t,this._activate(this.activeLevelElement)},i.prototype.backFromLevel=function(){this.runMainMenu()},i.prototype.resumeLevel=function(){this._activeLevel&&this._activate(this.activeLevelElement)},t.exports=i},{"./levelMenu/levelMenu":7,"./levelModules":8,"./mainMenu/mainMenu":12,"./util":15}],15:[function(e,t){var i={};i.addClass=function(e,t){var i=e.className.split(" "),n=i.indexOf(t);return-1===n&&(i.push(t),e.className=i.join(" ")),e},i.removeClass=function(e,t){var i=e.className.split(" "),n=i.indexOf(t);return-1!==n&&(i.splice(n,1),e.className=i.join(" ")),e},i.hasClass=function(e,t){var i=e.className.split(" ");return-1!=i.indexOf(t)},i.forEach=function(e,t,i){e.length?e.forEach(t,i):Object.keys(e).forEach(function(n){t.call(i,e[n],n)})},i.on=function(e,t,i){e.addEventListener(t,i)},i.off=function(e,t,i){e.removeEventListener(t,i)};var n="DeviceOrientationEvent"in window||"orientation"in window;/Windows NT|Macintosh|Mac OS X|Linux/i.test(navigator.userAgent)&&(n=!1),/Mobile/i.test(navigator.userAgent)&&(n=!0),i.isMobile=n,i.rgbSum=function(e){var t,i,n,s=[0,0,0],l=0;for(i=0;i<e.length;i++){for(t=e[i],n=0;3>n;n++)s[n]+=t.rgb[n]*t.ratio;l+=t.ratio}for(n=0;3>n;n++)s[n]=Math.floor(s[n]/l);return s},i.nullFn=function(){},t.exports=i},{}]},{},[1]);
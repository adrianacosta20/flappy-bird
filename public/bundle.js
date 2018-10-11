!function(n){var e={};function t(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return n[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=n,t.c=e,t.d=function(n,e,i){t.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:i})},t.r=function(n){Object.defineProperty(n,"__esModule",{value:!0})},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s="./src/index.js")}({"./src/Bird.js":
/*!*********************!*\
  !*** ./src/Bird.js ***!
  \*********************/
/*! no static exports found */function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Bird = function Bird(x, y, ctx) {\n  _classCallCheck(this, Bird);\n\n  this.x = x;\n  this.y = y;\n  this.ctx = ctx;\n  this.velY = 0;\n  this.width = 90;\n  this.height = 64;\n  this.ticks = 0;\n  this.spriteIndex = 0;\n  this.dead = false;\n  this.sprites = [document.getElementById('bird1'), document.getElementById('bird2'), document.getElementById('bird3')];\n  var self = this;\n  window.addEventListener('keydown', function (e) {\n    if (e.keyCode === 32 && !self.dead) {\n      self.velY = -16;\n    }\n  });\n};\n\nexports.default = Bird;\n;\nBird.prototype.update = function (pipes) {\n  this.y += this.velY;\n  this.velY += 1.25;\n  if (this.detectCollisions(pipes)) {\n    this.dead = true;\n  }\n\n  this.ticks++;\n  if (this.ticks % 15 === 0) this.spriteIndex = (this.spriteIndex + 1) % this.sprites.length;\n};\n\nBird.prototype.render = function () {\n  var renderX = -this.width / 2;\n  var renderY = -this.height / 2;\n  this.ctx.save();\n  this.ctx.translate(this.x, this.y);\n  var angle = Math.PI / 6 * this.velY / 16;\n  this.ctx.rotate(angle);\n  this.ctx.drawImage(this.sprites[this.spriteIndex], renderX, renderY);\n\n  this.ctx.restore();\n};\n\nBird.prototype.detectCollisions = function (pipes) {\n  for (var i = 0; i < pipes.length; i++) {\n    var e = pipes[i];\n    var highPipe = e.ypos <= 0;\n    var x0 = e.xpos,\n        x1 = e.xpos + e.width;\n    var alpha2 = this.x + 44;\n    var beta2 = this.y;\n    if (highPipe) {\n      var y0 = e.ypos + e.length;\n      var alpha = this.x;\n      var beta = this.y - this.height / 2;\n      if (alpha > x0 && alpha < x1 && beta < y0 || alpha2 > x0 && alpha2 < x1 && beta2 < y0) {\n        return true;\n      }\n    } else {\n      var y2 = e.ypos;\n      var a = this.x;\n      var b = this.y + this.height / 2;\n      if (a > x0 && a < x1 && b > y2 || alpha2 > x0 && alpha2 < x1 && beta2 > y2) {\n        return true;\n      }\n    }\n  }\n  return false;\n};\n\n//# sourceURL=webpack:///./src/Bird.js?")},"./src/Environment.js":
/*!****************************!*\
  !*** ./src/Environment.js ***!
  \****************************/
/*! no static exports found */function(module,exports,__webpack_require__){"use strict";eval("\n\nvar Environment = function Environment(c, ctx) {\n  this.c = c;\n  this.ctx = ctx;\n  this.bgPos = 0;\n  this.fgPos = 0;\n  this.bgSpeed = 2;\n  this.bgWidth = 450;\n  this.bgImg = document.getElementById('bg');\n};\nEnvironment.prototype.update = function () {\n  this.bgPos -= this.bgSpeed;\n  if (this.bgPos < -this.bgWidth) this.bgPos = 0;\n};\nEnvironment.prototype.render = function () {\n  for (var i = 0; i <= this.c.width / this.bgWidth + 1; i++) {\n    this.ctx.drawImage(this.bgImg, this.bgPos + i * this.bgWidth, 0);\n  }\n};\n\n//# sourceURL=webpack:///./src/Environment.js?")},"./src/Pipe.js":
/*!*********************!*\
  !*** ./src/Pipe.js ***!
  \*********************/
/*! no static exports found */function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nvar Pipe = function Pipe(xpos, ypos, length, speed, ctx) {\n  _classCallCheck(this, Pipe);\n\n  this.ypos = ypos;\n  this.xpos = xpos;\n  this.length = length;\n  this.ctx = ctx;\n  this.speed = speed;\n  this.width = 150;\n};\n\nexports.default = Pipe;\n;\n\nPipe.prototype.update = function () {\n  this.xpos -= this.speed;\n};\n\nPipe.prototype.render = function () {\n  this.ctx.save();\n  this.ctx.fillStyle = "#000000";\n  this.ctx.fillRect(this.xpos, this.ypos, this.width, this.length);\n  this.ctx.fillStyle = "#74BF2E";\n  this.ctx.fillRect(this.xpos + 5, this.ypos + 5, this.width - 10, this.length - 10);\n  this.ctx.restore();\n  // this.ctx.fillStyle = "#FFFFFF";\n};\n\n//# sourceURL=webpack:///./src/Pipe.js?')},"./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _Environment = __webpack_require__(/*! ./Environment */ "./src/Environment.js");\n\nObject.defineProperty(exports, \'Environment\', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_Environment).default;\n  }\n});\n\nvar _Pipe = __webpack_require__(/*! ./Pipe */ "./src/Pipe.js");\n\nObject.defineProperty(exports, \'Pipe\', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_Pipe).default;\n  }\n});\n\nvar _Bird = __webpack_require__(/*! ./Bird */ "./src/Bird.js");\n\nObject.defineProperty(exports, \'Bird\', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_Bird).default;\n  }\n});\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nwindow.onload = function () {\n  var c = document.getElementById(\'canvas\');\n  c.width = window.innerWidth;\n  c.height = window.innerHeight;\n\n  var ctx = c.getContext(\'2d\');\n\n  var environment = new Environment(c, ctx);\n  var bird = new Bird(250, 300, ctx);\n  var pipes = [];\n  var pipeSet = generateRandomPipes(ctx, c.width, c.height);\n  pipes.push(pipeSet.top, pipeSet.bottom);\n  setInterval(function () {\n    var pipeSet = generateRandomPipes(ctx, c.width, c.height);\n    pipes.push(pipeSet.top, pipeSet.bottom);\n  }, 2600);\n  gameLoop();\n\n  /*\n   MAIN GAME LOOP\n  */\n  function gameLoop() {\n    //ctx.fillRect(0,0,c.width,c.height);\n    bird.update(pipes);\n    if (!bird.dead) {\n      environment.update();\n\n      pipes.forEach(function (pipe1) {\n        pipe1.update();\n      });\n    }\n    environment.render();\n    pipes.forEach(function (pipe1) {\n      pipe1.render();\n    });\n    bird.render();\n    if (bird.dead) {\n      drawGameOver(ctx, c);\n    }\n    window.requestAnimationFrame(gameLoop);\n  }\n};\n\nfunction generateRandomPipes(ctx, canvasWidth, canvasHeight) {\n  var lengthTop = Math.round(Math.random() * 200 + 50);\n  var lengthBottom = canvasHeight - 200 - lengthTop;\n  var returnVal = {};\n  returnVal.top = new Pipe(canvasWidth, -5, lengthTop, 4, ctx);\n  returnVal.bottom = new Pipe(canvasWidth, canvasHeight + 5 - lengthBottom, lengthBottom, 4, ctx);\n  return returnVal;\n}\n\nfunction drawGameOver(ctx, c) {\n  ctx.font = "30px Verdana";\n  ctx.textAlign = "center";\n  ctx.fillText("Game Over!!", c.width / 2, c.height / 2);\n}\n\n//# sourceURL=webpack:///./src/index.js?')}});
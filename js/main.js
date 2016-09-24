(function( Newton, $, undefined ) {
    Newton.viewModelInstance;

	viewModel = function ()
	{
		var self = this;

		self.roots = [];
		self.colors = [{ hex: '#E63946', r: 230, g: 57, b: 70, a: 1 },
					   { hex: '#A8DADC', r: 168, g: 218, b: 220, a: 1 },
					   { hex: '#457B9D', r: 69, g: 123, b: 157, a: 1 },
					   { hex: '#F1FAEE', r: 241, g: 250, b: 238, a: 1 },
					   { hex: '#1D3557', r: 29, g: 53, b: 87, a: 1 }];
		
		self.squareRootNewton = function(z) {
			var f = z.mul(z).add(new Complex(-1, 0));
			var fPrime = z.mul(new Complex(2, 0));

			return z.sub(f.div(fPrime));
		};

		self.cubeRootNewton = function(z) {
			var f = z.mul(z).mul(z).add(new Complex(-1, 0));
			var fPrime = z.mul(z).mul(new Complex(3, 0));

			return z.sub(f.div(fPrime));
		};

		self.fourthRootNewton = function(z) {
			var f = z.mul(z).mul(z).mul(z).add(new Complex(-1, 0));
			var fPrime = z.mul(z).mul(z).mul(new Complex(4, 0));

			return z.sub(f.div(fPrime));
		};

		self.fifthRootNewton = function(z) {
			var f = z.mul(z).mul(z).mul(z).mul(z).add(new Complex(-1, 0));
			var fPrime = z.mul(z).mul(z).mul(z).mul(new Complex(5, 0));

			return z.sub(f.div(fPrime));
		};

		self.choices = [{name: 'Square Roots', rootValue: 2, newton: self.squareRootNewton},
						{name: 'Cube Roots', rootValue: 3, newton: self.cubeRootNewton}, 
						{name: 'Fourth Roots', rootValue: 4, newton: self.fourthRootNewton}, 
						{name: 'Fifth Roots', rootValue: 5, newton: self.fifthRootNewton}];
		
		self.gridWidth = 600;
		self.gridHeight = 600;
		self.gridCenterX = ko.observable(0.0);
		self.gridCenterY = ko.observable(0.0);
		self.gridDistanceX = ko.observable(6.0);
		self.gridDistanceY = ko.observable(6.0);

		self.gridMinX = ko.computed(function () {
			var result = self.gridCenterX() - self.gridDistanceX();
			var formattedResult = Math.sign(result) > 0 ? '+' : '';
			formattedResult += result.toFixed(5);
			return formattedResult;
		});

		self.gridMaxX = ko.computed(function () {
			var result = self.gridCenterX() + self.gridDistanceX();
			var formattedResult = Math.sign(result) > 0 ? '+' : '';
			formattedResult += result.toFixed(5);
			return formattedResult;
		});

		self.gridMinY = ko.computed(function () {
			var result = self.gridCenterY() - self.gridDistanceY();
			var formattedResult = Math.sign(result) > 0 ? '+' : '';
			formattedResult += result.toFixed(5);
			return formattedResult;
		});

		self.gridMaxY = ko.computed(function () {
			var result = self.gridCenterY() + self.gridDistanceY();
			var formattedResult = Math.sign(result) > 0 ? '+' : '';
			formattedResult += result.toFixed(5);
			return formattedResult;
		});

		self.grid = new Array(self.gridWidth);

		for (var i = 0; i < self.gridWidth; i++) {
			self.grid[i] = new Array(self.gridHeight);
		}

		self.selectedChoice = ko.observable();

		self.selectedChoice.subscribe(function (newChoice) {
			var tempRoots = [];

			// Calculate all of the roots and store them in an array.
			for (var i = 0; i < newChoice.rootValue; i++) {
				var realPart;
				var imaginaryPart;

				var root = {
				realPart: Math.cos(2 * i * Math.PI / newChoice.rootValue),
				imaginaryPart: Math.sin(2 * i * Math.PI / newChoice.rootValue),
				color: self.colors[i]};

				tempRoots.push(root);
			}

			self.roots = tempRoots;

			// Fill the grid.
			var realPart;
			var imaginaryPart;
			var realStep = self.gridDistanceX() * 2 / self.gridWidth;
			var imaginaryStep = self.gridDistanceY() * 2 / self.gridHeight;

			var plot = document.getElementById('plot');
			var ctx = plot.getContext('2d');
			//var id = ctx.createImageData(1, 1);
			//var d = id.data;

			for (var i = 0; i < self.gridWidth; i++) {
				for (var j = 0; j < self.gridHeight; j++) {
					realPart = (self.gridCenterX() - self.gridDistanceX()) + realStep * i;
					imaginaryPart = (self.gridCenterY() - self.gridDistanceY()) + imaginaryStep * j;
					
					var z = new Complex(realPart, imaginaryPart);

					// Stop iterating when the guess is close enough to one of the roots.
					// If it isn't converging on a root, then this point is not in the set.
					var stop = false;

					for (var k = 0; k < 20; k++) {
						for (var m = 0; m < newChoice.rootValue; m++) {
							var distance = Math.sqrt(Math.pow(z.re - self.roots[m].realPart, 2) + Math.pow(z.im - self.roots[m].imaginaryPart, 2));

							if (distance < 0.01) {
								// Close enough!
								self.grid[i][j] = self.roots[m];
								stop = true;
								break;
							}
						}

						if (stop) {
							break;
						}
						else {
							z = newChoice.newton(z);
						}
					}

					if (!stop) {
						// It never converged! Yuck!
						self.grid[i][j] = null;
					}

					if (self.grid[i][j] == null) {
						//d[0] = 0;
						//d[1] = 0;
						//d[2] = 0;
						//d[3] = 1;
						ctx.fillStyle = 'rgba('+0+','+0+','+0+','+1+')';
					}
					else {
						//d[0] = self.grid[i][j].color.r;
						//d[1] = self.grid[i][j].color.g;
						//d[2] = self.grid[i][j].color.b;
						//d[3] = self.grid[i][j].color.a;
						ctx.fillStyle = 'rgba('+self.grid[i][j].color.r+','+self.grid[i][j].color.g+','+self.grid[i][j].color.b+','+1+')';
					}

					ctx.fillRect( i, j, 1, 1 );
					//ctx.putImageData(id, i, j, i, j, 1, 1);
				}
			}

			// Color in all of the roots.
			for (var i = 0; i < newChoice.rootValue; i++) {
				var centerX = (self.roots[i].realPart - -self.gridDistanceX() - self.gridCenterX()) / realStep;
				var centerY = (self.roots[i].imaginaryPart - -self.gridDistanceY() - self.gridCenterY()) / imaginaryStep;
				var radius = 8;

				ctx.beginPath();
				ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
				ctx.fillStyle = 'rgba('+255+','+255+','+255+','+1+')';
				ctx.fill();
				ctx.lineWidth = 1;
				ctx.strokeStyle = '#000000';
				ctx.stroke();
			}
		});

		self.reset = function() {
			self.gridDistanceX(6.0);
			self.gridDistanceY(6.0);
			self.gridCenterX(0.0);
			self.gridCenterY(0.0);
			self.selectedChoice(self.selectedChoice());
		}
	}

	Newton.getMousePos = function (plot, evt) {
		var rect = plot.getBoundingClientRect();
		return {
			x: Math.round((evt.clientX-rect.left)/(rect.right-rect.left)*plot.width),
			y: Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*plot.height)
			};
	}

    Newton.DocumentReady = function () {
    	var plot = document.getElementById('plot');

    	plot.addEventListener('click', function(evt) {
	        var mousePos = Newton.getMousePos(plot, evt);
	        
	        var realStepSize = Newton.viewModelInstance.gridDistanceX() * 2 / Newton.viewModelInstance.gridWidth;
	        var imaginaryStepSize = Newton.viewModelInstance.gridDistanceY() * 2 / Newton.viewModelInstance.gridHeight;

	        var currentMinX = Newton.viewModelInstance.gridCenterX() - Newton.viewModelInstance.gridDistanceX();
	        var currentMinY = Newton.viewModelInstance.gridCenterY() - Newton.viewModelInstance.gridDistanceY();

	        Newton.viewModelInstance.gridCenterX(currentMinX + mousePos.x * realStepSize);
			Newton.viewModelInstance.gridCenterY(currentMinY + mousePos.y * imaginaryStepSize);

			if (evt.shiftKey) {
				Newton.viewModelInstance.gridDistanceX(Newton.viewModelInstance.gridDistanceX() * 2);
	        	Newton.viewModelInstance.gridDistanceY(Newton.viewModelInstance.gridDistanceY() * 2);
			}
			else {
				Newton.viewModelInstance.gridDistanceX(Newton.viewModelInstance.gridDistanceX() / 2);
	        	Newton.viewModelInstance.gridDistanceY(Newton.viewModelInstance.gridDistanceY() / 2);
			}

	        Newton.viewModelInstance.selectedChoice(Newton.viewModelInstance.selectedChoice());
	      }, false);

    	Newton.viewModelInstance = new viewModel();
		ko.applyBindings(Newton.viewModelInstance);
    }
}( window.Newton = window.Newton || {}, jQuery ));

$(document).ready(function ()
{
	Newton.DocumentReady();
});

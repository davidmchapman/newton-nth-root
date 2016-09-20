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
		self.xMax = 6.0;
		self.yMax = 6.0;

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
			var realStep = self.xMax * 2 / self.gridWidth;
			var imaginaryStep = self.yMax * 2 / self.gridHeight;

			var plot = document.getElementById('plot');
			var ctx = plot.getContext('2d');
			//var id = ctx.createImageData(1, 1);
			//var d = id.data;

			for (var i = 0; i < self.gridWidth; i++) {
				for (var j = 0; j < self.gridHeight; j++) {
					realPart = (-1 * self.xMax) + realStep * i;
					imaginaryPart = (-1 * self.yMax) + imaginaryStep * j;
					if (j == 440) {
						var qwer = 1;
						qwer++;
					}
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
				var centerX = (self.roots[i].realPart - -self.xMax) / realStep;
				var centerY = (self.roots[i].imaginaryPart - -self.yMax) / imaginaryStep;
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
			self.selectedChoice(self.selectedChoice());
		}
	}

    Newton.DocumentReady = function () {
    	Newton.viewModelInstance = new viewModel();
		ko.applyBindings(Newton.viewModelInstance);
    }

    
}( window.Newton = window.Newton || {}, jQuery ));

$(document).ready(function ()
{
	Newton.DocumentReady();
});

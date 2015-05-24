	window.onload = function(){
	//Create canvas element with 2d context
		var canvas = document.createElement("canvas");
			c = canvas.getContext("2d");

	//define canvas with and heigth so they are full screen		
		canvas.width = $(window).width();
		canvas.height = $(window).height();

	//resize canvas on window resize 	
		$(window).resize(function(){
			canvas.width = $(window).width();
			canvas.height = $(window).height();
		});
	
	//Set canvas id and append the element to the DOM	
		canvas.setAttribute('id', 'canvas');
		document.body.appendChild(canvas);
	
	//define fill style and fill canvas	
		c.fillStyle = "black";
		c.fillRect(0, 0, canvas.width, canvas.height);

	//track mouse position	
		var a = {};
		document.onmousemove = function(e){
			a.xPos = e.clientX;
			a.yPos = e.clientY;
			return a.xPos;
			return a.yPos;
		}

	//particle variables	
		particles = {};
		particleIndex = 0;
		particleNum = 2;

	//create particle prototype	
		function Particle(){
			this.x = a.xPos;
			this.y = a.yPos;
			this.vx = Math.random() * 10;
			this.vy = Math.random()* 10;
			particleIndex++;
			//select particular particle from the array and give it particular id, life span, color
			particles[particleIndex]= this;
			this.id = particleIndex;
			this.life = 0;
			this.maxLife = Math.random() * 30 + 10;
			this.color = "hsla("+parseInt(Math.random()*360, 10)+",100%,50%, 0.2)";
		};

			
		Particle.prototype.draw = function(){
			this.x += this.vx;
			this.y += this.vy;
			if (Math.random() > 0.5){
				this.vx = Math.random() * 10 - 5;
				this.vy = Math.random() * 10 - 5;
			}
			this.life++
			if (this.life >= this.maxLife){
				delete particles[this.id];
			}
			c.fillStyle = this.color;
			c.beginPath();
			c.arc(this.x,this.y,5,0,2*Math.PI);
			c.fill();
		};


		var p = new Particle();

			setInterval(function(){
				c.globalCompositeOperation = "source-over"
				c.fillStyle = "rgba(0,0,0,0.2)";
				c.fillRect(0, 0, canvas.width, canvas.height);
				var x = canvas.width / 2;
				var y = canvas.height / 2;
				

				for (var i = 0; i < particleNum; i++ ){
					new Particle();
				};
				 c.globalCompositeOperation = "lighter"
				 //for in loop to interate over inumerable properties (particles)
				for(var n in particles){
					particles[n].draw();
				};
			}, 30);
	}
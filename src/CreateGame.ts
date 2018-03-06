class CreateGame extends egret.Sprite{
	protected stageSize = {
		width:10,
		height:15,
		boxsize:50
	};
	protected erwei:Array<any>;
	protected shape:egret.Shape;
	protected weiZhiY:number;// 此时方块的Y坐标
	protected weiZhiX:number;// 此时方块的X坐标

	public constructor() {
		super();
		this.weiZhiX = 3;
		this.weiZhiY = 0;
		this.erwei = new Array();
		for(let i = 0; i < this.stageSize.height; i++){
			this.erwei[i] = new Array();
			for(let j = 0; j < this.stageSize.width; j ++){
				this.erwei[i][j] = 0;
			}
		}

	}

	public begin(){
		this.showStage();
		this.showButton();
		this.showOne();
		this.timer();
	}

	/**
	 * 展示方向按钮皮肤
	 */
	protected showButton(){
		var label1:egret.TextField = new egret.TextField(); 
		label1.text = "左"; 
		label1.x = 0;
		label1.y = 850;
		label1.width = 100;
		label1.height = 100;
		this.addChild( label1 );
		label1.touchEnabled = true;
		label1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.move,this);
		var label2:egret.TextField = new egret.TextField(); 
		label2.text = "右"; 
		label2.x = 200;
		label2.y = 850;
		label2.width = 100;
		label2.height = 100;
		this.addChild( label2 );
		label2.touchEnabled = true;
		label2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.move,this);
		var label3:egret.TextField = new egret.TextField(); 
		label3.text = "上"; 
		label3.x = 100;
		label3.y = 750;
		label3.width = 100;
		label3.height = 100;
		this.addChild( label3 );
		label3.touchEnabled = true;
		label3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.move,this);
		var label4:egret.TextField = new egret.TextField(); 
		label4.text = "下"; 
		label4.x = 100;
		label4.y = 850;
		label4.width = 100;
		label4.height = 100;
		this.addChild( label4 );
		label4.touchEnabled = true;
		label4.addEventListener(egret.TouchEvent.TOUCH_TAP,this.move,this);
	}

	/**
	 * 方块移动
	 */
	protected move(e:egret.TouchEvent){
		if(e.target.text == "左"){
			if(this.canLeft() == 1 && this.canLeft2() == 1){
				for(let i = 0; i < this.stageSize.height; i++){
					for(let j = 0; j < this.stageSize.width; j ++){
						if(this.erwei[i][j] == 1){
							this.erwei[i][j - 1] = this.erwei[i][j];
							this.erwei[i][j] = 0;
						}
					}
				}
			if(this.weiZhiX <= 0){
				this.weiZhiX = 0;
			}else{
				this.weiZhiX --;
			}
			}
		}
		else if(e.target.text == "右"){
			if(this.canRight() == 1 && this.canRight2() == 1){
				for(let i = 0; i < this.stageSize.height; i++){
					for(let j = this.stageSize.width - 1; j >= 0; j --){
						if(this.erwei[i][j] == 1){
							this.erwei[i][j + 1] = this.erwei[i][j];
							this.erwei[i][j] = 0;
						}
					}
				}
			if(this.weiZhiX >= this.stageSize.width - 2){
				this.weiZhiX = this.stageSize.width - 3;
			}else{
				this.weiZhiX ++;
			}
			}
			
		}
		else if(e.target.text == "下"){
			if(this.oneCanDown() == 1 && this.oneCanDown2() == 1){
				for(let m = this.stageSize.height - 1; m >= 0; m--){
					for(let n = 0; n < this.stageSize.width; n ++){
						if(this.erwei[m][n] == 1){
							this.erwei[m + 1][n] = 1;
							this.erwei[m][n] = 0;
						}
					}
				}
			}
			if(this.weiZhiY >= this.stageSize.height){
				this.weiZhiY = this.stageSize.height;
			}else{
				this.weiZhiY ++;
			}
		}
		else if(e.target.text == "上"){
			if(this.canChange() == 1 && this.suijishu > 0 && this.suijishu < 6){
				this.change();
			}else if((this.suijishu == 0 || this.suijishu == 7) && this.canChange1() == 1){
				this.lineChange();
			}
		}
		this.showStage();
	}
	
	/**
	 * 能否变形
	 */
	protected canChange(){
		for(let i = 0; i < 3; i++){
			for(let j = 0; j < 3; j++){
				if(this.weiZhiY + i > 14){
					return 0;
				}
				if(this.erwei[this.weiZhiY + i][this.weiZhiX + j] == 2){
					return 0;
				}
			}
		}
		return 1;
	}

	/**
	 * 变形
	 */
	protected change(){
		let copy:Array<any> = new Array();
		let er = 2;
		// console.log(this.weiZhiX);console.log(this.weiZhiY);
		// this.time.stop();
		for(let i = 0; i < 3; i++){
			copy[i] = new Array();
			for(let j = 0; j < 3; j++){
				copy[i][j] = this.erwei[this.weiZhiY + i][this.weiZhiX + j];
			}
		}
		
		for(let i = 0; i < 3; i++){
			for(let j = 0; j < 3; j++){
				this.erwei[this.weiZhiY + i][this.weiZhiX + j] = copy[er][i];
				er --;
			}
			er = 2;
		}
	}
	/**
	 * 直线方块能否变形
	 */
	protected canChange1(){
		for(let i = 0; i <= 3; i++){
			for(let j = 0; j <= 3; j++){
				if(this.weiZhiY + i > 14){
					return 0;
				}
				if(this.erwei[this.weiZhiY + i][this.weiZhiX + j] == 2){
					return 0;
				}
			}
		}
		return 1;
	}

	/**
	 * 直线方块变形
	 */
	protected lineChange(){
		let x = this.weiZhiX + 1;
		let y = this.weiZhiY + 1;
		if(this.erwei[y][x - 1] == 1){
			this.erwei[y][x - 1] = 0;
			this.erwei[y][x + 1] = 0;
			this.erwei[y][x + 2] = 0;

			this.erwei[y - 1][x] = 1;
			this.erwei[y + 1][x] = 1;
			this.erwei[y + 2][x] = 1;
		}else{
			this.erwei[y - 1][x] = 0;
			this.erwei[y + 1][x] = 0;
			this.erwei[y + 2][x] = 0;

			this.erwei[y][x - 1] = 1;
			this.erwei[y][x + 1] = 1;
			this.erwei[y][x + 2] = 1;
		}
		
	}

	/**
	 * 向左移动
	 */
	protected canLeft(){
		for(let i = 0; i < this.stageSize.height; i++){
			if(this.erwei[i][0] == 1){
				return 0;
			}
		}
		return 1;
	}

	protected canLeft2(){
		for(let i = this.stageSize.height - 1; i >= 0; i --){
			for(let j = 0; j < this.stageSize.width; j ++){
				if(this.erwei[i][j] == 1){
					if(this.erwei[i][j - 1] == 2){
						return 0;
					}
				}
			}
		}
		return 1;
	}

	/**
	 * 向右移动
	 */
	protected canRight(){
		for(let i = 0; i < this.stageSize.height; i++){
			if(this.erwei[i][this.stageSize.width - 1] == 1){
				return 0;


			}
		}
		return 1;
	}

	protected canRight2(){
		for(let i = this.stageSize.height - 1; i >= 0; i --){
			for(let j = 0; j < this.stageSize.width; j ++){
				if(this.erwei[i][j] == 1){
					if(this.erwei[i][j + 1] == 2){
						return 0;
					}
				}
			}
		}
		return 1;
	}

	/**
	 * 显示背景图
	 */
	protected showStage(){
		for(let i = 0; i < this.stageSize.height; i++){
			for(let j = 0; j < this.stageSize.width; j ++){
				this.shape = new egret.Shape();
				if(this.erwei[i][j] == 0){
					this.shape.graphics.beginFill(0xd0d0d0);
					this.shape.graphics.drawRect(j * this.stageSize.boxsize, i * this.stageSize.boxsize,
						this.stageSize.boxsize,this.stageSize.boxsize);
					this.shape.graphics.endFill();
					this.addChild(this.shape);
				}else if(this.erwei[i][j] == 1 || this.erwei[i][j] == 2){
					this.shape.graphics.beginFill(0xDC143C);
					this.shape.graphics.drawRect(j * this.stageSize.boxsize, i * this.stageSize.boxsize,
						this.stageSize.boxsize,this.stageSize.boxsize);
					this.shape.graphics.endFill();
					this.addChild(this.shape);
				}
			}
		}

	}

	/**
	 * 初始化7种不同形状的方块
	 */
	protected initSeven(num):Array<any>{
		let initOne:Array<any> = new Array();
		switch(num){
			case 1:initOne = [[1,1,0,0],[0,1,1,0]];break;
			// z
			case 2:initOne = [[0,1,1,0],[1,1,0,0]];break;
			// 反z
			case 3:initOne = [[0,1,0,0],[1,1,1,0]];break;
			// 山
			case 4:initOne = [[1,0,0,0],[1,1,1,0]];break;
			// L
			case 5:initOne = [[0,0,1,0],[1,1,1,0]];break;
			// 反L
			case 6:initOne = [[0,1,1,0],[0,1,1,0]];break;
			// O
			case 7:initOne = [[0,0,0,0],[1,1,1,1]];break;
			// 一
		}
		return initOne;
	}

	protected suijishu:number;
	/**
	 * 产生1-7的随机数
	 */
	protected suiji():number{
		let num = Math.ceil(Math.random() * 7);
		this.suijishu = num;
		// console.log(num);
		if(num == 0){
			num = 7;
		}
		return num;
	}
	/**
	 *显示移动的方块，方块与数组一一对应
	 */
	protected showOne():void{
		let one = this.initSeven(this.suiji());
		for(let i = 0; i < 2; i++){
			for(let j = 3; j < 7; j ++){
				this.erwei[i][j] = one[i][j - 3];
			}
		}
		this.showStage();
	}
	
	/**
	 * 方块下落
	 */
	protected oneDown(){
		if(this.oneCanDown() == 1 && this.oneCanDown2() == 1){
			for(let m = this.stageSize.height - 1; m >= 0; m--){
				for(let n = 0; n < this.stageSize.width; n ++){
					if(this.erwei[m][n] == 1){
						this.erwei[m + 1][n] = 1;
						this.erwei[m][n] = 0;
					}
				}
			}
			this.weiZhiY ++;
		}else{
			this.time.stop();
			this.weiZhiX = 3;
			this.weiZhiY = 0;
			this.change1to2();
			this.clear();
			if(this.ifOver() == 0){
				this.time.stop();
				alert("game over !");
				return 0;
			}
			this.showOne();
			this.timer();
		}
		this.showStage();
	}


	protected time:egret.Timer = new egret.Timer(500,0);
	/**
	 * 设置定时器
	 */
	protected timer(){
		// egret.setInterval(this.oneDown,this,1000);
		this.time.addEventListener(egret.TimerEvent.TIMER,this.oneDown,this);
        // this.time.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.begin,this);
        //开始计时
        this.time.start();
	}
   

    /**
	 * 当方块落到底部的时候,把方块的数值1改成2
	 */
	protected change1to2(){
		for(let i = 0; i < this.stageSize.height; i ++){
			for(let j = 0; j < this.stageSize.width; j ++){
				if(this.erwei[i][j] == 1){
					this.erwei[i][j] = 2;
				}
			}
		}
	}

	/**
	 * 判断方块是否可以向下移动
	 */
	protected oneCanDown(){
		for(let i = 0; i < this.stageSize.width; i++){
			if(this.erwei[14][i] == 1){
				return 0;
			}
		}
		return 1;
	}
	
	
	/**
	 * 方块叠加
	 */
	protected oneCanDown2(){
		for(let i = this.stageSize.height - 1; i >= 0; i --){
			for(let j = 0; j < this.stageSize.width; j ++){
				if(this.erwei[i][j] == 1){
					if(this.erwei[i + 1][j] == 2){
						return 0;
					}
				}
			}
		}
		return 1;
	}

	/**
	 * 消除行
	 */
	protected clear(){
		let sum = 0;
		for(let i = this.stageSize.height - 1; i >= 0; i--){
			for(let j = 0; j < this.stageSize.width; j++){
				sum += this.erwei[i][j];
				if(sum == 20){
					for(let m = i - 1; m > 0; m --){
						for(let n = 0; n < this.stageSize.width; n++){
							this.erwei[m + 1][n] = this.erwei[m][n];
						}
					}
					i = this.stageSize.height;
				}
			}
			sum = 0;
		}
	}

	/**
	 * 判断游戏是否游戏结束
	 */
	protected ifOver(){
		for(let i = 0; i < this.stageSize.width; i++){
			if(this.erwei[1][i] == 2){
				return 0;
			}
		}
	}
}
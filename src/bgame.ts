namespace FK {
	export class bgame {
		protected stageSize = {
			width:10,
			height:20,
			boxsize:40
		};
		protected sprite:egret.Sprite;
		protected shp:egret.Shape;
		protected main:egret.DisplayObjectContainer;
		public constructor(main: egret.DisplayObjectContainer) {
			this.main = main;
			this.sprite = new egret.Sprite();
			this.sprite.x = 0;
			this.sprite.y = 0;
			this.shp = new egret.Shape();
			this.sprite.addChild(this.shp);
			this.main.addChild(this.sprite);
		}

		protected showStage(){
			this.shp.graphics.beginFill(0xd0d0d0);
			this.shp.graphics.drawRect(0, 0,
			 this.stageSize.width * this.stageSize.boxsize,this.stageSize.height * this.stageSize.boxsize);
			this.shp.graphics.endFill();
		}
	}
}
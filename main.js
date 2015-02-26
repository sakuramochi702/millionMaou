var milkcocoa = new MilkCocoa("https://io-ri6ltx43y.mlkcca.com/");
/* your-app-id にアプリ作成時に発行される"io-"から始まるapp-idを記入します */
var maoDataStore = milkcocoa.dataStore("tamago");
var imgMao, txtCount, pName, board;
var remain=1000000;

window.onload = function(){
	imgMao = document.getElementById("mao");
	txtCount = document.getElementById("count");
	board = document.getElementById("board");
	loadData();
}

function loadData() {
	var query = maoDataStore.query();
	query.limit(1000000);
	query.done(function(data) {
		var count = 0;
		for (var i=0; i<data.length; i++) {
			count++
		}
		remain = 1000000 - count;
		txtCount.innerHTML=String(remain);

	});
	//コンソールの初期化
	var msgDom = document.createElement("p");
	if (remain == 0) {
		msgDom.innerHTML = "ミリオンまおうはすでに滅びた。世界は平和になったのだ。";
	} else {
		msgDom.innerHTML = "ミリオンまおうがあらわれた！";
	}
	board.insertBefore(msgDom, board.firstChild);
}

function clickEvent(){
	pName = document.getElementById("name").value;
	attack();
	//addConsole(pName);
}

function attack(){
	maoDataStore.push({name : pName},function(data){
		console.log("送信OK!");
	});
}

maoDataStore.on("push",function(data){
	//他の人が更新した場合もここで受け取れる
	remain--;
	txtCount.innerHTML=String(remain);
	addConsole(data.value.name);
});

function addConsole(name) {
	var msgDom = document.createElement("p");
	msgDom.innerHTML = name + "のこうげき！ まおうに 1 のダメージ！"
	board.insertBefore(msgDom, board.firstChild);		
}

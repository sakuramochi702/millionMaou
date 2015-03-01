var milkcocoa = new MilkCocoa("https://io-bi6p7ipvv.mlkcca.com/");
/* your-app-id にアプリ作成時に発行される"io-"から始まるapp-idを記入します */
var maoDataStore = milkcocoa.dataStore("mao01");
var imgMao, txtCount, pName, board;
var maoId="";
var remain=1000000;

window.onload = function(){
	imgMao = document.getElementById("mao");
	txtCount = document.getElementById("count");
	board = document.getElementById("board");
	loadData();
}

function loadData() {
	var query = maoDataStore.query();
	query.sort("desc").limit(1);
	//query.limit(1000000);
	query.done(function(data) {
		data.forEach(function(value) {
			maoId=value.id;
			remain = Number(value.hp);
		});
		//var count = 0;
		/*for (var i=0; i<data.length; i++) {
			count++
		}*/
		//remain = 1000000 - count;
		txtCount.innerHTML=String(remain);
		//コンソールの初期化
		var msgDom = document.createElement("p");
		if (remain <= 0) {
			msgDom.innerHTML = "ミリオンまおうはすでに滅びた。世界は平和になったのだ…。";
			document.getElementById("mao").src="end.png";
		} else {
			msgDom.innerHTML = "ミリオンまおうがあらわれた！";
			document.getElementById("mao").src="mao.png";
		}
		board.insertBefore(msgDom, board.firstChild);
	});
}

function clickEvent(){
	pName = document.getElementById("name").value;
	attack();
}

function attack(){
	if (remain > 0) {
		if (maoId.length == 0) {
			maoDataStore.push({name : pName, hp : String(remain-1)},
				function(data){
					console.log("送信OK!");
					maoId = data.id;
				});
		} else {
			maoDataStore.set(maoId, {name : pName, hp : String(remain-1)});
		}
	} else {
		var msgDom = document.createElement("p");
		msgDom.innerHTML = "ミリオンまおうはすでに倒されている。";
		board.insertBefore(msgDom, board.firstChild);	
	}
}

maoDataStore.on("push",function(data){
	//他の人がpushした場合もここで受け取れる
	maoId = data.id;
	remain = data.value.hp;
	txtCount.innerHTML=String(remain);
	addConsole(data.value.name);
});

maoDataStore.on("set",function(data){
	//他の人がsetした場合もここで受け取れる
	remain = data.value.hp;
	txtCount.innerHTML=String(remain);
	addConsole(data.value.name);
});

function addConsole(name) {
	var msgDom = document.createElement("p");
	msgDom.innerHTML = name + "のこうげき！ まおうに 1 のダメージ！";
	board.insertBefore(msgDom, board.firstChild);

	if (remain <= 0) {
		var msgDom2 = document.createElement("p");
		msgDom2.innerHTML = "ミリオンまおうをやっつけた！";
		board.insertBefore(msgDom2, board.firstChild);
		document.getElementById("mao").src="end.png";
	}
}

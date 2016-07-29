

// 类－描述船上的状态
function boatState(m_person, m_wolf, m_sheep, m_cabbage) {
    this.m_person = m_person;
    this.m_wolf = m_wolf;
    this.m_sheep = m_sheep;
    this.m_cabbage = m_cabbage;
    this.display = function () {
    	// body...
    	console.log(this.m_person, this.m_wolf, this.m_sheep = m_sheep, this.m_cabbage);
    }
}

// 类－描述岸上的状态
function bankState(m_person, m_wolf, m_sheep, m_cabbage) {
    this.m_person = m_person;
    this.m_wolf = m_wolf;
    this.m_sheep = m_sheep;
    this.m_cabbage = m_cabbage;

    this.display = function () {
    	// body...
    	console.log(this.m_person, this.m_wolf, this.m_sheep = m_sheep, this.m_cabbage);
    }
    // 判断是否结束
    this.compareToEnd = function () {
    	if(this.m_person == 0 && this.m_wolf == 0 && this.m_sheep == 0 && this.m_cabbage == 0) {
    	    return true;
    	} else {
    	    return false;
    	}
    }
    // 狼跟羊、羊跟白菜在同一个岸边， 且农夫不在场
    this.notAllow = function () {
    	if (this.m_person == 0 && ((this.m_wolf == 1 && this.m_sheep == 1 && this.m_cabbage == 1 ) || (this.m_wolf == 1 && this.m_sheep == 1) || (this.m_sheep == 1 && this.m_cabbage == 1))) {
    	    return true;
    	} else {
    	    if ((this.m_person != 0 && this.m_person != 1) || (this.m_wolf != 0 && this.m_wolf != 1)  || (this.m_sheep != 0 && this.m_sheep != 1) || (this.m_cabbage != 0 && this.m_cabbage != 1)) {
    	        return true;
    	    } else {
    	        return false;
    	    }
    	}
    }           
    //  判断组合情况是否没有出现过
    this.compareToAppear = function (bankStateTemp) {
    	if (this.m_person == bankStateTemp.m_person && this.m_wolf == bankStateTemp.m_wolf && this.m_sheep == bankStateTemp.m_sheep && this.m_cabbage == bankStateTemp.m_cabbage) {
    	    return true;
    	} else {
    	    return false;
    	}
    }
    // 岸A的状态
    this.newState = function (bankStateTemp, boatStateTemp) {
    	if (this.m_person == 1) {
    	    bankStateTemp.m_person = this.m_person - boatStateTemp.m_person;
    	    bankStateTemp.m_wolf = this.m_wolf - boatStateTemp.m_wolf;
    	    bankStateTemp.m_sheep = this.m_sheep - boatStateTemp.m_sheep;
    	    bankStateTemp.m_cabbage = this.m_cabbage - boatStateTemp.m_cabbage;
    	}
    	if (this.m_person == 0) {
    	    bankStateTemp.m_person = this.m_person + boatStateTemp.m_person;
    	    bankStateTemp.m_wolf = this.m_wolf + boatStateTemp.m_wolf;
    	    bankStateTemp.m_sheep = this.m_sheep + boatStateTemp.m_sheep;
    	    bankStateTemp.m_cabbage = this.m_cabbage + boatStateTemp.m_cabbage;
    	}
    }
    // 岸B的状态
    this.otherState = function (bankStateTemp) {
    	bankStateTemp.m_person = 1 - this.m_person;
    	bankStateTemp.m_wolf = 1 - this.m_wolf;
    	bankStateTemp.m_sheep = 1 - this.m_sheep;
    	bankStateTemp.m_cabbage = 1 - this.m_cabbage;
    }
}
// 记录变量
var record = 20;

// 从河岸A －－－> 河岸B
var stateA = []; // 河岸A
var stateB = []; // 河岸B
var boat = []; // 船上人员配比，1表示存在，0表示不存在 对应顺序是人 狼 羊 菜

function init() {
	for (var i = record - 1; i >= 0; i--) {
		stateA.push(new bankState());
		stateB.push(new bankState());
	}
	for (var j = 4 - 1; j >= 0; j--) {
		boat.push(new boatState());
	}
}

function main() {
	init();
	stateA[0] = new bankState(1, 1, 1, 1);
	boat[0] = new boatState(1, 0, 0, 0);
	boat[1] = new boatState(1, 1, 0, 0);
	boat[2] = new boatState(1, 0, 1, 0);
	boat[3] = new boatState(1, 0, 0, 1);
	crossRiver(0);
}

function crossRiver(time)
{
    if (stateA[time].compareToEnd()) {
        console.log('success')
        for (var num = 0; num <= time; num++) {
            stateA[num].display();
        }
        return;
    }
    if (stateA[time].notAllow() || stateB[time].notAllow()) {
        return;
    }
    for (var i = 0; i < time; i++) {
        if (stateA[time].compareToAppear(stateA[i])) {
            return;
        }
    }
    for (var j = 0; j < 4; j++) {
    	console.log(stateA[time + 1].display())
        stateA[time].newState(stateA[time + 1], boat[j]);
        stateA[time + 1].otherState(stateB[time + 1]);
        crossRiver(time + 1);
    }
 
}

main();
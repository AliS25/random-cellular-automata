let grid
let copy
const ruleNum = randNum();
const color = "rgb("+randNum()+","+randNum()+","+randNum()+")";
let InitialConfig = Array(100);

function start(){

grid = document.querySelector("#grid");

copy = InitialConfig;
randConfig(InitialConfig);
genrate(InitialConfig)

    const m = document.querySelector("#m");
    m.textContent = "You got rule number "+ruleNum+"!";
    m.style.color = color;
}

function randNum(){
    return Math.floor(Math.random()*256);
}
function randConfig(c){
    for(let i=0;i<100;i++){
        c[i]=Math.floor(Math.random()*2);
    }
}



function genrate(InitialConfig){
    for(let i = 0; i<100; i++){
        for(let j = 0; j<100; j++){
            let tile = document.createElement("div");
            tile.style.position = "absolute";
            tile.style.top = i*30+20+"px";
            tile.style.left = j*10+20+"px";
            if(InitialConfig[j]==1) {
                tile.style.backgroundColor = color;
                tile.classList.add("on");
            }
            tile.classList.add("tiles");
            grid.appendChild(tile);
            if(i==0){
                tile.id=j+""
                tile.onclick = function(){
                    const elements = document.querySelectorAll(".tiles");
                    for (let i = 0; i < elements.length; i++) {
                      if(elements[i].id=="")grid.removeChild(elements[i]);
                    }
    
                    if(tile.classList.contains("on")) {
                        tile.style.backgroundColor = "bisque";
                        copy[parseInt(tile.id)]=0;
                        tile.classList.remove("on")
                    }
                    else  {
                        tile.style.backgroundColor = color;
                        copy[parseInt(tile.id)]=1;
                        tile.classList.add("on")
    
                 }
                 genrate(copy)
        }
    }
        }
        InitialConfig = applyRule(InitialConfig,ruleNum);
    
    }
    }







function applyRule(config,rule){
    let binRep = Array(8)
    for(let i = 7; i >= 0 ; i--){
        if(rule>=2**i){
            binRep[i]=1;
            rule=rule-2**i;
        }
        else binRep[i]=0;
    }
    let newState = Array(config.length)
    for (let i = 0; i < config.length; i++){
        let left = i - 1;
        if(i==0) left = config.length - 1;
        let right = (i+1) % config.length;
        let str = config[left] + "" + config[i] + "" + config[right];
        switch (str) {
            case "000":
                if(binRep[0]==1) newState[i]=1;
                else newState[i]=0;
                break;
            case "001":
                if(binRep[1]==1) newState[i]=1;
                else newState[i]=0;
                break;   
             case "010":
                 if(binRep[2]==1) newState[i]=1;
                 else newState[i]=0;
                 break;  
             case "011":
                  if(binRep[3]==1) newState[i]=1;
                  else newState[i]=0;
                break; 
            case "100":
                 if(binRep[4]==1) newState[i]=1;
                 else newState[i]=0;
                break;  
            case "101":
                  if(binRep[5]==1) newState[i]=1;
                  else newState[i]=0;
                  break;  
                case "110":
                  if(binRep[6]==1) newState[i]=1;
                  else newState[i]=0;
                  break;
                case "111":
                  if(binRep[7]==1) newState[i]=1;
                  else newState[i]=0;
                  break;
        }
    }
    return newState;
}

// *******************************************************UNCOMMENT THIS FOR TESTING**********************************************************
// module.exports = { applyRule };
const eatermon = [
    {
     id: 0, 
     name: "Woodle",
     hp: 100, 
     maxHp: 100,
     attack: 10, 
     src: "images/woodle.png",
     canFlee: false
    },
    {
    id: 1, 
     name: "Tomadoodle",
     hp: 120, 
     maxHp: 120,
     attack: 30, 
     src: "images/tomadoodle.png",
     canFlee: false
    },
    {
         id: 2, 
         name: "Druewl",
         hp: 120, 
         maxHp: 120,
         attack: 30, 
         src: "images/druewl.png",
         canFlee: false
    }
 ]
 
 console.log(eatermon);


 function loadingImages() {
    const enemyImg = document.getElementById("eatermonEnemy");
     const playerImg = document.getElementById("eatermonPlayer");
     
     enemyImg.src = eatermon[2].src;  // Enemy is Woodle
     playerImg.src = eatermon[1].src; // Player is Tomadoodle
 }
 
 loadingImages(); 


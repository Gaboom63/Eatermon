function backButton() {
    battleMenuOptions.innerHTML = `
      <button id="attack" onclick="Attack()">Attack!</button> <br>
      <button id="bag" onclick="Bag()">Bag</button> <br>
      <button id="run" onclick="Run()">Run</button> <br>
    `;
}

function Attack() {
    generateAttackButtons();
}

function Run() {
    battleMenuScript.style.display = 'none'; // Hide battle menu to run away
    setTimeout(() => {
        inBattle = false;
    }, 3000);
}

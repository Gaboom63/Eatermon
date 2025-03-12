const eatermonAbilitys = [
    {
        name: "Heat Resist",
        checkAbility: function(eatermon) {
            // Check if eatermon has the "Heat Resist" ability
            return eatermon.abilities && eatermon.abilities.includes("Heat Resist");
        }
    },

    {
        name: "Sticky Splurge"
    }
] 

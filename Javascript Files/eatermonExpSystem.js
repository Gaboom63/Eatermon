const eatermonExp = [
    {
        level: 1, 
        xp: 0, 
        maxXp: 100, 
        deathXp: 10,
    },
    {
        level: 1, 
        xp: 10,
        maxXp: 100, 
        deathXp: 10,
    },
    {
        level: 1, 
        xp: 0, 
        maxXp: 100, 
        deathXp: 10,
    },
    {
        level: 1, 
        xp: 0, 
        maxXp: 100, 
        deathXp: 10,
    },
    {
        level: 1, 
        xp: 10,
        maxXp: 100, 
        deathXp: 10,
    },
    {
        level: 1, 
        xp: 0, 
        maxXp: 100, 
        deathXp: 10,
    },
    {
        level: 1, 
        xp: 10,
        maxXp: 100, 
        deathXp: 10,
    },
    {
        level: 1, 
        xp: 0, 
        maxXp: 100, 
        deathXp: 10,
    },
    {
        level: 1, 
        xp: 10,
        maxXp: 100, 
        deathXp: 10,
    },
    {
        level: 1, 
        xp: 0, 
        maxXp: 100, 
        deathXp: 10,
    },
    {
        level: 1, 
        xp: 10,
        maxXp: 100, 
        deathXp: 10,
    },
    {
        level: 1, 
        xp: 10,
        maxXp: 100, 
        deathXp: 10,
    },
    {
        level: 1, 
        xp: 10,
        maxXp: 100, 
        deathXp: 10,
    },
    {
        level: 1, 
        xp: 10,
        maxXp: 100, 
        deathXp: 10,
    },
    {
        level: 1, 
        xp: 10,
        maxXp: 100, 
        deathXp: 10,
    },
    {
        level: 1, 
        xp: 10,
        maxXp: 100, 
        deathXp: 10,
    },
]

function generateXpForLevel(level) {
    let minXp = 10;
    let maxXp = 100;

    if (level <= 10) {
        minXp = 10;
        maxXp = 80;  // Range for levels 1-10
    } else if (level <= 20) {
        minXp = 50;
        maxXp = 100;  // Range for levels 11-20
    } else if (level > 20) {
        minXp = 100;
        maxXp = 300;  // Range for levels 21 and higher
    }
 
    // Generate a random XP within the determined range
    return Math.floor(Math.random() * (maxXp - minXp + 1)) + minXp;
}


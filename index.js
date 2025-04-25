let clickedCard = null;
let preventClick = false;
let combosFound = 0;

const colors = [
    'pink',
    'yellow',
    'teal',
    'cyan',
    'red',
    'orange',
    'purple',
    'blue'
]

const cards = [...document.querySelectorAll('.card')];
for (let color of colors){
    const cardAIndex = parseInt(Math.random() * cards.length)
    const cardA = cards[cardAIndex]
    cards.splice(cardAIndex, 1);
    cardA.className += `${color}`
    cardA.setAttribute('data-color', color);

    const cardBIndex = parseInt(Math.random() * cards.length)
    const cardB = cards[cardBIndex]
    cards.splice(cardBIndex, 1);
    cardB.className += `${color}`
    cardB.setAttribute('data-color', color);
}
function onCardClicked(e) {
    const target = e.currentTarget;
    console.log(target.className, 'ClassNames')
    if (preventClick || target === clickedCard || target.className.includes('done')) {
        console.log("if the card is already done, do nothing");
        return;
    }

    target.className = target.className.replace('color-hidden', '').trim();
    target.className += ' done';

    if (!clickedCard) {
        clickedCard = target;
        console.log('first card clicked')
    }
    else if (clickedCard) {
        if (clickedCard.getAttribute('data-color') !== target.getAttribute('data-color')) {
            preventClick = true;
            setTimeout(() => {
                clickedCard.className = clickedCard.className.replace('done', '').trim() + ' color-hidden';
                target.className = target.className.replace('done', '').trim() + ' color-hidden';
                clickedCard = null;
                preventClick = false;
                return;
            }, 500);
        } else {
            combosFound++;
            clickedCard = null;
            if (combosFound === 8) {
                alert('YOU WIN!');
            }
        }
    }



}
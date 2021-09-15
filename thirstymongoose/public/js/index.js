$(() => {

$('#dinerAddButton').click(() => {
    let diner = encodeURIComponent($('#dinerName').val()).replace(/'/g, "%27");
    let location = encodeURIComponent($('#dinerLocation').val()).replace(/'/g, "%27");
    $.post(`/diners/${diner}/${location}`, () => {
        console.log('Redirecting window');
        window.location.href = `http://localhost:23750/diners/${diner}/${location}`;
    })
})

$('#sodaAddButton').click(() => {
    let soda = encodeURIComponent($('#sodaName').val()).replace(/'/g, "%27");
    let style = encodeURIComponent($('#sodaStyle').val()).replace(/'/g, "%27");
    $.post(`/sodas/${soda}/${style}`, () => {
        console.log('Redirecting window');
        window.location.href = `http://localhost:23750/sodas/${soda}/${style}`;
    })
})

let ratingParent = document.getElementsByClassName('rating-result');

for(let i = 0; i < ratingParent.length;i++) {
    let parentValue = parseInt(ratingParent[i].getAttribute('id'))
    for(let j = 0; j< ratingParent[i].children.length; j++) {
        if(parseInt(ratingParent[i].children[j].value) > parentValue) {
            ratingParent[i].children[j].classList.remove('star1');
            ratingParent[i].children[j].classList.add('star2');
        }
    }
    
}


})
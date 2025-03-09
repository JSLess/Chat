
export { in20Minutes , in10Seconds }

const Minutes_20 = 1000 * 60 * 20
const Seconds_10 = 1000 * 10


function in10Seconds (){
    return inX(Seconds_10)
}

function in20Minutes (){
    return inX(Minutes_20)
}



function inX (
    duration : number
){

    let time = Date.now()

    time += duration

    return new Date(time)
}
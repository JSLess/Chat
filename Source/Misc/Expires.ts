
export { in20Minutes }

const Minutes_20 = 1000 * 60 * 20


function in20Minutes (){

    let time = Date.now()

    time += Minutes_20

    return new Date(time)
}

export { SetVar }


function SetVar (
    key : string ,
    value : string | number ,
    depth = 2
){
    return `${ '-'.repeat(depth) }${ key }:${ value }`
}

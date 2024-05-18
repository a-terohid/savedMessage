export const Capitaliz = ( word : string ) : string =>{
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1)
    return capitalized
}
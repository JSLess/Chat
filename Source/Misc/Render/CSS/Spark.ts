
export { sparkTo }



function sparkTo (){
    return `/API/Spark`
}

<style dangerouslySetInnerHTML = {{ __html : `

.Category:hover::before {
    list-style-image : url('/API/Chat/Message/React/Hover?a=${ Date.now() }')
}

` }} />

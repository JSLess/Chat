
export { Component as UTF8Meta }


const policies = `
    default-src 'none';
    style-src 'self' ;
    style-src-attr 'self' 'unsafe-inline';
    style-src-elem 'self';
    frame-ancestors : 'self';
    frame-src 'self';
    form-action 'self';
    media-src 'self' data:;
    img-src 'self' data:;
`


function Component (){
    return <>

        <meta
            http-equiv = 'Content-type'
            content = 'text/html;charset=UTF-8'
        />

        <meta
            http-equiv= 'Content-Security-Policy'
            content = { policies }
        />
    </>
}

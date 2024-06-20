
<div align = center >

[![Banner]](#)

***Interactive chat using only HTML & CSS in the browser.***

<br>

<!-- [![Button Setup]][Setup] 
[![Button Concept]][Concept] -->

<!-- <br> -->

<img width = 40% src = 'https://github.com/JSLess/Chat/assets/73050054/168c9a92-3e32-40a5-9d7c-3f8068df7200' >

<br>

</div>

## Readmaybe

While technically a working chat, it's more of an Area69 testing ground.

### Hardmode

While web technologies have advanced,   
this project cannot use most of them for  
technical & ethos-driven reason. ¯\_(ツ)_/¯

-   Tor uses the enterprise edition of Firefox

-   Firefox has some important stuff  
    Chrome doesn't have & visa versa

    *( Scroll driven animations )*

-   Can't use Fonts , SVGs , HTTPS

    -> No one implements HTTP2/3 for  
    HTTP so 5 - 6 connection limit 💀

    -> Back to good old optimization

    - Spritemaps

    - Inline everything

    - Manual procedural loading

<br>

### Techniques

Mechanics I have learned , found or created.

-   **Framed Buttons**

    Every 'button' is an iframe containing a link / button  
    content where the link redirects the iframe to itself  
    and the backend recognizes the request as a click  
    if it has a parameter in the url.

-   **Double Framed Buttons**

    Moving a framed buttons content below the iframe  
    into the parent context reduced the amount of requests ,  
    data & loading time spent on each click + no icon flickering.

-   **Inline Frames**

    Using the `srcdoc` attribute , the initial rendered  
    content of an iframe can be set in a stringified form  
    which can save on requests + load time 
    
    -> Works great together with framed buttons  
    -> No need for unique parameter in link href

-   **Dynamic Frames**

    Using a kept alive connection + chunked encoding ( HTTP1.1 )  
    or just HTTP2/3 one can continually send 
    data to a client.

    The browser parses every chunk and appends it to the  
    existing page , which allows to send server -> client  
    updates without any use of JavaScript.  

-   **CSS Sparks**

    Using the loading behavior of resources linked  
    in CSS rules allows to send cheap client events.

    A resource is only loaded when the rule is in scope ,  
    thus a hover rule only calls the server when the user  
    hovers over the element.

    -> Request = Event  
    -> Linked resources are cached -> Cache Busting required  
    -> Always needs an opposite event -> Unhover <-> Hover  
      ( Can't send same css rule as it will activate immediately )

-   **Data URIs**

    Using data URIs with modern image formats such as  
    webp makes for a great initial loading experience!

    -> Useful for double framed icon buttons  
    -> Useful for initial thumbnail image

<br>


<!----------------------------------------------------------------------------->

[Concept]: ./Documentation/Topics/Concept.md
[Setup]: ./Documentation/Topics/Setup.md

[Banner]: ./Documentation/Assets/README.webp

<!---------------------------------[ Buttons ]--------------------------------->

[Button Concept]: https://img.shields.io/badge/Concept-37a779?style=for-the-badge
[Button Setup]: https://img.shields.io/badge/Setup-37a779?style=for-the-badge

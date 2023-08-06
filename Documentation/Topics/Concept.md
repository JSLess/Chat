
# Concept

<br>

## Server Side Updating

To accomplish updating browser clients from the  
server - without JavaScript - we utilize 2 things,  
Meta-Refresh-Tags & Chunked-Transfer-Encoding.

<br>

### Meta Refresh Tags

[Meta refresh tags] can refresh a browser page after  
a certain delay, however they are only executed after  
a request has finished loading and don't do anything  
when injected afterwards.

```html
<!-- Meta tag refresh the page it's enclosed in after 0 seconds -->
<meta
    http-equiv = refresh 
    content = 0
/>
```

<br>

### Chunked Transfer Encoding

[Chunked Transfer Encoding] - which is only available until  
http 1.1 - allows a server to gradually send content to the  
browser, this can be used to append additional html.

```
Transfer-Encoding : chunked
Content-Type : text/html;charset=utf-8
Keep-Alive : timeout=3600
Connection : keep-alive
```

<br>

### Hybrid Approach

<br>

<img width = 500 src = '../Images/Payload%20Order.png' >

<br>
<br>

Only using MRTs forces the page to constantly reload,  
while only using CTE restricts the server to constantly  
append new content and hide old existing one.

Combining the two features allows us to refresh  
a page / iframe whenever we need to update it.

#### Steps

1.  Client connects to an endpoint ( `/Chat` for an iframe )

2.  Server sends chunked response headers and initial content

3.  Server wants to update client, sends MRT and closes the connection

4.  Client refresh loads the updated content via the endpoint

#### Important

The crucial detail in this procedure is the fact that  
MRTs are executed only as an html request finishes,  
but the content that is sent is still being rendered.

This makes it possible to display html - mostly -   
as usual while at the same time delaying the MRT  
execution to whenever we need it to happen.

<br>


[Chunked Transfer Encoding]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding
[Meta Refresh Tags]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta

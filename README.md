This project contains automated tests for OrangeHRM Demo
, a web-based HR management system.

https://opensource-demo.orangehrmlive.com


### Challenges

The application has flaky selectors and dynamic content loading, typical in Vue.js apps. This means:

Elements may take time to appear or update in the DOM.


I think its vuejs while I have used page timeouts everywhere to overcome the loading speed and display of elements the test are passing

TODO: Research on other workarounds but for now I have managed to get them passing
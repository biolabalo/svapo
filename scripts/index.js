

const node = document.querySelector('.speciali');
[...Array(3)].forEach(_ => node.parentNode.insertBefore(node.cloneNode(true), node));
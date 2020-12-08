function enhanceButton() {
  const nested1 = document.querySelector('iframe')!;
  const nested2 = nested1.contentDocument!.querySelector('iframe')!;
  const button = nested2.contentDocument!.querySelector('#button')!

  button.addEventListener('click', () => {
    button.textContent += '!';
    // const div = nested2.contentDocument?.createElement('div')!;
    // div.textContent = 'new created';
    // nested2.contentDocument!.body.appendChild(div);
  })
}

function setupMutationObserver() {
  function setupPage(win: Window) {
    console.log('### setupPage', win);
    const targetNode = win.document.querySelector('body')!;

    const observerOptions = {
      childList: true, // direct children
      attributes: true,
      subtree: true // descendants. Only available when childList is true
    };

    const observer = new MutationObserver(function () {
      console.log('DOM is changed on ', win);
    });

    observer.observe(targetNode, observerOptions);

    const iframes = Array.from(win.document.querySelectorAll('iframe'));
    iframes.forEach((iframe) => {
      setupPage(iframe.contentWindow!);
    })
  }

  setupPage(window);
}

setTimeout(() => {
  enhanceButton();
  setupMutationObserver();
}, 1000);

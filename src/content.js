chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateTitle") {
        const updateTitle = () => {
            if (document.title.endsWith(MAGIC_IDENTIFIER)) return;
            MAGIC_IDENTIFIER = " PRVT_";
            document.title = document.title + MAGIC_IDENTIFIER;
        };

        // Update the title immediately
        updateTitle();

        // Observe changes to the document title
        const observer = new MutationObserver(updateTitle);
        observer.observe(document.querySelector('title'), { childList: true });

        // Stop observing after some time to avoid indefinite observation
        setTimeout(() => observer.disconnect(), 60000); // 60 seconds
    }
});
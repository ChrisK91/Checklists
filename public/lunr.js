window.addEventListener("DOMContentLoaded", event => {
    let index = null;
    let lookup = null;
    let queuedTerm = null;
    let queuedDoNotAddState = false;
    let origContent = null;

    const form = document.getElementById("search");
    const input = document.getElementById("search-input");
    const searchSpinner = document.getElementById("loadingspinner");
    const searchContainer = document.getElementById("search-container");
    const searchArea = document.getElementById("search-inner");
    const mainContent = document.getElementById("main-content");
    const resultsLabel = document.getElementById("result-text")

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let term = input.value.trim();
        if (!term) {
            return;
        }
        startSearch(term, false);
    }, false);

    if (history.state && history.state.type == "search") {
        startSearch(history.state.term, true);
    }

    window.addEventListener("popstate", function(event) {
        if (event.state && event.state.type == "search") {
            startSearch(event.state.term, true);
        }
        else if (!event.state && origContent) {
            //restore main content
            /*let target = document.querySelector(".main-inner");
            while (target.firstChild) {
                target.removeChild(target.firstChild);
            }

            for (let node of origContent) {
                target.appendChild(node);
            }*/
            origContent = null;
           
            searchContainer.classList.add("hidden");
            mainContent.classList.remove("hidden");
            input.value = "";
        }
    }, false);

    function startSearch(term, doNotAddState) {
        input.value = term;
        searchSpinner.classList.remove("hidden");

        if (index) {
            search(term, doNotAddState);
        }
        else if (queuedTerm) {
            queuedTerm = term;
            queuedDoNotAddState = doNotAddState;
        }
        else {
            queuedTerm = term;
            queuedDoNotAddState = doNotAddState;
            initIndex();
        }
    }

    function searchDone() {
        
        searchSpinner.classList.add("hidden");

        // A magic trick to make search field loses focus on mobile,
        // which prevents the virtual keyboard from popping up.
        /*const header = document.querySelector('.header');
        if (header && header.classList.contains('fade')) {*/
            input.blur();
        //}

        queuedTerm = null;
        queuedDoNotAddState = false;
    }

    function initIndex() {
        let request = new XMLHttpRequest();
        request.open("GET", searchSource);
        request.responseType = "json";
        request.addEventListener("load", function(event) {
            let documents = request.response;
            if (!documents)
            {
                console.error("Search index could not be downloaded, was it generated?");
                searchDone();
                return;
            }

            lookup = {};
            index = lunr(function() {
                if (language != "en" && lunr.hasOwnProperty(language)) {
                    this.use(lunr[language]);
                }

                this.ref("uri");
                this.field("title");
                this.field("subtitle");
                this.field("content");
                this.field("description");
                this.field("categories");
                this.field("tags");

                for (let document of documents) {
                    this.add(document);
                    lookup[document.uri] = document;
                }
            });

            search(queuedTerm, queuedDoNotAddState);
        }, false);
        request.addEventListener("error", searchDone, false);
        request.send(null);
    }

    function search(term, doNotAddState) {
        try {
            let results = index.search(term);

            let target = document.querySelector("#search-inner");
            let replaced = [];
            while (target.firstChild) {
                replaced.push(target.firstChild);
                target.removeChild(target.firstChild);
            }
            if (!origContent) {
                origContent = replaced;
            }

            // This is an overly simple pluralization scheme, it will only work
            // for some languages.
            if (results.length == 0) {
                resultsLabel.textContent = noResult;
            }
            else if (results.length == 1) {
                resultsLabel.textContent = oneResult;
            }
            else if (results.length == 2) {
                resultsLabel.textContent = twoResult;
            }
            else {
                resultsLabel.textContent = xResult.replace("%number%", results.length);
            }
            
            let template = document.getElementById("search-result");
            for (let result of results) {
                let doc = lookup[result.ref];

                let element = template.content.cloneNode(true);
                element.querySelector(".summary-title-link").href = element.querySelector(".read-more-link").href = doc.uri;
                element.querySelector(".summary-breadcrumb").textContent = doc.type;
                element.querySelector(".summary-title-link").textContent = doc.title;
                element.querySelector(".summary").textContent = doc.description;
                target.appendChild(element);
            }

            
            if(!mainContent.classList.contains("hidden"))
            {
                mainContent.classList.add("hidden");
            }

            searchContainer.classList.remove("hidden");
            resultsLabel.scrollIntoView(true);

            if (!doNotAddState) {
                history.pushState({type: "search", term: term}, resultsLabel.textContent, "#search=" + encodeURIComponent(term));
            }
        }
        finally {
            searchDone();
        }
    }

    // This matches Hugo's own summary logic:
    // https://github.com/gohugoio/hugo/blob/b5f39d23b86f9cb83c51da9fe4abb4c19c01c3b7/helpers/content.go#L543
    function truncateToEndOfSentence(text, minWords)
    {
        let match;
        let result = "";
        let wordCount = 0;
        let regexp = /(\S+)(\s*)/g;
        while (match = regexp.exec(text)) {
            wordCount++;
            if (wordCount <= minWords) {
                result += match[0];
            }
            else
            {
                let char1 = match[1][match[1].length - 1];
                let char2 = match[2][0];
                if (/[.?!"]/.test(char1) || char2 == "\n") {
                    result += match[1];
                    break;
                }
                else {
                    result += match[0];
                }
            }
        }
        return result;
    }
}, {once: true});
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search");
    const searchResults = document.getElementById("search-results");
  
    fetch("/index.json")
      .then(response => response.json())
      .then(data => {
        const idx = lunr(function() {
          this.ref("uri");
          this.field("title");
          this.field("content");
          this.field("tags");
  
          data.forEach((doc, index) => {
            this.add({
              uri: doc.uri,
              title: doc.title,
              content: doc.content,
              tags: doc.tags
            });
          });
        });
  
        searchInput.addEventListener("input", () => {
          const query = searchInput.value;
          const results = idx.search(query);
          searchResults.innerHTML = "";
  
          results.forEach(result => {
            const item = data.find(doc => doc.uri === result.ref);
            const resultElement = document.createElement("div");
            const titleElement = document.createElement("h3");
            const linkElement = document.createElement("a");
  
            linkElement.href = item.uri;
            linkElement.textContent = item.title;
            titleElement.appendChild(linkElement);
            resultElement.appendChild(titleElement);
            searchResults.appendChild(resultElement);
          });
        });
      });
  });
  
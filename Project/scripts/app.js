document.getElementById("url-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const urlInput = document.getElementById("url-input").value;
    const resultsDiv = document.getElementById("results");

    // Clear previous results
    resultsDiv.innerHTML = "Loading...";

    try {
        // Send URL to the backend
        const response = await fetch("http://localhost:5000/process-url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: urlInput }),
        });

        if (!response.ok) throw new Error("Failed to fetch results.");

        const data = await response.json();

        // Display Results
        resultsDiv.innerHTML = "<h3>YouTube Results:</h3>";
        data.youtube.forEach((video) => {
            const videoElement = `
                <div>
                    <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                        <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
                        <p>${video.snippet.title}</p>
                    </a>
                </div>
            `;
            resultsDiv.innerHTML += videoElement;
        });
    } catch (error) {
        resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

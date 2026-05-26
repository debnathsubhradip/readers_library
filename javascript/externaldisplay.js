let currentUrl = '';

function toggleFullscreen() {
    document.body.classList.toggle('fullscreen');
}

function loadHtmlResource() {
    // Get URL parameter - handle both encoded and non-encoded
    let link = null;
    const search = window.location.search;
    if (search) {
        const params = search.split('?')[1] || '';
        const pairs = params.split('&');
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i].split('=');
            if (pair[0] === 'readbookurl') {
                link = pair.slice(1).join('=');
                break;
            }
        }
    }

    console.log("Link:", link);

    if (!link || link === 'null' || link === '') {
        document.getElementById('content').srcdoc = '<div class="alert alert-danger p-4"><h4>Invalid URL</h4><p>No resource link provided.</p></div>';
        return;
    }

    // Decode URL if needed
    if (link.includes('%')) {
        link = decodeURIComponent(link);
    }

    // Set download link
    currentUrl = link;
    document.getElementById('downloadBtn').href = currentUrl;

    // Use fetch to load content and display in iframe via srcdoc
    fetch(currentUrl)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').srcdoc = html;
        })
        .catch(err => {
            console.error("Error loading HTML:", err);
            document.getElementById('content').srcdoc = '<div class="alert alert-danger p-4"><h4>Failed to Load</h4><p>Could not load the HTML resource. The content may be blocked by CORS policy.</p><p>Try downloading the file instead using the Download button.</p></div>';
        });
}

// Load when DOM is ready
document.addEventListener('DOMContentLoaded', loadHtmlResource);
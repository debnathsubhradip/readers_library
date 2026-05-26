let currentPdfUrl = '';

function toggleFullscreen() {
    document.body.classList.toggle('fullscreen');
}

document.addEventListener("adobe_dc_view_sdk.ready", function () {
  setTimeout(function () {
    let searchParams = new URLSearchParams(document.location.search);
    let urlParam = searchParams.get('readbookurl');

    if (!urlParam || !urlParam.startsWith('http')) {
        document.getElementById('adobe-dc-view').innerHTML =
            '<div class="alert alert-danger p-4"><h4>Invalid URL</h4><p>URL: ' + (urlParam || 'null') + '</p></div>';
        return;
    }

    // Store URL for download button
    currentPdfUrl = decodeURIComponent(urlParam);

    // Set download button href
    document.getElementById('downloadBtn').href = currentPdfUrl;
    document.getElementById('downloadBtn').download = '';

    try {
        let adobeDCView = new AdobeDC.View({
          clientId: "44907b7604d0492a84e08a644878015c",
          divId: "adobe-dc-view",
        });

        adobeDCView.previewFile(
          {
            content: {
              location: { url: currentPdfUrl },
            },
            metaData: { fileName: "Ebook Reader" },
          },
          {
            showDownloadPDF: true,
            showPrintPDF: true,
            showPageControls: true,
            showZoomControl: true
          }
        );
    } catch (e) {
        console.error("Adobe DC Error:", e);
        document.getElementById('adobe-dc-view').innerHTML =
            '<div class="alert alert-danger p-4"><h4>Viewer Error</h4><p>' + e.message + '</p></div>';
    }
  }, 1000);
});
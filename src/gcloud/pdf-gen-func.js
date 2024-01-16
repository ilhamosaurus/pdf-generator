/* eslint-disable @typescript-eslint/no-var-requires */
// Import required modules
const puppeteer = require('puppeteer');

exports.generatePdf = async (req, res) => {
  try {
    // Extract URL from request
    const url = req.query.url || req.body.url;

    // Validate URL
    if (!url) {
      return res.status(400).send('Missing URL parameter');
    }

    // Launch Puppeteer in headless mode
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the URL and generate PDF
    await page.goto(url, { waitUntil: 'networkidle0' });
    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        left: '0px',
        top: '0px',
        right: '0px',
        bottom: '0px',
      },
    });

    // Close the browser
    await browser.close();

    // Send the generated PDF as a response
    res.setHeader({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${url}.pdf`,
      //prevent cache
      'Cache-Control': 'no-cache, no-store,must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    });
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating PDF');
  }
};

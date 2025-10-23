import fetch from 'node-fetch';
import { DOMParser } from 'xmldom';

export const handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Get RSS URL from query parameters
  const rssUrl = event.queryStringParameters?.url;

  if (!rssUrl) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: 'error',
        message: 'Missing "url" query parameter',
      }),
    };
  }

  try {
    console.log(`Fetching RSS feed: ${rssUrl}`);

    // Fetch the RSS feed
    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const xmlText = await response.text();

    // Parse XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    // Check for parser errors
    const parserErrors = xmlDoc.getElementsByTagName('parsererror');
    if (parserErrors.length > 0) {
      throw new Error('XML parsing failed');
    }

    // Extract items from RSS feed
    const items = xmlDoc.getElementsByTagName('item');
    const articles = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      const getElementText = (tagName) => {
        const elements = item.getElementsByTagName(tagName);
        return elements.length > 0 ? elements[0].textContent : '';
      };

      const title = getElementText('title');
      const link = getElementText('link');
      const pubDate = getElementText('pubDate');
      const description = getElementText('description');
      const author = getElementText('author') || getElementText('dc:creator');

      // Get source from Google News
      const sourceElements = item.getElementsByTagName('source');
      const source = sourceElements.length > 0 ? sourceElements[0].textContent : '';

      if (title && link) {
        articles.push({
          title,
          link,
          pubDate,
          description,
          author,
          source,
        });
      }
    }

    console.log(`Successfully parsed ${articles.length} articles`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'ok',
        items: articles,
        feed: {
          title: xmlDoc.getElementsByTagName('title')[0]?.textContent || '',
          description: xmlDoc.getElementsByTagName('description')[0]?.textContent || '',
          link: xmlDoc.getElementsByTagName('link')[0]?.textContent || '',
        },
      }),
    };
  } catch (error) {
    console.error('Error fetching RSS feed:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: 'error',
        message: error.message || 'Failed to fetch RSS feed',
      }),
    };
  }
};

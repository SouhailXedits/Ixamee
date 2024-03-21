const unlighthousePayload = {
  reports: [],
  scanMeta: {
    monitor: {
      status: 'completed',
      timeRunning: 123,
      doneTargets: 0,
      allTargets: 0,
      donePercStr: '100',
      errorPerc: '0.00',
      timeRemaining: 0,
      pagesPerSecond: '0',
      cpuUsage: '70.7%',
      memoryUsage: '99.3%',
      workers: 0,
    },
    routes: 0,
    score: 0,
  },
  options: {
    client: {
      groupRoutesKey: 'route.definition.name',
      columns: {
        overview: [
          {
            label: 'Screenshot Timeline',
            key: 'report.audits.screenshot-thumbnails',
            cols: 6,
          },
        ],
        performance: [
          {
            cols: 2,
            label: 'Largest Contentful Paint',
            tooltip:
              'Largest Contentful Paint marks the time at which the largest text or image is painted. [Learn more](https://web.dev/lighthouse-largest-contentful-paint/)',
            key: 'report.audits.largest-contentful-paint',
            sortKey: 'numericValue',
          },
          // ... other performance audits
        ],
        accessibility: [
          {
            cols: 3,
            label: 'Color Contrast',
            tooltip:
              'Background and foreground colors do not have a sufficient contrast ratio.',
            sortKey: 'length:details.items',
            key: 'report.audits.color-contrast',
          },
          // ... other accessibility audits
        ],
        // ... other categories
      },
    },
  },
  site: 'https://ixamee.vercel.app',
  websocketUrl: 'ws://localhost:3000/api/ws',
  lighthouseOptions: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  },
  scanner: {
    customSampling: {},
    ignoreI18nPages: true,
    maxRoutes: 200,
    skipJavascript: true,
    samples: 1,
    throttle: false,
    crawler: true,
    dynamicSampling: 8,
    sitemap: true,
    robotsTxt: true,
    device: 'mobile',
    exclude: ['/cdn-cgi/*'],
  },
  routerPrefix: '/',
  apiUrl: 'http://localhost:3000/api',
};

// Assign the payload to the global window object
window.__unlighthouse_payload = unlighthousePayload;

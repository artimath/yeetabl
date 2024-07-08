export const dummyMetrics = [
  { id: '1', name: 'Monthly Active Users', type: 'event', eventName: 'user_login', aggregation: 'count' },
  { id: '2', name: 'Average Session Duration', type: 'property', propertyName: 'session_duration', aggregation: 'average' },
  { id: '3', name: 'Total Revenue', type: 'property', propertyName: 'purchase_amount', aggregation: 'sum' },
  { id: '4', name: 'New User Signups', type: 'event', eventName: 'user_signup', aggregation: 'count' },
  { id: '5', name: 'Feature Usage', type: 'event', eventName: 'feature_used', aggregation: 'count' },
];

export const dummyWebhookEndpoints = [
  'https://api.example.com/webhook',
  'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
  'https://api.zapier.com/v2/hooks/catch/123456/abcdef/',
  'https://automate.io/webhook/12345-abcde-67890-fghij',
];

export const dummyEmails = [
  'alerts@example.com',
  'team@company.com',
  'notifications@startup.io',
  'support@product.com',
];

export const dummyPhoneNumbers = [
  '+1234567890',
  '+9876543210',
  '+1122334455',
  '+6677889900',
];

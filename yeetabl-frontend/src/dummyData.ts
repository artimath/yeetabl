// Event tables and their schemas
export const eventTables = {
  user_signup: {
    schema: {
      user_id: 'string',
      timestamp: 'datetime',
      email: 'string',
      plan_type: 'string',
      referral_source: 'string',
    },
    sample: [
      { user_id: 'u123', timestamp: '2023-06-01T10:30:00Z', email: 'john@example.com', plan_type: 'basic', referral_source: 'google' },
      { user_id: 'u124', timestamp: '2023-06-01T11:45:00Z', email: 'jane@example.com', plan_type: 'pro', referral_source: 'friend' },
    ]
  },
  instance_creation: {
    schema: {
      instance_id: 'string',
      user_id: 'string',
      timestamp: 'datetime',
      instance_type: 'string',
      region: 'string',
      os: 'string',
    },
    sample: [
      { instance_id: 'i-abc123', user_id: 'u123', timestamp: '2023-06-02T09:00:00Z', instance_type: 't2.micro', region: 'us-west-2', os: 'ubuntu' },
      { instance_id: 'i-def456', user_id: 'u124', timestamp: '2023-06-02T10:15:00Z', instance_type: 'c5.large', region: 'eu-central-1', os: 'amazon-linux' },
    ]
  },
  api_request: {
    schema: {
      request_id: 'string',
      user_id: 'string',
      timestamp: 'datetime',
      endpoint: 'string',
      status_code: 'integer',
      response_time: 'float',
    },
    sample: [
      { request_id: 'req1', user_id: 'u123', timestamp: '2023-06-03T14:20:00Z', endpoint: '/api/v1/instances', status_code: 200, response_time: 0.15 },
      { request_id: 'req2', user_id: 'u124', timestamp: '2023-06-03T14:22:00Z', endpoint: '/api/v1/databases', status_code: 404, response_time: 0.05 },
    ]
  },
  billing_event: {
    schema: {
      transaction_id: 'string',
      user_id: 'string',
      timestamp: 'datetime',
      amount: 'float',
      currency: 'string',
      service: 'string',
    },
    sample: [
      { transaction_id: 'tx1', user_id: 'u123', timestamp: '2023-06-04T00:01:00Z', amount: 10.50, currency: 'USD', service: 'compute' },
      { transaction_id: 'tx2', user_id: 'u124', timestamp: '2023-06-04T00:02:00Z', amount: 5.25, currency: 'USD', service: 'storage' },
    ]
  },
  support_ticket: {
    schema: {
      ticket_id: 'string',
      user_id: 'string',
      timestamp: 'datetime',
      category: 'string',
      priority: 'string',
      status: 'string',
    },
    sample: [
      { ticket_id: 'tick1', user_id: 'u123', timestamp: '2023-06-05T11:00:00Z', category: 'billing', priority: 'high', status: 'open' },
      { ticket_id: 'tick2', user_id: 'u124', timestamp: '2023-06-05T11:30:00Z', category: 'technical', priority: 'medium', status: 'in_progress' },
    ]
  }
};

// Derived metrics based on the event tables
export const dummyMetrics = [
  { id: '1', name: 'Daily Active Users', type: 'event', eventName: 'api_request', aggregation: 'count_distinct', field: 'user_id' },
  { id: '2', name: 'Average API Response Time', type: 'event', eventName: 'api_request', aggregation: 'average', field: 'response_time' },
  { id: '3', name: 'Total Revenue', type: 'event', eventName: 'billing_event', aggregation: 'sum', field: 'amount' },
  { id: '4', name: 'New User Signups', type: 'event', eventName: 'user_signup', aggregation: 'count' },
  { id: '5', name: 'Instance Creation Rate', type: 'event', eventName: 'instance_creation', aggregation: 'count' },
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

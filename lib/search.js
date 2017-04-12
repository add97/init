Tasks.initEasySearch(['text'], {
  'limit': 20,
  'use': 'mongo-db',
  'convertNumbers': false
});

businessProfiles.initEasySearch(['company_name', 'company_email', 'company_address'], {
  'limit': 20,
  'use': 'mongo-db',
  'convertNumbers': false
});

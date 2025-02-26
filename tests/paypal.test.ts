import { generateAccessToken, paypal } from '../lib/paypal';

// Generate a Paypal access token
test('generate a Paypal token ', async () => {
  const tokenResponse = await generateAccessToken();
  // Should be a string that is not empty
  expect(typeof tokenResponse).toBe('string');
  expect(tokenResponse.length).toBeGreaterThan(0);
});

// Create a Paypal order
test('Create a Paypal order', async () => {
  const price = 10.0;
  const orderResponse = await paypal.createOrder(price);
  expect(orderResponse).toHaveProperty('id');
  expect(orderResponse).toHaveProperty('status');
  expect(orderResponse.status).toBe('CREATED');
});

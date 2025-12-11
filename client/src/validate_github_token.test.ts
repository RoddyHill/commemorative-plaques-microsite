import { describe, it, expect } from 'vitest';

describe('GitHub Token Validation', () => {
  it('should be a valid GitHub token', async () => {
    const token = process.env.GITHUB_TOKEN;
    expect(token).toBeDefined();

    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`,
        'User-Agent': 'Manus-Agent',
      },
    });

    if (!response.ok) {
      console.error(`GitHub API Error: ${response.status} ${response.statusText}`);
    }

    expect(response.status).toBe(200);
    const data = await response.json();
    console.log(`Authenticated as: ${data.login}`);
    expect(data.login).toBeDefined();
  });
});

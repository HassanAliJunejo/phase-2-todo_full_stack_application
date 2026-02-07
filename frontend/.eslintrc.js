module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // Add custom rules here
    '@next/next/no-img-element': 'off', // Allow using img element instead of Next.js Image
    'react-hooks/exhaustive-deps': 'warn', // Warn about missing dependencies in useEffect
  },
};
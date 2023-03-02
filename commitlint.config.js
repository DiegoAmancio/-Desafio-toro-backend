module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': () => [
      1,
      'always',
      [
        'feature',
        'fix',
        'docs',
        'refactor',
        'test',
        'revert',
        'merge',
        'style',
        'build',
        'config',
      ],
    ],
    'scope-case': () => [0, 'never'],
    'subject-case': () => [0, 'never'],
  },
};

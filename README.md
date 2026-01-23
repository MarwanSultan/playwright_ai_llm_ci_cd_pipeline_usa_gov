# Playwright AI LLM CI/CD Pipeline - USA.gov

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.40+-green.svg)](https://playwright.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-yellow.svg)](https://nodejs.org/)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue.svg)](https://github.com/features/actions)
[![Security](https://img.shields.io/badge/Security-CodeQL%20%2B%20Scanning-red.svg)](https://github.com/features/security)

Production-ready test automation framework for USA.gov with LLM/AI integration, comprehensive CI/CD pipeline, and enterprise security protocols.


---

## Overview

A scalable Playwright test automation framework for `usa.gov` demonstrating production-grade QA architecture with GitHub Actions CI/CD, security-first practices, and AI/LLM orchestration. Built as a reference implementation for enterprise government system testing.

---

## Features

- **Cross-Browser Testing** — Chromium, Firefox, and WebKit with parallel execution
- **AI/LLM Integration** — Intelligent test orchestration and optimization
- **Enterprise CI/CD** — Multi-stage GitHub Actions pipelines with security controls
- **Security-First** — Dependency scanning, secret detection, CodeQL analysis
- **Helper-Based Architecture** — Reusable utilities without Page Object Model overhead
- **Data-Driven Tests** — Externalized test data for easy maintenance and scaling
- **Comprehensive Reporting** — HTML reports, artifacts, video capture, and trace logs

---

## Quick Start

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Installation

```bash
git clone https://github.com/MarwanSultan/playwright_ai_llm_ci_cd_pipeline_usa_gov.git
cd playwright_ai_llm_ci_cd_pipeline_usa_gov
npm ci
npx playwright install
```

### Run Tests

```bash
npm test                          # All tests
npm run test:headed              # See browser execution
npm run test:ui                  # Interactive UI mode
npx playwright test -g "test name"  # Specific test
npm run test:report              # View HTML report
```

---

## Project Structure

```
.
├── .github/workflows/           # GitHub Actions CI/CD
│   ├── playwright-tests.yml     # Main test execution
│   ├── security.yml             # Security scanning
│   └── release.yml              # Release pipeline
├── tests/
│   ├── specs/                   # Test specifications
│   ├── helpers/                 # Reusable test functions
│   │   ├── page.helpers.ts
│   │   ├── search.helpers.ts
│   │   ├── navigation.helpers.ts
│   │   └── accessibility.helpers.ts
│   ├── fixtures/                # Test setup/teardown
│   └── data/                    # Externalized test data
├── playwright.config.ts
└── package.json
```

---

## Test Coverage

| Area | Tests | Status |
|------|-------|--------|
| Page Loading | 3 | ✅ |
| Navigation | 2 | ✅ |
| Content | 2 | ✅ |
| Accessibility | 2 | ✅ |
| Keyboard Navigation | 1 | ✅ |

---

## CI/CD Pipeline

### Automated Workflows

**1. Test Execution** (On push/PR/schedule)
- Multi-browser testing (Chrome, Firefox, Safari)
- Node.js 18 & 20 compatibility testing
- Parallel execution across 4 workers
- HTML reports and artifact archival

**2. Security Scanning** (Weekly + On demand)
- Dependency vulnerability scanning
- Secret detection (credentials, API keys)
- CodeQL code analysis
- Automated alerting

**3. Release Pipeline** (On version tag)
- Automated test gating
- Release notes generation
- GitHub Release creation
- Artifact publishing

View results in repository **Actions** tab.

---

## Configuration

### Environment Variables

```bash
# .env (do not commit)
BASE_URL=https://www.usa.gov
PLAYWRIGHT_HTML_REPORT=playwright-report
```

### Playwright Config

Edit `playwright.config.ts` to customize:
- Timeout settings (default: 30s)
- Retry logic (default: 1 retry on CI)
- Worker count (default: 4 parallel)
- Browser options and base URL

---

## Local Development

### Run All Tests
```bash
npm test
```

### Debug Specific Test
```bash
npx playwright test tests/specs/global-search.spec.ts --debug
```

### Inspect Test with Trace
```bash
npx playwright test --trace on
npx playwright show-trace trace.zip
```

### Run Specific Test by Name
```bash
npx playwright test -g "Homepage should load"
```

---

## Troubleshooting

**Tests timeout or fail**
```bash
# Increase timeout
npx playwright test --timeout=60000

# Check website status
curl -I https://www.usa.gov
```

**Browser/dependency issues**
```bash
# Reinstall browsers
npx playwright install --with-deps

# Clean install
rm -rf node_modules package-lock.json
npm ci
```

**View detailed logs**
```bash
DEBUG=pw:api npm test
npx playwright test --trace on
```

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Framework | Playwright 1.40+ |
| Language | TypeScript 5.0+ |
| AI/LLM | Claude API, MCP Server |
| Runtime | Node.js 18+ |
| CI/CD | GitHub Actions |
| Security | CodeQL, npm audit, TruffleHog |
| Reporting | HTML Reporter, Trace Viewer |

---

## Best Practices

- **Helper Functions** — DRY principle with reusable utilities
- **Data Separation** — Test data externalized for maintainability
- **Clear Assertions** — Specific expectations, no vague checks
- **Explicit Waits** — Wait for elements instead of hard sleeps
- **Descriptive Names** — Test names explain what's being tested
- **No Dependencies** — Tests run independently in any order

---

## Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Run tests locally: `npm test`
3. Use conventional commits: `feat: add search test`
4. Push and open PR

**Conventional Commit Format:**
```
feat: add new test
fix: correct assertion
docs: update README
test: improve coverage
chore: update dependencies
```

---

## Performance Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Total Execution Time | < 5 min | ~4 min |
| Browser Coverage | 3+ | 3 (Chrome, Firefox, Safari) |
| Parallel Workers | 4 | 4 |
| Node Versions Tested | 2+ | 2 (18, 20) |

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

## Resources

- [Playwright Docs](https://playwright.dev/)
- [GitHub Actions Guide](https://docs.github.com/en/actions)
- [Security Best Practices](https://docs.github.com/en/actions/security-guides)
- [Conventional Commits](https://www.conventionalcommits.org)

---

## Support

- [Issues](https://github.com/MarwanSultan/playwright_ai_llm_ci_cd_pipeline_usa_gov/issues)
- [Discussions](https://github.com/MarwanSultan/playwright_ai_llm_ci_cd_pipeline_usa_gov/discussions)
- Author: [Marwan Sultan](https://github.com/MarwanSultan)

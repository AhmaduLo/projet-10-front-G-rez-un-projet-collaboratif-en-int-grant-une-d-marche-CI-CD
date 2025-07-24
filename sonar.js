const scanner = require("sonarqube-scanner");
scanner.scan(
  {
    serverUrl: "https://sonarcloud.io",
    options: {
      "sonar.projectKey": "AhmaduLo_projet10-frontend",
      "sonar.organization": "ahmadulo",
      "sonar.sources": "src",
      "sonar.tests": "src",
      "sonar.test.inclusions": "**/*.spec.ts",
      "sonar.javascript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.sourceEncoding": "UTF-8",
      "sonar.login": "5890e2de983dcf9e74670d358f6f93162affd7e1",
    },
  },
  () => process.exit()
);

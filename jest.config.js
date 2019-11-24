module.exports = {
  roots: ["<rootDir>/packages"],
  testMatch: ["**/?(*.)+(spec).ts"],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  }
}

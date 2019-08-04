workflow "Auto deployment" {
  on = "release"
  resolves = [
    "Push hexchainiot/hexchain-app",
    "push hexchainiot/sync-db",
    "push hexchainiot/ledger-pub ",
    "push hexchainiot/device-api",
    "push hexchainiot/tp",
    "push hexchainiot/webhook-auth",
  ]
}

action "Docker Registry" {
  uses = "actions/docker/login@86ff551d26008267bb89ac11198ba7f1d807b699"
  secrets = ["DOCKER_PASSWORD", "DOCKER_USERNAME"]
}

action "Build hexchainiot/hexchain-app" {
  uses = "actions/docker/cli@86ff551d26008267bb89ac11198ba7f1d807b699"
  needs = ["Docker Registry"]
  args = "build -t hexchainiot/hexchain-app hexchain-app/."
}

action "Push hexchainiot/hexchain-app" {
  uses = "actions/docker/cli@86ff551d26008267bb89ac11198ba7f1d807b699"
  needs = ["Build hexchainiot/hexchain-app"]
  args = "push hexchainiot/hexchain-app"
}

action "hexchainiot/device-api " {
  uses = "actions/docker/cli@86ff551d26008267bb89ac11198ba7f1d807b699"
  needs = ["Docker Registry"]
  args = "build -t hexchainiot/device-api device-api/."
}

action "push hexchainiot/device-api" {
  uses = "actions/docker/cli@86ff551d26008267bb89ac11198ba7f1d807b699"
  args = "push hexchainiot/device-api"
  needs = ["hexchainiot/device-api "]
}

action "hexchainiot/sync-db" {
  uses = "actions/docker/cli@86ff551d26008267bb89ac11198ba7f1d807b699"
  needs = ["Docker Registry"]
  args = "build -t hexchainiot/sync-db sync-db/."
}

action "push hexchainiot/sync-db" {
  uses = "actions/docker/cli@86ff551d26008267bb89ac11198ba7f1d807b699"
  args = "push hexchainiot/sync-db"
  needs = ["hexchainiot/sync-db"]
}

action "build hexchainiot/ledger-pub " {
  uses = "actions/docker/cli@86ff551d26008267bb89ac11198ba7f1d807b699"
  needs = ["Docker Registry"]
  args = "build -t hexchainiot/ledger-pub ledger-pub/."
}

action "push hexchainiot/ledger-pub " {
  uses = "actions/docker/cli@86ff551d26008267bb89ac11198ba7f1d807b699"
  needs = ["build hexchainiot/ledger-pub "]
  args = "push hexchainiot/ledger-pub "
}

action "hexchainiot/tp " {
  uses = "actions/docker/cli@86ff551d26008267bb89ac11198ba7f1d807b699"
  needs = ["Docker Registry"]
  args = "build -t hexchainiot/tp transaction-processor/."
}

action "push hexchainiot/tp" {
  uses = "actions/docker/cli@86ff551d26008267bb89ac11198ba7f1d807b699"
  needs = ["hexchainiot/tp "]
  args = "push hexchainiot/tp"
}

action "hexchainiot/webhook-auth" {
  uses = "actions/docker/cli@86ff551d26008267bb89ac11198ba7f1d807b699"
  needs = ["Docker Registry"]
  args = "build -t hexchainiot/webhook-auth webhook-auth/."
}

action "push hexchainiot/webhook-auth" {
  uses = "actions/docker/cli@86ff551d26008267bb89ac11198ba7f1d807b699"
  needs = ["hexchainiot/webhook-auth"]
  args = "push hexchainiot/webhook-auth"
}

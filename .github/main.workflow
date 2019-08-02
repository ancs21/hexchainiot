workflow "Auto deployment" {
  on = "release"
  resolves = ["Push hexchainiot/hexchain-app", "push hexchainiot/device-api"]
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

action "build hexchainiot/device-api " {
  uses = "actions/docker/cli@86ff551d26008267bb89ac11198ba7f1d807b699"
  needs = ["Docker Registry"]
  args = "build hexchainiot/device-api device-api/."
}

action "push hexchainiot/device-api" {
  uses = "actions/docker/cli@86ff551d26008267bb89ac11198ba7f1d807b699"
  needs = ["build hexchainiot/device-api "]
  args = "push hexchainiot/device-api"
}

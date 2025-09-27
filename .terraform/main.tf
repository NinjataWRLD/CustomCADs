terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = local.region
}

data "terraform_remote_state" "backend" {
  backend = "s3"

  config = {
    bucket = "customcads-terraform-common"
    key    = "terraform.tfstate"
    region = local.region
  }
}

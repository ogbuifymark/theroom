terraform {
  required_version = ">= 1.0.8"

  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
  backend "s3" {
    bucket = "theroom-iac"
    key    = "ecr"
    region = "eu-west-1"
  }
}

provider "aws" {
  region = "eu-west-1"
}
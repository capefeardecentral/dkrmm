provider "aws" {
  region = "us-east-1"
}

provider "aws" {
  region                      = "us-east-1"
  alias                       = "main"
}

provider "aws" {
  region                      = "us-east-1"
  alias                       = "acm_provider"
}

locals {

}

module "rmm" {
  providers = {
    aws.main = aws.main
    aws.acm_provider = aws.acm_provider
  }

  source  = "cn-terraform/s3-static-website/aws"
  version = "0.0.18"
  name_prefix="rmm"
  website_bucket_force_destroy = true
  website_domain_name = "rmm.xyz"
}


provider "aws" {
  region = "us-east-1"
}

module "ec2_instance" {
  source  = "terraform-aws-modules/ec2-instance/aws"
  version = "~> 3.0"

  name = "dkrmm_api"

  ami                    = "ami-090fa75af13c156b4"
  instance_type          = "t3.micro"
  key_name               = "nickshater"
  monitoring             = true
  vpc_security_group_ids = ["sg-04ceb6b46921c1340"]
  subnet_id              = "subnet-19d4b642"

  tags = {
    Terraform   = "true"
    Environment = "dev"
  }
}
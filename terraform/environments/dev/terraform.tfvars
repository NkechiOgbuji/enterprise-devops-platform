aws_region   = "us-east-1"
project_name = "enterprise-devops"
environment  = "dev"

vpc_cidr = "10.0.0.0/16"

public_subnet_cidrs = [
  "10.0.1.0/24",
  "10.0.2.0/24"
]

private_subnet_cidrs = [
  "10.0.10.0/24",
  "10.0.20.0/24"
]

availability_zones = [
  "us-east-1a",
  "us-east-1b"
]
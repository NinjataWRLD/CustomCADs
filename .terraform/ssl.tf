resource "aws_acm_certificate" "customcads_certificate" {
  domain_name               = "customcads.com"
  subject_alternative_names = ["*.customcads.com", "*.api.customcads.com"]

  validation_method = "DNS"
  key_algorithm     = "EC_prime256v1"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_cloudfront_function" "customcads_apex_redirect" {
  name    = "ApexToWWWRedirect"
  runtime = "cloudfront-js-2.0"
  comment = "Redirect customcads.com → www.customcads.com"
  code    = file("apex-redirect.js")
}

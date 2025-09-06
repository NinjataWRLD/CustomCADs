
resource "aws_cloudfront_origin_access_control" "customcads_oac" {
  name                              = "customcads-production-oac"
  description                       = "OAC for ${aws_s3_bucket.customcads_frontend_bucket.bucket}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_response_headers_policy" "customcads_security" {
  name    = "CustomCADsSecurityHeaders"
  comment = "Security headers for CustomCADs SPA"

  security_headers_config {
    content_security_policy {
      content_security_policy = "default-src 'self'; script-src 'self' https://apis.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; object-src 'none'; frame-ancestors 'none'; connect-src 'self' https://api.customcads.com https://customcads-production-bucket.s3.us-east-1.amazonaws.com blob:; img-src 'self' https://customcads-production-bucket.s3.us-east-1.amazonaws.com blob:;"
      override                = true
    }
    content_type_options {
      override = true
    }

    frame_options {
      frame_option = "DENY"
      override     = true
    }

    referrer_policy {
      referrer_policy = "strict-origin-when-cross-origin"
      override        = true
    }
  }

  custom_headers_config {
    items {
      header   = "Permissions-Policy"
      value    = "camera=(), microphone=(), geolocation=()"
      override = true
    }
  }
}

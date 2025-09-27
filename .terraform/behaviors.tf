resource "aws_cloudfront_response_headers_policy" "customcads_security" {
  name    = "CustomCADsSecurityHeaders"
  comment = "Security headers for CustomCADs SPA"

  security_headers_config {
    content_security_policy {
      content_security_policy = "default-src 'self'; script-src 'self' https://apis.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; object-src 'none'; frame-ancestors 'none'; connect-src 'self' https://api.customcads.com https://staging.api.customcads.com https://customcads-production-bucket.s3.us-east-1.amazonaws.com blob:; img-src 'self' https://customcads-production-bucket.s3.us-east-1.amazonaws.com https://customcads-staging-bucket.s3.us-east-1.amazonaws.com blob:;"
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

resource "aws_cloudfront_cache_policy" "customcads_index" {
  name        = "CustomCADsCachePolicy_Frontend_Index"
  comment     = "Cache policy for the CustomCADs SPA's index.html"
  default_ttl = 60
  max_ttl     = 300
  min_ttl     = 0

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }
    headers_config {
      header_behavior = "whitelist"
      headers {
        items = ["Origin"]
      }
    }
    query_strings_config {
      query_string_behavior = "none"
    }
  }
}

resource "aws_cloudfront_cache_policy" "customcads_assets" {
  name        = "CustomCADsCachePolicy_Frontend_Assets"
  comment     = "Cache policy for the CustomCADs SPA's assets"
  default_ttl = 31536000
  max_ttl     = 31536000
  min_ttl     = 0

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }
    headers_config {
      header_behavior = "none"
    }
    query_strings_config {
      query_string_behavior = "none"
    }
  }
}
